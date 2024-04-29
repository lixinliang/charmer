String.prototype.call = function () {
  const method = new Function(this)
  method()
}

window._metaLog = []

window._addLog = (meta) => {
  window._metaLog.push({
    meta,
    timestamp: +new Date,
  })
}

window._addLog({
  hash: HASH,
  mode: MODE,
  version: VERSION,
  timestamp: TIMESTAMP,
})

window._updateBundle = (options) => {
  const { storage, name } = options
  return fetch(`./static/js/${name}.js`)
  .then((response) => {
    return response.text()
  }).then((bundle) => {
    storage.setItem(name, bundle)
    return bundle
  })
}

window._invokeBundle = (options) => {
  const { storage, name } = options
  Promise.resolve()
  .then(() => {
    return storage.getItem<string>(name)
  })
  .then((bundle) => {
    if (bundle) {
      return bundle
    } else {
      return window._updateBundle(options)
    }
  })
  .then((bundle) => {
    bundle.call()
  })
}

if (navigator.standalone) {
  window._invokeBundle({
    name: 'main',
    storage: localStorage,
  })
}
