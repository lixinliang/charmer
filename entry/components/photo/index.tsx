import { useCallback } from 'react'
import { emitter, CLICK_BUTTON_PHOTO } from '@/utils/events'

export const Photo = () => {
  const handleClick = useCallback(() => {
    emitter.emit(CLICK_BUTTON_PHOTO)
  }, [])

  return (
    <button className="w-12 h-12 bg-white rounded duration-300 active:scale-105" onClick={handleClick} />
  )
}
