import {
  useCallback,
  type ChangeEvent,
} from 'react'
import { read } from '@/utils/canvas'
import { createGallery } from '@/utils/gallery'
import { emitter, ADD_GALLERY, UPDATE_MASK } from '@/utils/events'

export const Camera = () => {
  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const base64 = await read(file)
    const gallery = await createGallery({
      base64,
    })
    emitter.emit(ADD_GALLERY, gallery, () => {
      emitter.emit(UPDATE_MASK, gallery)
    })
  }, [])

  return (
    <div className="w-12 h-12 bg-white rounded-full duration-300 active:scale-105">
      <input type="file" accept="image/*" className="w-full h-full opacity-0" onChange={handleChange} />
    </div>
  )
}
