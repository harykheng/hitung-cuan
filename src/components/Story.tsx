import { useEffect, useRef, useState } from 'react'
import { juta, rp } from '../lib/format'
import { ExampleTag, H2, Sticker } from './ui'

/*
 * PROTOTIPE (16 Okt 2026, belum diputuskan pemilik): satu bagian cerita yang tertahan saat digulir.
 * Layar menempel, dan sambil pengunjung menggulir, rekap satu bulan dihitung di depan matanya: uang masuk, dipotong modal,
 * dipotong biaya, iklan yang bikin rugi tersetempel, lalu untung bersih. Angkanya ikut bergerak maju-mundur bersama gulir.
 * Gerak tetap menandai status yang berubah (DESIGN.md), tetapi ini koreografi gulir yang dilarang Dial MOTION 2 [diinferensi].
 * Kalau prototipe ditolak, hapus berkas ini, <Story /> di App.tsx, dan blok "Cerita gulir" di index.css.
 *
 * Tanpa pustaka animasi: position sticky + satu listener scroll pasif yang digabung per frame.
 * Mode statis (semua langkah tampil, kartu di keadaan akhir) dipakai tanpa JavaScript, dengan reduced motion, dan di layar
 * yang tingginya di bawah 600px (kartu dan teks tidak muat di satu layar). Aturannya ada di CSS (media query yang sama
 * dengan LIVE_QUERY), jadi HTML prerender sudah benar sebelum hidrasi.
 *
 * Angka rekaan, sama dengan kartu hero dan nota di bagian Hasil: 14,25 − 8,15 − 2,68 = 3,42 juta.
 */
const LIVE_QUERY = '(prefers-reduced-motion: no-preference) and (min-height: 600px)'

const STEPS = [
  {
    tag: 'Uang masuk',
    title: 'Bulan ini uang masuk Rp14,25 juta.',
    body: 'Kelihatannya cuan banyak. Padahal belum ada yang dipotong.',
  },
  {
    tag: 'Modal',
    title: 'Potong modal barang yang terjual.',
    body: 'Rp8,15 juta balik jadi modal. Sisanya Rp6,10 juta.',
  },
  {
    tag: 'Biaya',
    title: 'Potong admin, XTRA, iklan, dan packaging.',
    body: 'Kecil per order, tapi sebulan jadi Rp2,68 juta. Sisanya Rp3,42 juta.',
  },
  {
    tag: 'Iklan',
    title: '4 iklan ternyata bikin rugi.',
    body: 'ROAS-nya kelihatan oke di dashboard, tapi tiap order malah boncos. Putusannya: Takedown.',
  },
  {
    tag: 'Hasil',
    title: 'Untung bersih Rp3,42 juta. Angka final.',
    body: 'Semua dari 3 laporan Seller Centre yang kamu upload. Tanpa rekap spreadsheet.',
  },
] as const

const LAST = STEPS.length - 1

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const ease = (t: number) => t * t * (3 - 2 * t)
/** 0 sebelum `a`, 1 setelah `b`, halus di antaranya. */
const span = (p: number, a: number, b: number) => ease(clamp01((p - a) / (b - a)))

/** Sisa uang (juta) pada progres gulir p. Tiap potongan berjalan di awal langkahnya sendiri, dan ikut mundur saat digulir balik. */
const remaining = (p: number) => 14.25 - 8.15 * span(p, 0.2, 0.34) - 2.68 * span(p, 0.4, 0.54)

export function Story() {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const number = useRef<HTMLSpanElement>(null)
  // Render pertama (prerender dan mode statis) = keadaan akhir.
  const [step, setStep] = useState<number>(LAST)

  useEffect(() => {
    const t = track.current
    const s = stage.current
    if (!t || !s) return
    const mq = window.matchMedia(LIVE_QUERY)
    let raf = 0
    let last = -1

    const update = () => {
      raf = 0
      const live = mq.matches && document.documentElement.classList.contains('js')
      const p = live ? clamp01(-t.getBoundingClientRect().top / Math.max(1, t.offsetHeight - s.offsetHeight)) : 1
      t.style.setProperty('--p', p.toFixed(4))
      if (number.current) number.current.textContent = juta(remaining(p))
      const next = Math.min(LAST, Math.floor(p * STEPS.length))
      if (next !== last) {
        last = next
        setStep(next)
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    mq.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', schedule)
    }
  }, [])

  const on = (from: number) => (step >= from ? 'is-on' : '')

  return (
    <section id="cerita" aria-labelledby="cerita-judul" className="story tone-light bg-canvas text-fg">
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
        <H2 id="cerita-judul">
          Uang masuk banyak <span className="hl">belum tentu cuan.</span>
        </H2>
        <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-fg-2">
          Contoh satu bulan, dihitung langkah demi langkah seperti di aplikasi.
        </p>
      </div>

      <div ref={track} className="story-track">
        <div ref={stage} className="story-stage">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Ladder step={step} />
              <ol className="story-steps sm:mt-6 lg:mt-10">
                {STEPS.map((x, i) => (
                  <li key={x.tag} className={i === step ? 'is-active' : ''}>
                    <p className="text-sm font-semibold tracking-wide text-accent">
                      {String(i + 1).padStart(2, '0')} · {x.tag}
                    </p>
                    <h3 className="mt-1 font-display text-xl leading-tight font-extrabold tracking-tight text-balance sm:mt-1.5 sm:text-3xl lg:text-4xl">
                      {x.title}
                    </h3>
                    <p className="mt-1.5 max-w-[44ch] text-sm leading-relaxed text-fg-2 sm:mt-2 sm:text-lg">{x.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <figure
              aria-label="Contoh rekap bulanan yang dihitung langkah demi langkah"
              className="story-card tone-light mx-auto w-full max-w-md rounded-3xl bg-paper p-4 text-ink shadow-sheet ring-1 ring-line sm:p-7 lg:max-w-lg"
            >
              <figcaption className="flex items-center justify-between gap-3">
                <ExampleTag />
                <span className="text-sm text-fg-3">Rekap Agustus 2026</span>
              </figcaption>

              <div className="mt-3 flex min-h-8 items-center justify-between gap-3 sm:mt-5">
                <p className="font-semibold">{step === LAST ? 'Untung bersih' : step === 0 ? 'Uang masuk' : 'Sisa uang'}</p>
                <span className={`story-row ${on(LAST)}`}>
                  <Sticker kind="final" rot={-3}>
                    Angka final
                  </Sticker>
                </span>
              </div>
              <p
                className={`mt-1 font-display text-[clamp(2rem,9vw,3.25rem)] lg:text-6xl leading-none font-extrabold tracking-tight tabular-nums transition-colors duration-300 ${
                  step === LAST ? 'text-gain' : 'text-ink'
                }`}
              >
                <span ref={number} aria-hidden="true">
                  {juta(3.42)}
                </span>
                <span className="sr-only">Untung bersih Rp3,42 juta</span>
              </p>

              <dl className="mt-3 grid border-t-2 border-dashed border-ink/25 pt-1.5 text-sm sm:mt-5 sm:pt-2 sm:text-base">
                <Line label="Uang masuk" value={14_250_000} className="is-on" />
                <Line label="Modal" value={-8_150_000} className={on(1)} />
                <Line label="Biaya" detail=" (admin, XTRA, iklan, packaging)" value={-2_680_000} className={on(2)} />
              </dl>

              <ul className="mt-1.5 grid divide-y divide-line border-t border-line text-sm sm:mt-2 sm:text-base">
                <li className={`story-row flex items-center justify-between gap-3 py-2 sm:py-2.5 ${on(3)}`}>
                  <span className="font-semibold">4 iklan bikin rugi</span>
                  <Sticker kind="takedown" rot={3}>
                    Takedown
                  </Sticker>
                </li>
                <li className={`story-row flex items-center justify-between gap-3 py-2 sm:py-2.5 ${on(3)}`}>
                  <span className="font-semibold">1 produk dengan iklan terbaik</span>
                  <Sticker kind="hero" rot={-3} index={2}>
                    Hero
                  </Sticker>
                </li>
              </ul>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

/** `detail` hanya tampil dari 640px, supaya tiap baris tetap satu baris di HP. */
function Line({ label, detail, value, className }: { label: string; detail?: string; value: number; className: string }) {
  return (
    <div className={`story-row flex justify-between gap-4 py-1 tabular-nums sm:py-1.5 ${className}`}>
      <dt className="text-ink/80">
        {label}
        {detail ? <span className="hidden sm:inline">{detail}</span> : null}
      </dt>
      <dd className="story-value font-semibold whitespace-nowrap">{rp(value)}</dd>
    </div>
  )
}

/**
 * Tangga lima langkah. Garisnya terisi mengikuti gulir (--p). Hanya tampilan: isinya sama dengan daftar langkah.
 * Disembunyikan di bawah 640px (lihat index.css): di HP panggungnya tidak muat, dan label "01 · Uang masuk" sudah cukup.
 */
function Ladder({ step }: { step: number }) {
  return (
    <div aria-hidden="true" className="story-ladder relative">
      <div className="absolute inset-x-3 top-3 h-0.5 bg-line">
        <div className="story-ladder-fill h-full origin-left bg-ink" />
      </div>
      <ol className="relative flex justify-between">
        {STEPS.map((x, i) => (
          <li key={x.tag} className="flex flex-col items-center gap-1.5">
            <span
              className={`grid size-6 place-items-center rounded-full border-2 text-[0.65rem] font-bold tabular-nums transition-colors duration-200 ${
                i <= step ? 'border-ink bg-ink text-paper' : 'border-control bg-canvas text-fg-3'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={`text-xs font-semibold ${i === step ? 'text-fg' : 'text-fg-3'}`}>{x.tag}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
