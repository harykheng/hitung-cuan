import { useEffect } from 'react'
import { SkipLink } from './components/Bars'
import { Header } from './landing3/Header'
import { Hero } from './landing3/Hero'
import { Problem } from './landing3/Problem'
import { Saring } from './landing3/Saring'
import { Checks, Closing, Faq, Footer, Preview, Privacy, Steps } from './landing3/Sections'
import './landing3/landing3.css'
import { SourceProvider } from './lib/source'
import { trackVisit, watchScrollDepth } from './lib/track'

/*
 * Landing 3 (branch landing-3, Okt 2026): konsep "Saring", halaman sebagai lembar kerja (DESIGN.md, bagian Landing 3).
 * Susunan mengikuti brief: header, hero, masalah, momen khas "Saring", yang bisa dicek, cara kerja, preview, privasi,
 * FAQ, penutup, footer. Komponen landing 1 di src/components/ masih ada tetapi tidak diimpor (kecuali SkipLink,
 * InAppWaHelp, dan WhatsAppIcon), jadi bundel hanya memuat yang dipakai.
 * Gerak (GSAP + Lenis) dimuat terpisah setelah hidrasi lewat import dinamis, supaya tidak menahan tampilan pertama.
 */
export default function App() {
  useEffect(() => {
    trackVisit()
    const stopDepth = watchScrollDepth()
    let stop: (() => void) | undefined
    let cancelled = false
    import('./landing3/motion').then(({ startMotion }) => {
      if (!cancelled) stop = startMotion()
    })
    return () => {
      cancelled = true
      stopDepth()
      stop?.()
    }
  }, [])

  return (
    <SourceProvider>
      <div className="l3">
        <SkipLink />
        <Header />
        <main id="utama" tabIndex={-1}>
          <Hero />
          <Problem />
          <Saring />
          <Checks />
          <Steps />
          <Preview />
          <Privacy />
          <Faq />
          <Closing />
        </main>
        <Footer />
      </div>
    </SourceProvider>
  )
}
