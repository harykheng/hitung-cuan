import { Container, SectionHeading } from './ui'

const POINTS = [
  'Nama, alamat, dan no. HP pembeli tidak pernah dibaca maupun disimpan.',
  'Data tiap toko terpisah dan hanya bisa dilihat akun toko itu.',
]

export function Privacy() {
  return (
    <section aria-labelledby="privasi" className="dark-surface bg-field-deep py-16 text-paper sm:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading id="privasi">Privasi</SectionHeading>
        <ul className="grid gap-4">
          {POINTS.map((p) => (
            <li key={p} className="flex gap-4 rounded-2xl bg-paper/8 p-5 ring-1 ring-paper/15">
              <ShieldIcon />
              <span className="text-lg leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-7 shrink-0 text-lime" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6L12 3Z" strokeLinejoin="round" />
      <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
