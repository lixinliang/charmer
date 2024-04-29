import localForage from 'localforage'

window._addLog({
  hash: HASH,
  mode: MODE,
  version: VERSION,
  timestamp: TIMESTAMP,
})

window._localForage = localForage

const storeBundle = localForage.createInstance({
  name: 'bundle',
})

window._storeBundle = storeBundle

window._invokeBundle({
  name: 'view',
  storage: storeBundle,
})
