import { useEffect } from 'react'
import { BottomBar, SkipLink } from '../components/Bars'
import { SourceProvider } from '../lib/source'
import { trackVisit, watchScrollDepth } from '../lib/track'
import { BeforeAfter, Closing, Faq, Features, Footer, Header, Hero, Leaks, Pricing, Privacy, Problems, Products, Steps } from './Sections'

/*
 * Landing v2 (/v2/, Okt 2026): halaman alternatif untuk diuji melawan landing utama (DESIGN.md, bagian "Landing v2").
 * Kode sumbernya V2 (src/lib/whatsapp.ts, pageCode), jadi chat dan statistiknya terpisah dari landing utama.
 */
export default function AppV2() {
  useEffect(() => {
    trackVisit()
    return watchScrollDepth()
  }, [])

  return (
    <SourceProvider initial="V2">
      <SkipLink />
      <Header />
      <main id="utama" tabIndex={-1}>
        <Hero />
        <Leaks />
        <Products />
        <Problems />
        <BeforeAfter />
        <Steps />
        <Features />
        <Privacy />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <BottomBar />
    </SourceProvider>
  )
}
