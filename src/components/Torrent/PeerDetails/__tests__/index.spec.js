import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import PeerDetails from '../';

test('PeerDetails has errors', () => {
  const component = createComponentWithIntl(
    <PeerDetails torrent={{hasErrors: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

const torrent = {
  recheckProgress: 1,
  peersGettingFromUs: 5,
  peersSendingToUs: 5,
  peersConnected: 5,
  webseedsSendingToUs: 5,
  rateUpload: 1E5,
  rateDownload: 1E7,
};

test('PeerDetails downloading', () => {
  const component = createComponentWithIntl(
    <PeerDetails torrent={{...torrent, isDownloading: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('PeerDetails seeding', () => {
  const component = createComponentWithIntl(
    <PeerDetails torrent={{...torrent, isSeeding: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('PeerDetails checking', () => {
  const component = createComponentWithIntl(
    <PeerDetails torrent={{...torrent, isChecking: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('PeerDetails status', () => {
  const component = createComponentWithIntl(
    <PeerDetails torrent={{...torrent}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
