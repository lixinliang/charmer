import { Layer } from '@/components/layer'
import { Control } from '@/components/control'
import { Gyroscope } from '@/components/gyroscope'
import { useCanvas } from '@/hooks/canvas'
import { GalleryInstance } from '@/utils/gallery'
import { emitter, UPDATE_MASK } from '@/utils/events'


export const Layout = () => {
  const Media = useCanvas(() => {

  })

  const Mask = useCanvas((canvas, context) => {
    const {
      width: canvasWidth,
      height: canvasHeight,
    } = canvas
    // const canvasWidthHalf = canvasWidth / 2
    const canvasHeightHalf = canvasHeight / 2
    emitter.on(UPDATE_MASK, (gallery: GalleryInstance) => {
      context.clearRect(0, 0, canvasWidth, canvasHeight)
      const {
        width: galleryWidth,
        height: galleryHeight,
        canvas: galleryCanvas,
      } = gallery

      const fixedRatio = canvasWidth / galleryWidth
      const fixedHeight = galleryHeight * fixedRatio
      const fixedTop = canvasHeightHalf - fixedHeight / 2

      context.drawImage(galleryCanvas, 0, fixedTop, canvasWidth, fixedHeight)
    })
  })

  return (
    <div className="relative top-0 left-0 w-full h-full">
      <Layer className="bg-black" />
      <Layer>
        <Media />
      </Layer>
      <Layer>
        <Mask className='opacity-50' />
      </Layer>
      <Layer className="
        before:absolute
        before:w-1/3 before:h-full
        before:border-x-[.5px] before:border-white
        before:left-1/2 before:-translate-x-1/2
        after:absolute
        after:w-full after:h-1/3
        after:border-y-[.5px] after:border-white
        after:top-1/2 after:-translate-y-1/2" />
      <Layer.Top>
        <Gyroscope />
      </Layer.Top>
      <Layer.Bottom className="pb-6">
        <Control />
      </Layer.Bottom>
    </div>
  )
}
