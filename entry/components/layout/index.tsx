import { type FC } from 'react'
import { Layer } from '@/components/layer'
import { Control } from '@/components/control'
import { Gyroscope } from '@/components/gyroscope'
import { useCanvas } from '@/hooks/canvas'

export const Layout: FC = () => {
  const Media = useCanvas()
  const Mask = useCanvas()

  return (
    <div className="relative top-0 left-0 w-full h-full">
      <Layer className="bg-black" />
      <Layer>
        <Media />
      </Layer>
      <Layer>
        <Mask />
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
