import { Reveal } from './motion'
import { Container, SectionHeading } from './ui'

const PROBLEMS = [
  {
    title: 'ROAS di Shopee masih menghitung pesanan batal.',
    body: 'Iklan yang kelihatan untung bisa ternyata rugi.',
  },
  {
    title: 'Omzet bukan uang cair.',
    body: 'Untung dihitung dari uang yang benar-benar masuk ke saldo.',
  },
  {
    title: 'Potongan admin & XTRA makan margin diam-diam.',
    body: 'Harga jual terasa aman padahal tipis.',
  },
]

export function Problems() {
  return (
    <section aria-labelledby="masalah" className="bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading id="masalah">Masalahnya</SectionHeading>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.1} className="flex flex-col rounded-2xl bg-counter p-6">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-lg bg-loss font-display text-lg font-extrabold text-paper"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/75">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
