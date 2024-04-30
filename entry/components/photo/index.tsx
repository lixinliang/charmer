import { useCallback } from 'react'

export const Photo = () => {
  const handleClick = useCallback(() => {
    console.log('Photo')
  }, [])

  return (
    <button className="w-12 h-12 bg-white rounded duration-300 active:scale-105" onClick={handleClick} />
  )
}
