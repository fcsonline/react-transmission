import { PrefCookieKeys } from '../prefs-store'
import { rehydrateKey } from 'util/persistors';

export default function () {
  const prefs = JSON.parse(rehydrateKey(PrefCookieKeys.prefs, "{}"));

  return {
    statusFilter: prefs.statusFilter || 'all',
    sortCriteria: prefs.sortCriteria || 'name',
    sortDirection: prefs.sortDirection || '',
    compact: prefs.compact || false
  }
}
