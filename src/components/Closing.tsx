import { REPLY_PROMISE } from '../config'
import { Container, Cta } from './ui'

/** CTA penutup: blok lime penuh. */
export function Closing() {
  return (
    <section aria-labelledby="penutup" className="on-lime bg-lime py-16 text-field-deep sm:py-24">
      <Container>
        <h2
          id="penutup"
          className="max-w-3xl font-display text-4xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          Mulai dari satu bulan data.
        </h2>
        <div className="mt-8">
          <Cta lokasi="penutup" variant="blue" />
          <p className="mt-4 font-semibold">{REPLY_PROMISE}. Coba gratis 30 hari, tanpa kartu kredit.</p>
          <p className="mt-1 text-sm">Data pembeli tidak pernah dibaca · Bukan produk resmi Shopee</p>
        </div>
      </Container>
    </section>
  )
}
