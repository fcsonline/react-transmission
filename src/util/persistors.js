export const genLocalStorageKey = key => `react-transmission.${key}`

export function persistKey (key, val) {
  window.localStorage.setItem(genLocalStorageKey(key), val);
}

export function rehydrateKey (key, fallback) {
  let val = window.localStorage.getItem(genLocalStorageKey(key));

  if (!val) {
    val = fallback;
  }

  return val;
}
