import {
  useEffect,
  type FC,
  type PropsWithChildren,
} from 'react'

export const Store: FC<PropsWithChildren> = (props) => {
  const { children } = props

  useEffect(() => {
    const _storeGallery = window._localForage?.createInstance({
      name: 'gallery',
    })

    window._storeGallery = _storeGallery
  }, [])

  return (
    <>{children}</>
  )
}
