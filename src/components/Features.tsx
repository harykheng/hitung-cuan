import { m } from 'framer-motion'
import { Reveal } from './motion'
import { Screenshot } from './Screenshot'
import { Container, SectionHeading } from './ui'

type Tone = 'gain' | 'loss' | 'neutral' | 'field'

const TONE: Record<Tone, string> = {
  gain: 'bg-gain text-paper',
  loss: 'bg-loss text-paper',
  field: 'bg-field text-paper',
  neutral: 'bg-paper text-ink ring-1 ring-ink/20',
}

const FEATURES: {
  screen: string
  title: string
  body?: string
  alt: string
  tags?: { label: string; tone: Tone }[]
}[] = [
  {
    screen: 'rekap',
    title: 'Rekap bulanan',
    body: 'Untung bersih per bulan, plus statusnya:',
    alt: 'Tampilan rekap bulanan HitungCuan berisi untung bersih dan status angka',
    tags: [
      { label: 'Angka final', tone: 'gain' },
      { label: 'Belum lengkap', tone: 'neutral' },
    ],
  },
  {
    screen: 'iklan',
    title: 'Putusan iklan per produk',
    alt: 'Tampilan putusan iklan per produk di HitungCuan',
    tags: [
      { label: 'Hero', tone: 'field' },
      { label: 'Aman', tone: 'gain' },
      { label: 'ROAS terlalu kecil', tone: 'neutral' },
      { label: 'Takedown', tone: 'loss' },
    ],
  },
  {
    screen: 'simulasi',
    title: 'Simulasi harga',
    body: 'Harga minimum dan apakah iklan bisa balik modal.',
    alt: 'Tampilan simulasi harga minimum di HitungCuan',
  },
]

export function Features() {
  return (
    <section aria-labelledby="yang-kamu-dapat" className="bg-counter py-16 sm:py-24">
      <Container>
        <SectionHeading id="yang-kamu-dapat">Yang kamu dapat</SectionHeading>
        <div className="mt-12 grid gap-16 lg:gap-24">
          {FEATURES.map((f, i) => (
            <article
              key={f.screen}
              className={`grid items-center gap-6 lg:gap-14 ${i % 2 === 1 ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-[0.8fr_1.2fr]'}`}
            >
              <Reveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl">{f.title}</h3>
                {f.body ? <p className="mt-2 text-lg leading-relaxed text-ink/75">{f.body}</p> : null}
                {f.tags ? (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Status di ${f.title}`}>
                    {f.tags.map((t, ti) => (
                      <m.li
                        key={t.label}
                        className={`rounded-full px-3 py-1 text-sm font-bold ${TONE[t.tone]}`}
                        initial={{ scale: 0.7 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.25 + ti * 0.08 }}
                      >
                        {t.label}
                      </m.li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
              <Reveal delay={0.12} y={28}>
                <Screenshot name={f.screen} alt={f.alt} />
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
