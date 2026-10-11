import { STUDIO_URL } from '../config'
import { Container, SectionHeading } from './ui'

export function Maker() {
  return (
    <section aria-labelledby="dibuat-oleh-seller" className="bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading id="dibuat-oleh-seller">Dibuat oleh seller</SectionHeading>
        <blockquote className="mt-8 max-w-3xl border-l-8 border-lime pl-5 sm:pl-8">
          <p className="font-display text-2xl leading-snug font-bold text-balance sm:text-3xl">
            “Aku bikin tool ini untuk 2 toko beauty-ku sendiri, karena capek hitung untung di spreadsheet dan tetap
            nggak yakin angkanya benar.”
          </p>
        </blockquote>
        <p className="mt-6 max-w-3xl text-lg text-ink/75">
          Dibangun oleh{' '}
          <a
            href={STUDIO_URL}
            className="font-bold text-field underline decoration-2 underline-offset-4 hover:text-field-deep"
          >
            Studio Harel
          </a>
          , studio web untuk UMKM.
        </p>
      </Container>
    </section>
  )
}
