import { useState, type ReactNode } from 'react'
import { hitung } from '../lib/adsMath'
import { dec, rp } from '../lib/format'
import { CheckIcon, ExampleTag, H2, Section, Sticker, vars } from './ui'

export function Features() {
  return (
    <Section tone="canvas" size="lg" id="fitur" labelledby="fitur-judul">
      <H2 id="fitur-judul">Hasil yang kamu dapat</H2>
      <div className="mt-10 grid gap-14 sm:mt-14 sm:gap-20 lg:gap-28">
        <Row title="Untung bersih bulan ini, lengkap dengan hitungannya." body="Dihitung dari uang yang benar-benar cair, dikurangi modal dan semua biaya. Kalau datanya belum lengkap, aplikasi bilang apa yang kurang, jadi kamu tahu kapan angkanya sudah final.">
          <NotaMock />
        </Row>
        <Row reverse title="Iklan mana yang bikin rugi." body="Tiap produk dapat satu putusan: Hero, Aman, ROAS terlalu kecil, atau Takedown (matikan iklannya). ROAS-nya dihitung tanpa pesanan yang batal.">
          <AdsMock />
        </Row>
        <Row title="Harga jual minimum yang masih untung." body="Coba beberapa harga jual sebelum mulai jualan, lengkap dengan target ROAS yang perlu kamu isi di Shopee. Hasilnya perkiraan dari angka dan persen admin yang kamu isi.">
          <PriceMock />
        </Row>
      </div>
    </Section>
  )
}

function Row({
  title,
  body,
  reverse,
  children,
}: {
  title: string
  body: string
  reverse?: boolean
  children: ReactNode
}) {
  return (
    <article className="grid items-center gap-6 sm:gap-8 md:grid-cols-2 lg:gap-16">
      <div className={reverse ? 'md:order-2' : ''}>
        <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-[48ch] leading-relaxed text-fg-2 sm:mt-4 sm:text-lg">{body}</p>
      </div>
      <div className={reverse ? 'md:order-1' : ''}>{children}</div>
    </article>
  )
}

/* Satu lembar putih per mock, tanpa lembar di dalam lembar. */
const sheet = 'tone-light rounded-3xl bg-paper p-5 text-ink shadow-sheet ring-1 ring-line sm:p-7'

/** Nota yang "tercetak" baris demi baris. Angka saling cocok: 14,25 − 8,15 − 2,68 = 3,42 juta. */
function NotaMock() {
  const lines = [
    { l: 'Uang masuk', v: 14_250_000 },
    { l: 'Modal', v: -8_150_000 },
    { l: 'Biaya (admin, XTRA, iklan, packaging)', v: -2_680_000 },
  ]
  return (
    <div data-reveal className={sheet} style={vars({ '--step': '150ms' })}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">Agustus 2026</p>
        <ExampleTag />
      </div>
      <div className="mt-4 border-t-2 border-dashed border-ink/25" />
      <dl className="mt-2 grid">
        {lines.map((x, i) => (
          <div key={x.l} className="stage-item flex justify-between gap-4 py-2 tabular-nums" style={vars({ '--i': i })}>
            <dt className="text-ink/80">{x.l}</dt>
            <dd className="font-semibold whitespace-nowrap">{rp(x.v)}</dd>
          </div>
        ))}
        <div className="stage-item mt-1 flex items-center justify-between gap-4 border-t-2 border-ink pt-3" style={vars({ '--i': 3 })}>
          <dt className="font-display text-lg font-extrabold">Untung bersih</dt>
          <dd className="font-display text-2xl font-extrabold whitespace-nowrap text-gain tabular-nums">{rp(3_420_000)}</dd>
        </div>
      </dl>
      <div className="stage-item mt-4" style={vars({ '--i': 4 })}>
        <Sticker kind="aman">Angka final</Sticker>
      </div>
    </div>
  )
}

const ADS = [
  { name: 'Serum Vitamin C 30 ml', roas: 9.4, kind: 'hero', label: 'Hero' },
  { name: 'Lip Tint 01', roas: 5.8, kind: 'kecil', label: 'ROAS terlalu kecil' },
  { name: 'Toner Mist 100 ml', roas: 3.1, kind: 'takedown', label: 'Takedown' },
] as const

/** Stiker "tersetempel" berjeda 60 ms. */
function AdsMock() {
  return (
    <div data-reveal className={sheet}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">Iklan per produk</p>
        <ExampleTag />
      </div>
      <ul className="mt-3 divide-y divide-ink/15">
        {ADS.map((a, i) => (
          <li key={a.name} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4">
            <div>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-ink/70 tabular-nums">ROAS nyata {dec(a.roas, 1)}</p>
            </div>
            <Sticker kind={a.kind} index={i} rot={i % 2 ? 3 : -3}>
              {a.label}
            </Sticker>
          </li>
        ))}
      </ul>
    </div>
  )
}

const PRICES = [45_000, 52_000, 59_000]

/** Memakai rumus asli (hpp 30.000), jadi angka target ROAS-nya benar. */
function PriceMock() {
  const [picked, setPicked] = useState(1)
  return (
    <div className={sheet}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold">Pilih harga jual</p>
        <ExampleTag />
      </div>
      <p className="mt-1 text-sm text-ink/70">Modal Rp30.000 per unit. Target untung 5% setelah iklan.</p>
      <ul className="mt-3 divide-y divide-ink/15">
        {PRICES.map((harga, i) => {
          const r = hitung({ hpp: 30_000, harga, roas: 6 })
          const on = picked === i
          return (
            <li key={harga} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-display text-xl font-extrabold tabular-nums">{rp(harga)}</p>
                <p className="text-sm text-ink/70 tabular-nums">
                  {r.target ? `Isi target ROAS ${dec(r.target)} di Shopee` : 'Target ROAS tidak mungkin'}
                </p>
              </div>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setPicked(i)}
                className={`inline-flex min-h-11 min-w-24 items-center justify-center gap-1.5 rounded-full px-5 font-semibold transition-colors ${
                  on ? 'bg-ink text-paper' : 'border-2 border-ink text-accent'
                }`}
              >
                {on ? <CheckIcon className="size-4" /> : null}
                {on ? 'Dipakai' : 'Pakai'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
