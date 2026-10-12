import { m } from 'framer-motion'
import { ConnectorLine, Reveal } from './motion'
import { Container, SectionHeading } from './ui'

const STEPS = [
  {
    title: 'Download 3 file dari Seller Centre',
    body: 'Export pesanan, laporan penghasilan, dan data iklan.',
  },
  {
    title: 'Upload ke HitungCuan',
    body: 'File dibaca langsung di browser.',
  },
  {
    title: 'Baca hasilnya',
    body: 'Untung bersih, putusan iklan per produk, dan harga minimum.',
  },
]

export function Steps() {
  return (
    <section aria-labelledby="cara-kerja" className="bg-paper pb-16 sm:pb-24">
      <Container>
        <div className="pt-16 sm:pt-24">
          <SectionHeading id="cara-kerja">Cara kerja</SectionHeading>
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title} className="group relative flex gap-4 md:flex-col">
              <ConnectorLine className="absolute top-14 left-[1.65rem] h-[calc(100%-1.5rem)] w-0.5 origin-top bg-field/25 group-last:hidden md:top-[1.65rem] md:left-14 md:h-0.5 md:w-[calc(100%-2rem)] md:origin-left" />
              <m.span
                aria-hidden="true"
                className="relative grid size-14 shrink-0 place-items-center rounded-full bg-field font-display text-2xl font-extrabold text-lime"
                initial={{ scale: 0.6 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ type: 'spring', stiffness: 320, damping: 16, delay: i * 0.12 }}
              >
                {i + 1}
              </m.span>
              <Reveal delay={i * 0.12}>
                <h3 className="font-display text-xl font-bold">
                  <span className="sr-only">Langkah {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-ink/75">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
