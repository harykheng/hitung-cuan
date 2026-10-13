import { STUDIO_URL } from '../config'
import { H2, Section } from './ui'

export function Maker() {
  return (
    <Section id="pembuat" labelledby="pembuat-judul">
      <H2 id="pembuat-judul">Siapa di balik ini</H2>
      <blockquote data-reveal className="mt-8 max-w-3xl border-l-8 border-lime pl-5 sm:pl-8">
        <p className="font-display text-2xl leading-snug font-bold text-balance sm:text-3xl">
          Dibuat untuk dua toko Shopee beauty kami sendiri (Harel Beauty dan Oraiste Beauty House), karena spreadsheet
          tidak pernah cocok dengan saldo. Sekarang dibuka untuk seller lain.
        </p>
      </blockquote>
      <p className="mt-6 max-w-3xl text-lg text-on-field-muted">
        Dibangun oleh{' '}
        <a href={STUDIO_URL} className="font-semibold text-on-field underline decoration-lime decoration-2 underline-offset-4">
          Studio Harel
        </a>
        .
      </p>
    </Section>
  )
}
