import { useCallback } from 'react'

export const Shutter = () => {
  const handleClick = useCallback(() => {
    console.log('Shutter')
  }, [])

  return (
    <div className="flex justify-center items-center
      rounded-full w-[76px] h-[76px]
      border-white border-[3px]">
      <button className="rounded-full w-16 h-16 bg-white duration-300 active:scale-95" onClick={handleClick} />
    </div>
  )
}
