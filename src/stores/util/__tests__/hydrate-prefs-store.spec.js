jest.mock('util/persistors')

import React from 'react';
import { PrefCookieKeys } from '../../prefs-store';
import hydratePrefsStore from '../hydrate-prefs-store';
import { persistKey } from 'util/persistors';

describe('hydrate-prefs-store', () => {
  describe('hydrates', () => {
    it('default values on missing keys', () => {
      const store = hydratePrefsStore();

      expect(store).toEqual({
        statusFilter: -1,
        sortCriteria: 'name',
        sortDirection: '',
        compact: false
      });
    });
    it('persisted values', () => {
      persistKey(PrefCookieKeys.prefs, JSON.stringify({
        statusFilter: 'finished',
        sortCriteria: 'age',
        sortDirection: 'descending',
        compact: true
      }));

      const store = hydratePrefsStore();

      expect(store).toEqual({
        statusFilter: 55,
        sortCriteria: 'age',
        sortDirection: 'descending',
        compact: true
      });
    });
  });
});
