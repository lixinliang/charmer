import { Layer } from '@/components/layer'
import { Video } from '@/components/video'
import { Control } from '@/components/control'
import { Gyroscope } from '@/components/gyroscope'
import { mask } from '@/utils/mask'
import { useCanvas } from '@/hooks/canvas'

export const Layout = () => {
  const Mask = useCanvas(mask)

  return (
    <div className="relative top-0 left-0 w-full h-full">
      <Layer className="bg-black" />
      <Layer>
        <Video />
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
