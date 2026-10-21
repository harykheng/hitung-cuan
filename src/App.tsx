import { useEffect } from 'react'
import { SkipLink, TopBar } from './components/Bars'
import { Benefits } from './components/Benefits'
import { Closing } from './components/Closing'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Preview } from './components/Preview'
import { Privacy } from './components/Privacy'
import { Problem } from './components/Problem'
import { useRevealOnScroll } from './lib/hooks'
import { SourceProvider } from './lib/source'
import { trackVisit, watchScrollDepth } from './lib/track'

/*
 * Landing 2 (brief "landing-page-prompt-hitung-cuan", Okt 2026). Susunan mengikuti brief:
 * header, hero, masalah, yang bisa dicek, cara kerja, preview aplikasi, privasi, FAQ, penutup, footer.
 * Komponen landing 1 (Simulator, Story, Pricing, Features, Problems, Trust) masih ada di src/components/ tetapi
 * tidak dipakai di sini; bundel hanya memuat yang diimpor.
 */
export default function App() {
  useRevealOnScroll()
  useEffect(() => {
    trackVisit()
    return watchScrollDepth()
  }, [])

  return (
    <SourceProvider>
      <SkipLink />
      <TopBar />
      <main id="utama">
        <Hero />
        <Problem />
        <Benefits />
        <HowItWorks />
        <Preview />
        <Privacy />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </SourceProvider>
  )
}
