import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Magnet from '../Magnet';

test('Magnet', () => {
  const component = createComponentWithIntl(
    <Magnet torrent={{metadataPercentComplete: 0.75}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Magnet stopped', () => {
  const component = createComponentWithIntl(
    <Magnet torrent={{metadataPercentComplete: 0.75, isStopped: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
