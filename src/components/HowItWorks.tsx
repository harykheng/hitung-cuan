import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { burstConfetti } from '../lib/confetti'
import { juta } from '../lib/format'
import { prefersReducedMotion, useAnimatedNumber, useInViewOnce } from '../lib/hooks'
import { CheckIcon, ExampleTag, FileIcon, H2, ReplayIcon, Section, Sticker, vars } from './ui'

const STEPS = [
  { t: 'Chat admin lewat WhatsApp', d: 'Minta uji coba gratis 30 hari. Admin membalas maksimal 1×24 jam.' },
  { t: 'Akun dibuatkan admin', d: 'Pendaftaran belum mandiri, jadi akun tokomu dibuat manual.' },
  { t: 'Unduh 3 laporan dari Seller Centre', d: 'Pesanan (.xlsx), penghasilan (.pdf), dan iklan (.csv).' },
  { t: 'Upload, lalu baca hasilnya', d: 'Untung atau rugi bulan itu, iklan yang sebaiknya dimatikan, dan harga yang aman.' },
]

/*
 * Jalur menu per file, dari pemilik toko (dicek di Seller Centre, 14 Okt 2026).
 * Format file dan syarat tiap file iklan dicocokkan dengan PANDUAN.md dan parser aplikasi (src/lib/shopeeColumns.ts).
 * Kalau Shopee mengubah menunya, ubah di sini.
 */
const FILES = [
  { name: 'pesanan.xlsx', path: 'Pesanan Saya → Semua → Export → pilih rentang tanggal' },
  { name: 'penghasilan.pdf', path: 'Penghasilan Saya → Catatan transaksi penghasilan → pilih rentang tanggal bulanan' },
  { name: 'iklan.csv', path: 'Iklan → Download data → pilih periode 1 bulan penuh. Unduh Data Keseluruhan Iklan (wajib). Kalau kamu memakai iklan produk otomatis, unduh juga Rincian data iklan produk otomatis. Kalau memakai grup iklan, unduh juga Semua data grup iklan' },
]

const FINAL = 5

/* Jadwal tahap: 1 file masuk, 2 diunggah, 3 privasi, 4 jawaban, 5 baris hasil. */
const SCHEDULE: [number, number][] = [
  [0, 1],
  [900, 2],
  [1700, 3],
  [2200, 4],
  [3500, 5],
]

export function HowItWorks() {
  return (
    <Section tone="paper" id="cara-kerja" labelledby="cara-kerja-judul">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <H2 id="cara-kerja-judul">Dari chat sampai hasil pertama</H2>
          <ol className="mt-8 grid gap-6">
            {STEPS.map((s, i) => (
              <li key={s.t} data-reveal className="flex gap-4" style={vars({ transitionDelay: `${i * 100}ms` })}>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-field font-display text-xl font-extrabold text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">
                    <span className="sr-only">Langkah {i + 1}: </span>
                    {s.t}
                  </h3>
                  <p className="mt-1 max-w-[46ch] text-fg-2">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-4 border-accent pl-4 text-fg-2">
            Upload paling nyaman lewat laptop. Hasilnya bisa dilihat dari HP.
          </p>
        </div>

        <FlowDemo />
      </div>
    </Section>
  )
}

/** Animasi berskrip (bukan upload sungguhan). Mulai sekali saat 40% terlihat; bisa diputar ulang. */
function FlowDemo() {
  const [boxRef, seen] = useInViewOnce<HTMLDivElement>(0.4)
  const [stage, setStage] = useState(FINAL)
  const [animated, setAnimated] = useState(false)
  const [run, setRun] = useState(0)
  const [openFile, setOpenFile] = useState<number | null>(null)
  const timers = useRef<number[]>([])

  // Sebelum paint di klien: kalau gerakan boleh, kosongkan panggung dan tunggu bagian terlihat.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    setAnimated(true)
    setStage(0)
  }, [])

  useEffect(() => {
    if (!animated || !seen) return
    timers.current.forEach(clearTimeout)
    timers.current = SCHEDULE.map(([ms, s]) => window.setTimeout(() => setStage(s), ms + (run > 0 ? 60 : 0)))
    return () => timers.current.forEach(clearTimeout)
  }, [animated, seen, run])

  const replay = () => {
    setOpenFile(null)
    setStage(0)
    setRun((r) => r + 1)
  }

  const entered = stage >= 1
  const uploading = stage >= 2
  const privacy = stage >= 3
  const answered = stage >= 4
  const rows = stage >= 5

  return (
    <div ref={boxRef} className="tone-dark rounded-3xl bg-field-deep p-5 text-fg shadow-[0_16px_40px_-20px_rgba(29,32,121,0.7)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <ExampleTag className="text-on-field-muted" />
        {animated ? (
          <button
            type="button"
            onClick={replay}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-on-field-muted hover:text-on-field"
          >
            <ReplayIcon className="size-4" />
            Putar ulang
          </button>
        ) : null}
      </div>

      {/* Tahap 1-2: tiga file */}
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tiga file dari Seller Centre">
        {FILES.map((f, i) => (
          <li
            key={f.name}
            style={vars({ transitionDelay: uploading ? '0ms' : `${i * 120}ms` })}
            className={`transition-[opacity,transform] duration-300 ease-out ${
              !entered ? '-translate-x-6 opacity-0' : uploading ? 'translate-y-4' : ''
            }`}
          >
            <button
              type="button"
              aria-expanded={openFile === i}
              onClick={() => setOpenFile(openFile === i ? null : i)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg border-2 px-3 text-sm font-semibold ${
                openFile === i ? 'border-lime bg-lime text-field-deep' : 'border-on-field-muted/50 text-on-field'
              }`}
            >
              <FileIcon className="size-4" />
              {f.name}
            </button>
          </li>
        ))}
      </ul>
      {openFile !== null ? (
        <div className="mt-3 rounded-xl border-2 border-dashed border-lime/70 p-4" role="region" aria-label="Di mana dapatnya?">
          <p className="text-sm font-semibold text-lime">Di mana dapatnya?</p>
          <p className="mt-1">
            <span className="font-semibold">{FILES[openFile].name}</span>: Seller Centre → {FILES[openFile].path}
          </p>
        </div>
      ) : null}

      {/* Tahap 2-3: kotak upload */}
      <div className="mt-5 rounded-xl border-2 border-on-field-muted/40 p-4">
        <p className="font-semibold">
          Upload ke toko: <span className="text-lime">Toko Contoh</span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-on-field/15" aria-hidden="true">
          <div
            className="h-full origin-left rounded-full bg-lime transition-transform ease-linear"
            style={{ transform: uploading ? 'scaleX(1)' : 'scaleX(0)', transitionDuration: '600ms' }}
          />
        </div>
        <p
          className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-mint transition-opacity duration-300 ${
            privacy ? 'opacity-100' : 'opacity-0'
          } ${stage === 3 ? 'flash-mint' : ''}`}
        >
          <CheckIcon className="size-4" />
          Data pembeli diabaikan
        </p>
      </div>

      {/* Tahap 4-5: jawaban */}
      <div className="mt-6 min-h-[11rem]">
        {answered ? <Answer key={run} showRows={rows} /> : null}
      </div>
    </div>
  )
}

function Answer({ showRows }: { showRows: boolean }) {
  const box = useRef<HTMLSpanElement>(null)
  const value = useAnimatedNumber(3.42, { duration: 700, mountFrom: 0 })

  useEffect(() => {
    const t = window.setTimeout(() => burstConfetti(box.current), 700)
    return () => window.clearTimeout(t)
  }, [])

  const words = ['Agustus', '2026,', 'Toko', 'Contoh', 'untung']
  return (
    <div>
      <p className="font-display text-2xl leading-tight font-extrabold sm:text-3xl" aria-label="Agustus 2026, Toko Contoh untung Rp3,42 juta.">
        <span aria-hidden="true">
          {words.map((w, i) => (
            <Fragment key={w}>
              <span className="word" style={vars({ '--i': i })}>
                {w}
              </span>{' '}
            </Fragment>
          ))}
          <span className="word text-lime" style={vars({ '--i': words.length })}>
            {juta(value)}.
          </span>
        </span>
      </p>
      <span ref={box} className="relative mt-3 inline-block">
        <Sticker kind="final" delay={700}>
          Angka final
        </Sticker>
      </span>

      <ul className={`mt-5 grid gap-3 transition-opacity duration-300 ${showRows ? 'opacity-100' : 'opacity-0'}`}>
        <li className="flex flex-wrap items-center gap-3">
          <span className="font-semibold">4 iklan sebaiknya dimatikan</span>
          {showRows ? <Sticker kind="takedown" delay={0} rot={3}>Takedown</Sticker> : null}
        </li>
        <li className="flex flex-wrap items-center gap-3">
          <span className="font-semibold">1 produk Hero</span>
          {showRows ? <Sticker kind="hero" delay={60} rot={-3} className="ring-2 ring-lime">Hero</Sticker> : null}
        </li>
      </ul>
    </div>
  )
}
