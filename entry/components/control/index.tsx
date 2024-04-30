import { Focal } from '@/components/focal'
import { Photo } from '@/components/photo'
import { Camera } from '@/components/camera'
import { Shutter } from '@/components/shutter'

export const Control = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full pb-6">
        <Focal />
      </div>
      <div className="flex justify-between items-center w-full px-6">
        <Photo />
        <Shutter />
        <Camera />
      </div>
    </>
  )
}
