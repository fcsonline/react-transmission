import { reaction } from 'mobx';
import { findByProperty } from 'util/common';
import { persistKey } from 'util/persistors';
import { FilterStates, PrefCookieKeys } from 'stores/prefs-store';

export default function ({ prefs_store }) {
  const keys = ['statusFilter', 'sortCriteria', 'sortDirection', 'compact']
  reaction(
    () => keys.map(k => [k, prefs_store[k]]),
    pairs => {
      pairs.forEach(obj => {
        let [k, value] = obj;

        if (k === 'statusFilter') {
          // status filter is saved as a string (i.e. 'all')
          // so we need to make sure to save and read it as so.
          value = findByProperty(FilterStates, 'value', value).persistKey;
        }

        persistKey(PrefCookieKeys[k], value);
      });
    }
  )
}
