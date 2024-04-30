import {
  useEffect,
  type FC,
  type PropsWithChildren,
} from 'react'
import { GalleryInstance, GallerySource } from '@/utils/gallery'
import { emitter, ADD_GALLERY } from '@/utils/events'
import { storeGallery, GALLERY_LIST } from '@/utils/store'

export const Store: FC<PropsWithChildren> = (props) => {
  const { children } = props

  useEffect(() => {
    const handler = (gallery: GalleryInstance, callback?: () => void) => {
      if (storeGallery) {
        storeGallery.getItem<GallerySource[]>(GALLERY_LIST).then((array) => {
          const list = array || []
          const item: GallerySource = {
            base64: gallery.base64,
          }
          list.unshift(item)
          storeGallery.setItem(GALLERY_LIST, list).then(() => {
            callback?.()
          })
        })
      } else {
        callback?.()
      }
    }
    emitter.on(ADD_GALLERY, handler)
    return () => {
      emitter.off(ADD_GALLERY, handler)
    }
  }, [])

  return (
    <>{children}</>
  )
}
