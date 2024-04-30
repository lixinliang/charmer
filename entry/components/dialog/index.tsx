import { useEffect, useState } from 'react'
import { Layer } from '@/components/layer'
import { emitter, CLICK_BUTTON_PHOTO } from '@/utils/events'
import { storeGallery, GALLERY_LIST } from '@/utils/store'
import { type GallerySource } from '@/utils/gallery'

export const Dialog = () => {
  const [display, setDisplay] = useState(false)
  const [list, setList] = useState<GallerySource[]>([])

  const show = () => {
    setDisplay(true)
  }

  const hide = () => {
    setDisplay(false)
  }

  useEffect(() => {
    emitter.on(CLICK_BUTTON_PHOTO, () => {
      storeGallery.getItem<GallerySource[]>(GALLERY_LIST).then((list) => {
        if (list) {
          setList(list)
          show()
        }
      })
    })
    return () => {
      emitter.removeAllListeners(CLICK_BUTTON_PHOTO)
    }
  }, [])

  const handleClick = () => {
    setTimeout(() => {
      hide()
      setList([])
    }, 300);
  }

  return (
    <Layer className={`${display ? 'block': 'hidden'} bg-white`}>
      <div className='w-full h-full px-4 pt-4 pb-20 relative'>
        <div className='w-full h-full overflow-scroll'>
          {
            list.map((item, index) => {
              return (
                <div className='w-full mb-8' key={index}>
                  <img src={item.base64} alt="" />
                </div>
              )
            })
          }
        </div>
        <Layer.Bottom className='flex justify-center py-4 bg-white'>
          <button className='w-40 h-12 bg-blue-400 rounded active:scale-105' onClick={handleClick} />
        </Layer.Bottom>
      </div>
    </Layer>
  )
}
