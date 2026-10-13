import { PRICE_MONTHLY, PRICE_YEARLY, REPLY_PROMISE, TRIAL_DAYS } from '../config'
import { rp } from '../lib/format'
import { CheckIcon, Cta, H2, Section } from './ui'

const STEPS = [
  { t: 'Chat WhatsApp', d: 'Ceritakan tokomu dan tanya apa saja.' },
  { t: 'Akun dibuatkan', d: 'Admin membuat akunmu secara manual. Belum ada daftar mandiri.' },
  { t: 'Upload bulan pertama', d: 'Ikuti panduan di aplikasi, lalu baca hasilnya.' },
]

const INCLUDED = [
  `Coba gratis ${TRIAL_DAYS} hari, tanpa kartu kredit`,
  'Untuk 1 toko Shopee',
  'Update kalau format file Shopee berubah',
  'Data tiap toko terpisah',
]

export function Pricing() {
  const saving = PRICE_MONTHLY * 12 - PRICE_YEARLY
  return (
    <Section tone="deep" id="harga" labelledby="harga-judul">
      <H2 id="harga-judul">Harga dan cara mulai</H2>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <ol className="grid gap-6">
          {STEPS.map((s, i) => (
            <li key={s.t} data-reveal className="flex gap-4" style={{ transitionDelay: `${i * 100}ms` }}>
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-lime font-display text-xl font-extrabold text-field-deep"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">
                  <span className="sr-only">Langkah {i + 1}: </span>
                  {s.t}
                </h3>
                <p className="mt-1 text-on-field-muted">{s.d}</p>
              </div>
            </li>
          ))}
          <li className="text-on-field-muted">{REPLY_PROMISE}.</li>
        </ol>

        <div data-reveal className="on-paper rounded-3xl bg-paper p-6 text-ink shadow-[0_6px_0_0_#12145c] sm:p-8">
          <p className="font-semibold text-ink/70">Per toko</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold tracking-tight tabular-nums">{rp(PRICE_MONTHLY)}</span>
            <span className="text-ink/70">/ bulan</span>
          </p>
          <p className="mt-2 text-ink/80">
            Atau {rp(PRICE_YEARLY)} per tahun, hemat {rp(saving)} dibanding 12 bulan.
          </p>
          <ul className="mt-6 grid gap-2.5">
            {INCLUDED.map((x) => (
              <li key={x} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-gain" />
                {x}
              </li>
            ))}
          </ul>
          <Cta lokasi="harga" variant="blue" className="mt-8 w-full">
            Chat WhatsApp, tanya cara mulai
          </Cta>
        </div>
      </div>
    </Section>
  )
}
