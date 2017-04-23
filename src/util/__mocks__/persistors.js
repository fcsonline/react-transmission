const store = {}

export const persistKey = (k, v) => { store[k] = v }
export const rehydrateKey = (k, f) => store[k] || f

export default {
  persistKey,
  rehydrateKey
}
