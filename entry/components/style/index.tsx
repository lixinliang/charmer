import {
  type FC,
  type PropsWithChildren,
} from 'react'
import './global.css'

export const Style: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <>{children}</>
  )
}
