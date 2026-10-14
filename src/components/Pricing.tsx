import { PRICE_MONTHLY, PRICE_YEARLY, REPLY_PROMISE, TRIAL_DAYS } from '../config'
import { rp } from '../lib/format'
import { CheckIcon, Cta, H2, Section } from './ui'

const INCLUDED = [
  'Satu akun untuk 1 toko Shopee. Punya lebih dari satu toko? Tanyakan ke admin.',
  'Pembaruan kalau format file Shopee berubah sudah termasuk.',
  'Data tokomu terpisah dari seller lain.',
]

export function Pricing() {
  const saving = PRICE_MONTHLY * 12 - PRICE_YEARLY
  return (
    <Section tone="tint" id="harga" labelledby="harga-judul">
      <H2 id="harga-judul">Harga dan uji coba gratis</H2>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
        <div>
          <p className="font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-accent sm:text-4xl">
            Uji coba gratis {TRIAL_DAYS} hari, tanpa kartu kredit
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-2">
            Akun dibuat manual oleh admin setelah kamu chat. {REPLY_PROMISE}.
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-2">
            Setelah {TRIAL_DAYS} hari, admin menonaktifkan akunmu sampai kamu berlangganan. Datamu tetap tersimpan, dan
            tidak ada tagihan otomatis.
          </p>
        </div>

        <div className="tone-light rounded-3xl bg-paper p-6 text-ink shadow-sheet ring-1 ring-line sm:p-8">
          <p className="font-semibold text-ink/70">Harga langganan</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
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
          <p className="mt-2 text-center text-sm text-ink/70">Pembayaran lewat chat admin. Tidak ada refund.</p>
          <p className="text-center text-sm">
            <a
              href="/syarat/"
              className="inline-flex min-h-11 items-center font-semibold text-accent underline decoration-2 underline-offset-4"
            >
              Baca Syarat Layanan
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
}
