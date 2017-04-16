import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Seeding from '../Seeding';

test('Seeding none', () => {
  const component = createComponentWithIntl(
    <Seeding torrent={{peersGettingFromUs: 0, peersConnected: 0, rateUpload: 0}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Seeding single peers', () => {
  const component = createComponentWithIntl(
    <Seeding torrent={{peersGettingFromUs: 1, peersConnected: 1, rateUpload: 1E5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Seeding multiple peers', () => {
  const component = createComponentWithIntl(
    <Seeding torrent={{peersGettingFromUs: 5, peersConnected: 5, rateUpload: 1E5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
