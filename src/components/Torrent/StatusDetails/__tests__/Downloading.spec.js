import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Downloading from '../Downloading';

test('Downloading from peers and webseeds', () => {
  const component = createComponentWithIntl(
    <Downloading
      torrent={{
        peersSendingToUs: 5,
        peersConnected: 5,
        webseedsSendingToUs: 5,
        rateUpload: 1E5,
        rateDownload: 1E7,
      }}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Downloading from webseeds', () => {
  const component = createComponentWithIntl(
    <Downloading
      torrent={{
        webseedsSendingToUs: 5,
        rateUpload: 1E5,
        rateDownload: 1E7,
      }}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Downloading from peers', () => {
  const component = createComponentWithIntl(
    <Downloading
      torrent={{
        peersSendingToUs: 5,
        peersConnected: 5,
        rateUpload: 1E5,
        rateDownload: 1E7,
      }}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
