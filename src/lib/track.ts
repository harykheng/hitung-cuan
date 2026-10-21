import { getSourceCode } from './whatsapp'

/**
 * Pelacakan lewat Umami Cloud (skrip di index.html), tanpa cookie. Peristiwa juga selalu dikirim sebagai
 * CustomEvent `hc:track` di window untuk penangkap lain. Setiap peristiwa membawa properti `sumber` (kode `?src=`,
 * sama dengan "Kode: HC-..." di pesan WhatsApp), kecuali scroll_depth: tiap properti dihitung sebagai satu event di
 * kuota Umami, jadi properti hanya ditambahkan di peristiwa yang dibaca per sumber.
 */
export type CtaLocation =
  | 'bar_atas'
  | 'menu'
  | 'hero'
  | 'faq'
  | 'penutup'
  | 'footer'
  // Lokasi landing 1 (simulator, harga, bar bawah HP): tidak ada di landing 3, tetap di tipe untuk komponen lama.
  | 'simulator'
  | 'harga'
  | 'bar_bawah'

type Props = Record<string, string | number>

declare global {
  interface Window {
    umami?: { track: (name: string, props?: Props) => void }
  }
}

/* Skrip Umami dimuat setelah bundle, jadi peristiwa yang terjadi lebih dulu (kunjungan) ditahan sampai skripnya siap. */
const pending: [string, Props][] = []
let waiting = false

function flush() {
  if (!window.umami) return false
  for (const [name, props] of pending.splice(0)) window.umami.track(name, props)
  return true
}

function sendToUmami(name: string, props: Props) {
  if (window.umami) return window.umami.track(name, props)
  pending.push([name, props])
  if (waiting) return
  waiting = true
  const script = document.querySelector('script[data-website-id]')
  script?.addEventListener('load', () => flush(), { once: true })
  // Cadangan kalau event load sudah lewat atau skrip diblokir: cek beberapa kali, lalu berhenti diam-diam.
  let tries = 0
  const id = window.setInterval(() => {
    if (flush() || ++tries >= 20) window.clearInterval(id)
  }, 500)
}

export function track(name: string, props: Props = {}): void {
  if (typeof window === 'undefined') return
  try {
    sendToUmami(name, props)
    window.dispatchEvent(new CustomEvent('hc:track', { detail: { name, props } }))
  } catch {
    /* pelacakan tidak boleh mengganggu halaman */
  }
}

const once = new Set<string>()

export function trackOnce(name: string, props: Props = {}): void {
  const key = name + JSON.stringify(props)
  if (once.has(key)) return
  once.add(key)
  track(name, props)
}

const sumber = () => getSourceCode(window.location.search)

/** Satu kali per pemuatan halaman: penyebut CTR per sumber. */
export const trackVisit = () => trackOnce('kunjungan', { sumber: sumber() })

/**
 * Klik WhatsApp dihitung sekali per pemuatan halaman (klik pertama), supaya cta_click ÷ kunjungan = CTR.
 * `lokasi` adalah tombol yang pertama ditekan.
 */
let clicked = false
export function trackCta(lokasi: CtaLocation): void {
  if (clicked) return
  clicked = true
  track('cta_click', { lokasi, sumber: sumber() })
}

export const trackSimulator = () => trackOnce('simulator_used', { sumber: sumber() })

/** Tombol "Salin nomor" di bantuan browser bawaan aplikasi (TikTok, Threads). */
export const trackCopyNumber = (lokasi: CtaLocation) => trackOnce('salin_nomor', { lokasi, sumber: sumber() })

/** Kedalaman gulir 25/50/75/100%, satu kali per ambang per kunjungan. */
export function watchScrollDepth(): () => void {
  const marks = [25, 50, 75, 100]
  const onScroll = () => {
    const el = document.documentElement
    const max = el.scrollHeight - window.innerHeight
    if (max <= 0) return
    const pct = (window.scrollY / max) * 100
    for (const m of marks) if (pct >= m - 1) trackOnce('scroll_depth', { persen: m })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
