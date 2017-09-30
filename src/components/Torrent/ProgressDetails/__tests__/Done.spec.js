import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Done from '../Done';

test('Done', () => {
  const component = createComponentWithIntl(
    <Done torrent={{sizeWhenDone: 1E5, totalSize: 1E5, percentDone: 1, uploadedEver: 1E5, uploadRatio: 2}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Done partially', () => {
  const component = createComponentWithIntl(
    <Done torrent={{sizeWhenDone: 1E4, totalSize: 1E5, percentDone: 0.1, uploadedEver: 1E4, uploadRatio: 2}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
