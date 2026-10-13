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
          Coba gratis 30 hari untuk tokomu.
        </h2>
        <p className="mt-5 max-w-xl text-lg font-semibold">
          Chat admin lewat WhatsApp. Akun tokomu dibuatkan secara manual, dan {REPLY_PROMISE.charAt(0).toLowerCase()}
          {REPLY_PROMISE.slice(1)}.
        </p>
        <div className="mt-8">
          <Cta lokasi="penutup" variant="blue" />
          <p className="mt-4 text-sm">Tanpa kartu kredit · Saat ini hanya untuk Shopee · Bukan produk resmi Shopee</p>
        </div>
      </Container>
    </section>
  )
}
