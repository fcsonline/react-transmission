import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import ProgressDetails from '../';

const torrent = {
  metadataPercentComplete: 0.75,
  sizeWhenDone: 1E5,
  leftUntilDone: 1E4,
  percentDone: 0.9,
  totalSize: 1E5,
  uploadedEver: 1E5,
  uploadRatio: 2,
};

test('ProgressDetails magnet', () => {
  const component = createComponentWithIntl(
    <ProgressDetails torrent={{...torrent, needsMetaData: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ProgressDetails done', () => {
  const component = createComponentWithIntl(
    <ProgressDetails torrent={{...torrent, isDone: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ProgressDetails seeding', () => {
  const component = createComponentWithIntl(
    <ProgressDetails torrent={{...torrent, isSeeding: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ProgressDetails pending', () => {
  const component = createComponentWithIntl(
    <ProgressDetails torrent={{...torrent}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
