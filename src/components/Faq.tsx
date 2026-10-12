import type { ReactNode } from 'react'
import { buildMultiStoreMessage, waLink } from '../lib/whatsapp'
import { Container, SectionHeading } from './ui'

export function Faq({ source }: { source: string }) {
  const items: { q: string; a: ReactNode }[] = [
    { q: 'Perlu install?', a: 'Tidak, buka lewat browser.' },
    { q: 'Bisa di HP?', a: 'Bisa untuk lihat hasil. Upload file paling nyaman di laptop.' },
    {
      q: 'Berlaku untuk berapa toko?',
      a: (
        <>
          Satu langganan untuk 1 toko Shopee. Punya lebih dari satu toko?{' '}
          <a
            href={waLink(buildMultiStoreMessage(source))}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-field underline decoration-2 underline-offset-4"
          >
            Chat kami lewat WhatsApp
          </a>
          .
        </>
      ),
    },
    { q: 'Kalau Shopee ganti format file?', a: 'Kami update, sudah termasuk harga.' },
    {
      q: 'Datanya aman?',
      a: 'Nama, alamat, dan no. HP pembeli tidak pernah dibaca maupun disimpan. Data tiap toko terpisah dan hanya bisa dilihat akun toko itu.',
    },
  ]

  return (
    <section aria-labelledby="faq" className="bg-counter py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading id="faq">Pertanyaan yang sering muncul</SectionHeading>
        <div className="mt-8 grid gap-3">
          {items.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-paper ring-1 ring-ink/10 open:ring-2 open:ring-field">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-counter text-xl leading-none transition group-open:rotate-45 group-open:bg-lime"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-ink/80">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
