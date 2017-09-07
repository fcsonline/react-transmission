import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'react-css-themr';
import queryString from 'query-string';

import * as stores from 'stores';
import notify from 'reactions/notify';

import App from 'components/App';

import themes from './themes';

// Start reactions
notify(stores);

const rootEl = document.getElementById('root');

const parameters = queryString.parse(location.search);
const theme = themes[parameters.theme || 'base'];

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppContainer>
      <Provider {...stores}>
        <App />
      </Provider>
    </AppContainer>
  </ThemeProvider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default;

    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Provider {...stores}>
            <NextApp />
          </Provider>
        </AppContainer>
      </ThemeProvider>,
      rootEl
    );
  });
}
