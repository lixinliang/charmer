import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/components/app'

export const init = () => {
  const app = document.createElement('app')

  document.body.appendChild(app)

  createRoot(app).render(<App />)
}
