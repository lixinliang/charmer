import { memo, useEffect, useRef } from 'react'

const {
  screen,
  devicePixelRatio,
} = window

const width = screen.width * devicePixelRatio
const height = screen.height * devicePixelRatio

export const useCanvas = () => {
  return memo(() => {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = ref.current

      if (canvas) {
        const context = canvas.getContext('2d')!

        console.log(canvas, context)
  
        // const loop = () => {
        //   context.clearRect(0, 0, canvas.width, canvas.height)
  
        //   context.fillStyle = 'black'
        //   context.fillRect(0, 0, canvas.width / 2, canvas.height / 2)
  
        //   requestAnimationFrame(loop)
        // }
  
        // requestAnimationFrame(loop)
      }
    }, [])

    return <canvas ref={ref} width={width} height={height} className="w-full h-full" />
  })
}
