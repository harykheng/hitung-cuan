import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Maker } from './components/Maker'
import { Pricing } from './components/Pricing'
import { Privacy } from './components/Privacy'
import { Problems } from './components/Problems'
import { Punchline } from './components/Punchline'
import { SignupForm } from './components/SignupForm'
import { Steps } from './components/Steps'
import { MotionProvider } from './components/motion'
import { useSourceCode } from './lib/useSourceCode'

export default function App() {
  const source = useSourceCode()
  return (
    <MotionProvider>
      <Hero />
      <main>
        <Problems />
        <Punchline />
        <Steps />
        <Features />
        <Maker />
        <Privacy />
        <Pricing />
        <Faq source={source} />
        <SignupForm source={source} />
      </main>
      <Footer />
    </MotionProvider>
  )
}
