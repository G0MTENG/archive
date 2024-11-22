import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'sanitize.css'
import './reset.css'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
