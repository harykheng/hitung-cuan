/**
 * Pelacakan ringan tanpa cookie. Tidak ada skrip analitik bawaan: pasang sendiri (lihat README),
 * lalu peristiwa di bawah otomatis diteruskan ke Plausible/Umami kalau ada, dan selalu dikirim
 * sebagai CustomEvent `hc:track` di window untuk penangkap lain.
 */
export type CtaLocation = 'bar_atas' | 'hero' | 'simulator' | 'harga' | 'faq' | 'penutup' | 'bar_bawah' | 'footer'

type Props = Record<string, string | number>

declare global {
  interface Window {
    plausible?: (name: string, opts?: { props?: Props }) => void
    umami?: { track: (name: string, props?: Props) => void }
  }
}

const once = new Set<string>()

export function track(name: string, props: Props = {}): void {
  if (typeof window === 'undefined') return
  try {
    window.plausible?.(name, { props })
    window.umami?.track(name, props)
    window.dispatchEvent(new CustomEvent('hc:track', { detail: { name, props } }))
  } catch {
    /* pelacakan tidak boleh mengganggu halaman */
  }
}

export function trackOnce(name: string, props: Props = {}): void {
  const key = name + JSON.stringify(props)
  if (once.has(key)) return
  once.add(key)
  track(name, props)
}

export const trackCta = (lokasi: CtaLocation) => track('cta_click', { lokasi })

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
