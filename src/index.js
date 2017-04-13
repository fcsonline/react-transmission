import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider, addLocaleData } from 'react-intl';

import * as stores from 'stores';
import notify from 'reactions/notify';

import App from 'components/App';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import enTranslations from 'translations/en.json';
import esTranslations from 'translations/es.json';

addLocaleData([...en, ...es]);

const messages = {
  'en-US': enTranslations,
  en: enTranslations,
  es: esTranslations,
};

// Start reactions
notify(stores);

const rootEl = document.getElementById('root');

function renderApp(app) {
  return ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <IntlProvider locale={navigator.language} messages={messages[navigator.language]}>
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
