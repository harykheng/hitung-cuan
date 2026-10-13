import { PRICE_MONTHLY, PRICE_YEARLY, REPLY_PROMISE, TRIAL_DAYS } from '../config'
import { rp } from '../lib/format'
import { CheckIcon, Cta, H2, Section } from './ui'

const INCLUDED = [
  'Untuk 1 toko Shopee. Punya lebih dari satu toko? Tanyakan ke admin.',
  'Pembaruan kalau format file Shopee berubah sudah termasuk.',
  'Data tiap toko terpisah.',
]

/*
 * TODO (isi sebelum tayang): satu kalimat tentang akhir uji coba, mis. apakah ditagih atau akun
 * diminta diperpanjang lewat admin. Sengaja tidak ditulis di sini karena belum ada keputusannya.
 */
export function Pricing() {
  const saving = PRICE_MONTHLY * 12 - PRICE_YEARLY
  return (
    <Section tone="tint" id="harga" labelledby="harga-judul">
      <H2 id="harga-judul">Harga dan uji coba gratis</H2>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div data-reveal>
          <p className="font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-accent sm:text-4xl">
            Uji coba gratis {TRIAL_DAYS} hari, tanpa kartu kredit
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-2">
            Akun dibuat manual oleh admin setelah kamu chat. {REPLY_PROMISE}.
          </p>
        </div>

        <div data-reveal className="tone-light rounded-3xl bg-paper p-6 text-ink shadow-[0_16px_40px_-20px_rgba(29,32,121,0.45)] ring-1 ring-line sm:p-8">
          <p className="font-semibold text-ink/70">Harga langganan</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold tracking-tight tabular-nums">{rp(PRICE_MONTHLY)}</span>
            <span className="text-ink/70">per toko per bulan</span>
          </p>
          <p className="mt-2 text-ink/80">
            Atau {rp(PRICE_YEARLY)} per toko per tahun. Hemat {rp(saving)} dibanding membayar bulanan selama 12 bulan.
          </p>
          <ul className="mt-6 grid gap-2.5">
            {INCLUDED.map((x) => (
              <li key={x} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-gain" />
                {x}
              </li>
            ))}
          </ul>
          <Cta lokasi="harga" className="mt-8 w-full" />
          <p className="mt-3 text-center text-sm text-ink/70">
            Akun dibuat manual oleh admin. {REPLY_PROMISE}.
          </p>
        </div>
      </div>
    </Section>
  )
}
