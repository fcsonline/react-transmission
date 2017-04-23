import { reaction } from 'mobx';
import { findByProperty } from 'util/common';
import { persistKey } from 'util/persistors';
import { FilterStates, PrefCookieKeys } from 'stores/prefs-store';

export default function ({ prefs_store }) {
  const keys = ['statusFilter', 'sortCriteria', 'sortDirection', 'compact']
  reaction(
    _ => keys.reduce((acc, k) => {
      let value = prefs_store[k];

      if (k === 'statusFilter') {
        // status filter is saved as a string (i.e. 'all')
        // so we need to make sure to save and read it as so.
        value = findByProperty(FilterStates, 'value', value).persistKey;
      }

      return { ...acc, [k]: value };
    }, {}),
    prefs => {
      persistKey(PrefCookieKeys.prefs, JSON.stringify(prefs));
    }
  )
}
