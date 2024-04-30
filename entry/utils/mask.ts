import { emitter, UPDATE_MASK } from '@/utils/events'
import { type Init } from '@/hooks/canvas'
import { type GalleryInstance } from '@/utils/gallery'

export const mask: Init = (canvas, context) => {
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

    // const fixedRatio = canvasWidth / galleryWidth
    // const fixedHeight = galleryHeight * fixedRatio
    // const fixedTop = canvasHeightHalf - fixedHeight / 2

    // context.drawImage(galleryCanvas, 0, 0, galleryWidth, galleryHeight)
  })
}
