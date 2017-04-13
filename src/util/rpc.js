import agent from 'superagent';

function toMap(object) {
  return new Map(
    Object.keys(object).reduce((arr, key) => [...arr, [key, object[key]]], [])
  )
}

function fetch(url, { headers, body, method }) {
  return new Promise((resolve, reject) => {
    agent[method](url)
      .type('application/json')
      .accept('application/json')
      .set(headers)
      .send(body)
      .end((err, response) => {
        // Network or timeout error
        if (err && !err.status && !err.response) {
          reject(err);
        }

        // HTTP error 4xx or 5xx
        if (err && err.status) {
          resolve({status: err.status, headers: toMap(response.headers)})
        }

        if (!err && response) {
          resolve({json: () => Promise.resolve(response.body)});
        }

        reject();
      });
  });
}

class RPC {
  static SESSION_ID_HEADER = 'x-transmission-session-id';

  constructor(onConnect = () => {}, onDisconnect = () => {}) {
    this._url = '/transmission/rpc';
    this._onConnect = onConnect;
    this._onDisconnect = onDisconnect;
    this._sessionId = null;
  }

  sendRequest(method, data) {
    const headers = {
      [RPC.SESSION_ID_HEADER]: this._sessionId,
    };
    const body = {
      'arguments': data,
      method
    };

    return fetch(this._url, {
      method: 'post',
      headers,
      body
    }).then((response) => {
      if (response.status === 502) {
        this._onDisconnect(response);
      } else if (response.status === 409 && response.headers.has(RPC.SESSION_ID_HEADER)) {
        this._onConnect(response);

        this._sessionId = response.headers.get(RPC.SESSION_ID_HEADER);

        return fetch(this._url, {
          method: 'post',
          headers: {...headers, [RPC.SESSION_ID_HEADER]: this._sessionId},
          body
        });
      }

      // TODO: Review fullfilment value
      return response;
    });
  }
}

export default RPC;
