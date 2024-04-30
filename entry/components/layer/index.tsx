import {
  type FC,
  type PropsWithChildren,
  type HTMLAttributes,
} from 'react'

type BFC = FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>>

type AFC = BFC & {
  Top: BFC,
  Bottom: BFC,
}

export const Layer: AFC = (props) => {
  const { className = '', children } = props

  return (
    <div className={`absolute top-0 left-0 w-full h-full ${className}`}>
      {children}
    </div>
  )
}

const Top: BFC = (props) => {
  const { className = '', children } = props

  return (
    <div className={`absolute top-0 left-0 w-full ${className}`}>
      {children}
    </div>
  )
}

const Bottom: BFC = (props) => {
  const { className = '', children } = props

  return (
    <div className={`absolute bottom-0 left-0 w-full ${className}`}>
      {children}
    </div>
  )
}

Layer.Top = Top
Layer.Bottom = Bottom
