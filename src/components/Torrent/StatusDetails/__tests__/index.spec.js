import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import StatusDetails from '../';

const torrent = {
  recheckProgress: 1,
  peersGettingFromUs: 5,
  peersSendingToUs: 5,
  peersConnected: 5,
  webseedsSendingToUs: 5,
  rateUpload: 1E5,
  rateDownload: 1E7,
};

test('StatusDetails has errors', () => {
  const component = createComponentWithIntl(
    <StatusDetails torrent={{hasErrors: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StatusDetails downloading', () => {
  const component = createComponentWithIntl(
    <StatusDetails torrent={{...torrent, isDownloading: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StatusDetails seeding', () => {
  const component = createComponentWithIntl(
    <StatusDetails torrent={{...torrent, isSeeding: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StatusDetails checking', () => {
  const component = createComponentWithIntl(
    <StatusDetails torrent={{...torrent, isChecking: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StatusDetails status', () => {
  const component = createComponentWithIntl(
    <StatusDetails torrent={{...torrent}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
