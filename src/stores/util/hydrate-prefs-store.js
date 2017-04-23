import { FilterStates, PrefCookieKeys } from '../prefs-store'
import { findByProperty } from 'util/common';
import { rehydrateKey } from 'util/persistors';

export default function () {
  const prefs = JSON.parse(rehydrateKey(PrefCookieKeys.prefs, "{}"));

  // status filter is saved as a string (i.e. 'all')
  // so we need to make sure to save and read it as so.
  const savedFilter = prefs.statusFilter || 'all';

  return {
    statusFilter: findByProperty(FilterStates, 'persistKey', savedFilter).value,
    sortCriteria: prefs.sortCriteria || 'name',
    sortDirection: prefs.sortDirection || '',
    compact: prefs.compact || false
  }
}
