import { log } from '@/utils/log'

String.prototype.call = function () {
  const method = new Function(this)
  method()
}

log({
  hash: HASH,
  mode: MODE,
  version: VERSION,
  timestamp: TIMESTAMP,
})

const isJS = (name: string) => /\.js$/.test(name)
const isCSS = (name: string) => /\.css$/.test(name)

window._updateBundle = (options) => {
  const { storage, name } = options
  let url;
  if (isJS(name)) {
    url = `./static/js/${name}`
  }
  if (isCSS(name)) {
    url = `./static/css/${name}`
  }
  if (url) {
    return fetch(url)
    .then((response) => {
      return response.text()
    }).then((bundle) => {
      storage.setItem(name, bundle)
      return bundle
    })
  }
  return Promise.reject(new Error('Invalid bundle name'))
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
    if (isJS(name)) {
      bundle.call()
    }
    if (isCSS(name)) {
      const style = document.createElement('style')
      style.innerHTML = bundle
      document.head.appendChild(style)
    }
  })
}

if (navigator.standalone) {
  window._invokeBundle({
    name: 'main.js',
    storage: localStorage,
  })
}
