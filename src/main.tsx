import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/parkinsans/latin-700.css'
import '@fontsource/parkinsans/latin-800.css'
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import './index.css'
import App from './App'

// Tanda bagi skrip di index.html bahwa bundle berjalan; tanpa tanda ini konten tidak lagi disembunyikan.
document.documentElement.setAttribute('data-hc', '')

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Build produksi berisi HTML prerender (lihat scripts/prerender.mjs); dev server belum.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
