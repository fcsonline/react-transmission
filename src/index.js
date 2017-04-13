import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';

import * as stores from 'stores';
import notify from 'reactions/notify';

import App from 'components/App';

// Start reactions
notify(stores);

const rootEl = document.getElementById('root');

function renderApp(app) {
  return ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <IntlProvider locale={navigator.language}>
          {app}
        </IntlProvider>
      </Provider>
    </AppContainer>,
    rootEl
  );
}

renderApp(<App />);

if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default;

    renderApp(<NextApp />);
  });
}
