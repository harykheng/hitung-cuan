import { m } from 'framer-motion'
import { Reveal } from './motion'
import { Container, CtaLink, SectionHeading } from './ui'

const INCLUDED = [
  'Untuk 1 toko Shopee.',
  'Mulai dengan coba gratis 30 hari.',
  'Termasuk update kalau format Shopee berubah.',
]

export function Pricing() {
  return (
    <section aria-labelledby="harga" className="bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading id="harga">Harga</SectionHeading>
        <div className="mt-10 grid max-w-4xl gap-5 md:grid-cols-2 md:items-stretch">
          <Reveal>
            <PlanCard name="Tahunan" price="Rp499.000" period="/tahun" featured />
          </Reveal>
          <Reveal delay={0.12}>
            <PlanCard name="Bulanan" price="Rp69.000" period="/bulan" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function PlanCard({ name, price, period, featured = false }: { name: string; price: string; period: string; featured?: boolean }) {
  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={
        featured
          ? 'dark-surface relative flex h-full flex-col rounded-2xl bg-field p-6 text-paper ring-4 ring-lime sm:p-8'
          : 'relative flex h-full flex-col rounded-2xl bg-counter p-6 text-ink sm:p-8'
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold">{name}</h3>
        {featured ? (
          <span className="rounded-full bg-lime px-3 py-1 text-sm font-bold text-ink">Paling hemat</span>
        ) : null}
      </div>
      <p className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-5xl font-extrabold tracking-tight tabular-nums">{price}</span>
        <span className={featured ? 'text-paper/80' : 'text-ink/70'}>{period}</span>
      </p>
      <ul className="mt-6 grid gap-2.5">
        {INCLUDED.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckIcon className={featured ? 'text-lime' : 'text-gain'} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <CtaLink variant={featured ? 'lime' : 'outline'} className="mt-8 w-full" />
    </m.article>
  )
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`mt-0.5 size-5 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
