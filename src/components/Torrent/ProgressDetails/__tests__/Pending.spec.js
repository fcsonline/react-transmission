import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Pending from '../Pending';

test('Pending', () => {
  const component = createComponentWithIntl(
    <Pending torrent={{sizeWhenDone: 1E5, leftUntilDone: 1E4, percentDone: 0.9}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
