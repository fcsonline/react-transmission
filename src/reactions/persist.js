import { reaction } from 'mobx';
import { persistKey } from 'util/persistors';
import { PrefCookieKeys } from 'stores/prefs-store';

export default function ({ prefs_store }) {
  const keys = ['statusFilter', 'sortCriteria', 'sortDirection', 'compact']
  reaction(
    _ => keys.reduce((acc, k) => ({ ...acc, [k]: prefs_store[k] }), {}),
    prefs => {
      persistKey(PrefCookieKeys.prefs, JSON.stringify(prefs));
    }
  )
}
