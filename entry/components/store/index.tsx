import {
  useEffect,
  type FC,
  type PropsWithChildren,
} from 'react'
import { emitter, ADD_GALLERY, UPDATE_MASK, CLICK_BUTTON_PHOTO, CLICK_BUTTON_SHUTTER } from '@/utils/events'

export const Store: FC<PropsWithChildren> = (props) => {
  const { children } = props

  useEffect(() => {
    const _storeGallery = window._localForage?.createInstance({
      name: 'gallery',
    })

    window._storeGallery = _storeGallery
  }, [])

  useEffect(() => {
    const handle1 = () => {
      console.log('ADD_GALLERY')
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
    emitter.on(ADD_GALLERY, handle1)
    emitter.on(UPDATE_MASK, handle2)
    emitter.on(CLICK_BUTTON_PHOTO, handle3)
    emitter.on(CLICK_BUTTON_SHUTTER, handle4)
    return () => {
      emitter.off(ADD_GALLERY, handle1)
      emitter.off(UPDATE_MASK, handle2)
      emitter.off(CLICK_BUTTON_PHOTO, handle3)
      emitter.off(CLICK_BUTTON_SHUTTER, handle4)
    }
  }, [])

  return (
    <>{children}</>
  )
}
