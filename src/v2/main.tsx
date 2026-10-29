import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/parkinsans/latin-700.css'
import '@fontsource/parkinsans/latin-800.css'
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '../index.css'
import AppV2 from './App'

// Sama dengan src/main.tsx, untuk /v2/. Tanpa JetBrains Mono: hanya landing 3 yang memakainya.
document.documentElement.setAttribute('data-hc', '')

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <AppV2 />
  </StrictMode>
)

if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
