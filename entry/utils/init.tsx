import React, { version } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/components/app'
import { log } from '@/utils/log'

export const init = () => {
  log({
    name: 'react',
    version: version,
  })

  const app = document.createElement('app')

  document.body.appendChild(app)

  createRoot(app).render(<App />)
}
