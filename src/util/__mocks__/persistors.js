const store = {}

export default {
  persistKey: (k, v) => { store[k] = v },
  rehydrateKey: (k, v) => store[k]
}
