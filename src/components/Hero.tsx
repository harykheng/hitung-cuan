import { Fragment, useEffect, useRef, useState } from 'react'
import { burstConfetti } from '../lib/confetti'
import { juta } from '../lib/format'
import { useAnimatedNumber } from '../lib/hooks'
import { ArrowDownIcon, Container, Cta, ExampleTag, Sticker, vars } from './ui'

/** Kata naik satu-satu, jeda 55 ms, tiap kata 520 ms. Murni CSS, tidak menunggu JavaScript. */
function Words({ text, start = 0 }: { text: string; start?: number }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      <span className="word" style={vars({ '--i': start + i })}>
        {w}
      </span>{' '}
    </Fragment>
  ))
}

const HEADLINE_A = 'Berapa untung tokomu bulan ini?'
const HEADLINE_B = 'Jawabannya muncul setelah 3 file.'

export function Hero() {
  return (
    <header id="hero" className="bg-field text-on-field">
      <Container className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="font-semibold text-lime">Untuk seller Shopee yang pasang iklan</p>
            <h1 className="mt-3 font-display text-[2.6rem] leading-[1] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
              <Words text={HEADLINE_A} />
              <span className="block text-lime">
                <Words text={HEADLINE_B} start={HEADLINE_A.split(' ').length} />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-field-muted sm:text-xl">
              Upload export pesanan, laporan penghasilan, dan data iklan dari Seller Centre. Dapat untung bersih
              bulanan, iklan yang harus dimatikan, dan harga minimum yang aman. Bahasa Indonesia biasa, tanpa
              spreadsheet.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Cta lokasi="hero" />
              <a
                href="#simulator"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-1 font-semibold text-on-field underline decoration-lime decoration-2 underline-offset-4"
              >
                Coba hitung iklanmu dulu (30 detik)
                <ArrowDownIcon />
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-on-field">Coba gratis 30 hari. Tanpa kartu kredit.</p>
            <p className="mt-1 text-sm text-on-field-muted">Data pembeli tidak pernah dibaca · Bukan produk resmi Shopee</p>
          </div>

          <StoryCard />
        </div>
      </Container>
    </header>
  )
}

/* Angka contoh yang saling cocok: 14,25 jt masuk − 8,15 jt modal − 2,68 jt biaya = 3,42 jt untung. */
const CASES = {
  untung: { word: 'untung', value: 3.42 },
  rugi: { word: 'rugi', value: 1.18 },
} as const

const SEGMENTS = [
  { key: 'modal', pct: 57, label: 'Modal', cls: 'bg-on-field-muted', text: 'Rp57 dari tiap Rp100 untuk modal barang (HPP).' },
  { key: 'biaya', pct: 19, label: 'Biaya', cls: 'bg-[#8a8fe6]', text: 'Rp19 untuk potongan Shopee, iklan, dan packaging.' },
  { key: 'untung', pct: 24, label: 'Untung', cls: 'bg-lime', text: 'Rp24 sisa untung bersihmu.' },
] as const

/** Tiruan Rekap Bab 1. Semua angka rekaan dan berlabel Contoh. */
function StoryCard() {
  const [go, setGo] = useState(false)
  const [mode, setMode] = useState<keyof typeof CASES>('untung')
  const [toggled, setToggled] = useState(false)
  const [seg, setSeg] = useState<number | null>(null)
  const stampBox = useRef<HTMLSpanElement>(null)

  useEffect(() => setGo(true), [])

  // Confetti sekali, tepat saat stiker ANGKA FINAL muncul (900 ms setelah kartu mulai).
  useEffect(() => {
    if (!go) return
    const t = window.setTimeout(() => burstConfetti(stampBox.current), 900)
    return () => window.clearTimeout(t)
  }, [go])

  const c = CASES[mode]
  const shown = useAnimatedNumber(c.value, {
    duration: toggled ? 250 : 700,
    delay: 250,
    mountFrom: 0,
    enabled: go,
  })

  return (
    <figure
      aria-label="Contoh tampilan rekap bulanan"
      className={`hero-card relative mx-auto w-full max-w-md rounded-3xl bg-field-deep p-6 shadow-[0_6px_0_0_#12145c] sm:p-8 ${go ? 'go' : ''}`}
    >
      <figcaption className="flex items-center justify-between gap-3">
        <ExampleTag className="text-on-field-muted" />
        <span className="text-sm text-on-field-muted">Rekap bulanan</span>
      </figcaption>

      <p className="mt-6 text-lg font-semibold">Agustus 2026, toko kamu {c.word}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p
          className={`count-pending font-display text-[clamp(2.5rem,12vw,3.5rem)] leading-none font-extrabold tracking-tight tabular-nums ${
            mode === 'untung' ? 'text-lime' : 'text-coral'
          }`}
        >
          {juta(shown)}
        </p>
        <span ref={stampBox} className="relative inline-block">
          <Sticker kind="final" delay={900} className="gated">
            Angka final
          </Sticker>
        </span>
      </div>

      <div className="mt-7">
        {mode === 'untung' ? (
          <>
            <p className="text-sm text-on-field-muted">Dari setiap Rp100 yang masuk</p>
            <div className="mt-2 flex h-12 overflow-hidden rounded-xl" role="group" aria-label="Pembagian tiap Rp100">
              {SEGMENTS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  style={{ width: `${s.pct}%` }}
                  className="relative min-h-11 overflow-hidden font-display font-extrabold text-ink"
                  onMouseEnter={() => setSeg(i)}
                  onFocus={() => setSeg(i)}
                  onClick={() => setSeg(i)}
                  aria-label={`${s.label}: ${s.text}`}
                >
                  <span
                    className={`grow gated absolute inset-0 ${s.cls}`}
                    style={vars({ '--delay': `${300 + i * 140}ms` })}
                  />
                  <span className="relative">{s.pct}</span>
                </button>
              ))}
            </div>
            <ul className="mt-2 flex gap-4 text-sm text-on-field-muted" aria-hidden="true">
              {SEGMENTS.map((s) => (
                <li key={s.key} className="flex items-center gap-1.5">
                  <span className={`size-2.5 rounded-full ${s.cls}`} />
                  {s.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 min-h-11 text-sm text-on-field" aria-live="polite">
              {seg === null ? 'Sentuh bagian batang untuk membaca artinya.' : SEGMENTS[seg].text}
            </p>
          </>
        ) : (
          <p className="rounded-xl border-2 border-dashed border-coral/60 p-4 text-on-field">
            Bulan ini rugi, jadi bagiannya tidak lagi berjumlah 100.
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-sm text-on-field-muted">Lihat contoh:</span>
        <div className="flex rounded-full bg-on-field/10 p-1" role="group" aria-label="Contoh bulan untung atau rugi">
          {(['untung', 'rugi'] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={mode === k}
              onClick={() => {
                setToggled(true)
                setMode(k)
                setSeg(null)
              }}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                mode === k ? 'bg-lime text-field-deep' : 'text-on-field'
              }`}
            >
              Bulan {k}
            </button>
          ))}
        </div>
      </div>
    </figure>
  )
}
