import {
  useEffect,
  type FC,
  type PropsWithChildren,
} from 'react'
import { GalleryInstance, GallerySource } from '@/utils/gallery'
import { emitter, ADD_GALLERY, UPDATE_MASK, CLICK_BUTTON_PHOTO, CLICK_BUTTON_SHUTTER } from '@/utils/events'

const storeGallery = window._localForage?.createInstance({
  name: 'gallery',
})

window._storeGallery = storeGallery

const GALLERY_LIST = 'GALLERY_LIST'

export const Store: FC<PropsWithChildren> = (props) => {
  const { children } = props

  useEffect(() => {
    const handler = (gallery: GalleryInstance, callback: () => void) => {
      if (storeGallery) {
        storeGallery.getItem<Array<GallerySource>>(GALLERY_LIST).then((array) => {
          const list = array || []
          const item: GallerySource = {
            base64: gallery.base64,
          }
          list.push(item)
          storeGallery.setItem(GALLERY_LIST, list).then(() => {
            callback()
          })
        })
      } else {
        callback()
      }
    }
    const handle2 = () => {
      console.log('UPDATE_MASK')
    }
    const handle3 = () => {
      console.log('CLICK_BUTTON_PHOTO')
    }
    const handle4 = () => {
      console.log('CLICK_BUTTON_SHUTTER')
    }
    emitter.on(ADD_GALLERY, handler)
    emitter.on(UPDATE_MASK, handle2)
    emitter.on(CLICK_BUTTON_PHOTO, handle3)
    emitter.on(CLICK_BUTTON_SHUTTER, handle4)
    return () => {
      emitter.off(ADD_GALLERY, handler)
      emitter.off(UPDATE_MASK, handle2)
      emitter.off(CLICK_BUTTON_PHOTO, handle3)
      emitter.off(CLICK_BUTTON_SHUTTER, handle4)
    }
  }, [])

  return (
    <>{children}</>
  )
}
