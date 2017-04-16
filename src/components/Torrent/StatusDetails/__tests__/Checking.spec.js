import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Checking from '../Checking';

test('Checking', () => {
  const component = createComponentWithIntl(
    <Checking torrent={{recheckProgress: 0.5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
