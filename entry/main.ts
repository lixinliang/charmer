import localForage from 'localforage'
import { log } from '@/utils/log'

log({
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

window._invokeBundle?.({
  name: 'view.css',
  storage: storeBundle,
})

window._invokeBundle?.({
  name: 'view.js',
  storage: storeBundle,
})
