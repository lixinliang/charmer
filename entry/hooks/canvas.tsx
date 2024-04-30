import {
  memo,
  useEffect,
  useRef,
  type FC,
  type HTMLAttributes,
} from 'react'

interface Init {
  (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ): void
}

export const useCanvas = (init: Init) => {
  return memo<HTMLAttributes<HTMLCanvasElement>>((props) => {
    const { className } = props
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
      const canvas = ref.current
      if (canvas) {
        const { width, height } = getComputedStyle(canvas)
        canvas.width = parseInt(width) * devicePixelRatio
        canvas.height = parseInt(height) * devicePixelRatio
        const context = canvas.getContext('2d')!
        init(canvas, context)
      }
    }, [])
    return <canvas ref={ref} className={`w-full h-full ${className}`} />
  })
}
