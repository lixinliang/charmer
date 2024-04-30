export const storeGallery = window._localForage?.createInstance({
  name: 'gallery',
})

export const GALLERY_LIST = 'GALLERY_LIST'

window._storeGallery = storeGallery
