import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

export default function(children, props = { locale: 'en' }) {
  return renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  );
}
