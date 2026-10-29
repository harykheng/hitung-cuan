import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import AppV2 from './v2/App'

export { WA_NUMBER } from './config'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

/** Landing v2, dilayani di /v2/ (dist/v2/index.html). */
export function renderV2(): string {
  return renderToString(
    <StrictMode>
      <AppV2 />
    </StrictMode>,
  )
}
