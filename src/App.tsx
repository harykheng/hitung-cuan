import { useEffect } from 'react'
import { BottomBar, SkipLink, TopBar } from './components/Bars'
import { Closing } from './components/Closing'
import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Maker } from './components/Maker'
import { Pricing } from './components/Pricing'
import { Problems } from './components/Problems'
import { Simulator } from './components/Simulator'
import { Trust } from './components/Trust'
import { useRevealOnScroll } from './lib/hooks'
import { SourceProvider } from './lib/source'
import { trackVisit, watchScrollDepth } from './lib/track'

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
        <Problems />
        <Simulator />
        <HowItWorks />
        <Features />
        <Trust />
        <Maker />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <BottomBar />
    </SourceProvider>
  )
}
