import { log } from '@/utils/log'
import { createImage, createCanvas } from '@/utils/canvas'

export interface GallerySource {
  base64: string
}

export interface GalleryInstance extends GallerySource {
  size: number
  img: HTMLImageElement
  width: number
  height: number
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
}

export const createGallery: (source: GallerySource) => Promise<GalleryInstance> = async (source: GallerySource) => {
  const {
    base64,
  } = source
  const size = base64.length
  const base = {
    file: 'gallery.ts',
    function: 'createGallery',
  }
  log({
    ...base,
    size,
  })
  const {
    img,
    width,
    height,
  } = await createImage(base64)
  const {
    canvas,
    context,
  } = createCanvas(width, height)
  context.drawImage(img, 0, 0)
  log({
    ...base,
    width,
    height,
  })
  return {
    base64,
    size,
    img,
    width,
    height,
    canvas,
    context,
  }
}
