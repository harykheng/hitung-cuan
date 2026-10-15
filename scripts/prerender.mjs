// Render App ke HTML statis setelah `vite build`, supaya konten langsung tampil
// tanpa menunggu JavaScript (LCP lebih cepat, crawler & preview link bisa baca).
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const ssrDir = new URL('../dist-ssr/', import.meta.url)
const { render, WA_NUMBER } = await import(new URL('entry-server.js', ssrDir))

const indexUrl = new URL('index.html', dist)
let html = await readFile(indexUrl, 'utf8')
if (!html.includes('<!--app-->')) throw new Error('Placeholder <!--app--> tidak ditemukan di dist/index.html')

// Preload font yang dipakai di layar pertama (judul hero, sub-judul, tombol).
const assets = await readdir(new URL('assets/', dist))
const preloads = ['parkinsans-latin-800-normal', 'plus-jakarta-sans-latin-400-normal', 'plus-jakarta-sans-latin-600-normal']
  .map((prefix) => assets.find((f) => f.startsWith(prefix) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

html = html.replace('</title>', `</title>\n    ${preloads}`).replace('<!--app-->', render())
await writeFile(indexUrl, html)
await rm(ssrDir, { recursive: true, force: true })

console.log(`prerender: dist/index.html (${(html.length / 1024).toFixed(1)} KB)`)
if (!/^62\d{8,13}$/.test(WA_NUMBER)) {
  console.warn(`\n⚠️  WA_NUMBER di src/config.ts masih "${WA_NUMBER}". Semua tombol WhatsApp belum bisa dipakai.\n`)
}
