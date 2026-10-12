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
            <li key={s.title} className="flex gap-4 md:flex-col">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-full bg-field font-display text-2xl font-extrabold text-lime"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">
                  <span className="sr-only">Langkah {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-ink/75">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
