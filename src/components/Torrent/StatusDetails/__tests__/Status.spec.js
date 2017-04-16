import React from 'react';
import createComponentWithIntl from 'test/util/createComponentWithIntl';

import Status from '../Status';

import Torrent from 'stores/torrent';

const {
  STATUS_STOPPED,
  STATUS_CHECK_WAIT,
  STATUS_CHECK,
  STATUS_DOWNLOAD_WAIT,
  STATUS_DOWNLOAD,
  STATUS_SEED_WAIT,
  STATUS_SEED,
} = Torrent;

test('Status check wait', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_CHECK_WAIT}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status check', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_CHECK}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status download wait', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_DOWNLOAD_WAIT}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status download', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_DOWNLOAD}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status seed wait', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_SEED_WAIT}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status seed', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_SEED}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status stopped finished', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_STOPPED, isFinished: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status stopped not finished', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: STATUS_STOPPED, isFinished: false}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status unknown', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: null}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Status other', () => {
  const component = createComponentWithIntl(
    <Status torrent={{status: -999}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
