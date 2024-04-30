import { useEffect, useState } from 'react'


export const Gyroscope = () => {
  const [alpha, setAlpha] = useState('')
  const [beta, setBeta] = useState('')
  const [gamma, setGamma] = useState('')

  useEffect(() => {
    const handleSensor = (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event || {}
      setAlpha((alpha || 0).toFixed(2))
      setBeta((beta || 0).toFixed(2))
      setGamma((gamma || 0).toFixed(2))
    }
    handleSensor(null!)
    window.addEventListener('deviceorientation', handleSensor)
    return () => {
      window.removeEventListener('deviceorientation', handleSensor)
    }
  }, [])

  return (
    <div className="flex w-full px-6 pt-2 text-l text-white text-center">
      <span className="flex-1">{alpha}</span>
      <span className="flex-1">{beta}</span>
      <span className="flex-1">{gamma}</span>
    </div>
  )
}
