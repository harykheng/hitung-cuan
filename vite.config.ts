import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Dua halaman: landing utama (/) dan Landing v2 (/v2/). Keduanya di-prerender oleh scripts/prerender.mjs.
    rollupOptions: {
      input: {
        main: new URL('index.html', import.meta.url).pathname,
        v2: new URL('v2/index.html', import.meta.url).pathname,
      },
    },
  },
})
