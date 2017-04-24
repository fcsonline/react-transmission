import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Error from '../Error';

import Torrent from 'stores/torrent';

const {
  ERR_TRACKER_WARNING,
  ERR_TRACKER_ERROR,
  ERR_LOCAL_ERROR,
} = Torrent;

test('Error track warning', () => {
  const component = createComponentWithIntl(
    <Error torrent={{error: ERR_TRACKER_WARNING, errorDescription: 'Test error'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Error track error', () => {
  const component = createComponentWithIntl(
    <Error torrent={{error: ERR_TRACKER_ERROR, errorDescription: 'Test error'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Error local error', () => {
  const component = createComponentWithIntl(
    <Error torrent={{error: ERR_LOCAL_ERROR, errorDescription: 'Test error'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Error undefined error', () => {
  const component = createComponentWithIntl(
    <Error torrent={{}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
