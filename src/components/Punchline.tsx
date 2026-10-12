import { Underline } from './motion'
import { Container } from './ui'

export function Punchline() {
  return (
    <div className="bg-lime py-10 text-ink sm:py-14">
      <Container>
        <p className="max-w-4xl font-display text-2xl leading-snug font-bold text-balance sm:text-4xl">
          <strong className="font-extrabold">Bukan cuma hitung.</strong> HitungCuan kasih tahu{' '}
          <Underline>iklan mana yang harus dimatikan</Underline> dan <Underline delay={0.25}>harga minimum yang aman</Underline>.
        </p>
      </Container>
    </div>
  )
}
