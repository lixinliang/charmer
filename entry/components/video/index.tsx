import { useRef, useEffect } from 'react'
import { emitter, CLICK_BUTTON_SHUTTER, ADD_GALLERY } from '@/utils/events'
import { createCanvas } from '@/utils/canvas'
import { createGallery } from '@/utils/gallery'

let off = true

export const Video = () => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current) {
      const video = ref.current
      emitter.on(CLICK_BUTTON_SHUTTER, async () => {
        if (off) {
          off = false
          navigator
          .mediaDevices
          .getUserMedia({
            video: {
              facingMode: 'environment',
            },
          })
          .then((stream) => {
            video.srcObject = stream
          })
          .catch((_err) => {
            /* handle the error */
          })
        } else {
          const {
            clientWidth,
            clientHeight,
          } = video
          const width = clientWidth * devicePixelRatio
          const height = clientHeight * devicePixelRatio
          const { canvas, context } = createCanvas(width, height)
          context.drawImage(video, 0, 0, width, height)
          const base64 = canvas.toDataURL('image/png')
          const gallery = await createGallery({
            base64,
          })
          emitter.emit(ADD_GALLERY, gallery)
        }
      })
    }
    return () => {
      emitter.removeAllListeners(CLICK_BUTTON_SHUTTER)
    }
  }, [])

  return (
    <video className='w-full h-full' playsInline autoPlay ref={ref} />
  )
}
