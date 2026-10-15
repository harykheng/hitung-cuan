import { useEffect, useState } from 'react'
import { juta } from '../lib/format'
import { useAnimatedNumber } from '../lib/hooks'
import { ArrowDownIcon, Container, Cta, ExampleTag, InAppWaHelp, Sticker } from './ui'

/*
 * Judul memakai kata yang dipakai seller sendiri (cuan, boncos). Pertanyaannya sengaja tentang toko, bukan hanya iklan,
 * supaya kartu contoh di sebelahnya (untung bersih dan iklan yang bikin rugi) langsung menjawabnya. Sub-judul menyebut
 * apa produknya dan apa yang perlu disiapkan, karena judul saja tidak menjelaskan bahwa ini aplikasi.
 * Judul tidak dianimasikan: kata yang naik satu per satu adalah pola templat dan menunda bacaan pertama.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="judul-utama" className="tone-light bg-canvas text-fg">
      <Container className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="font-semibold tracking-wide text-accent">Aplikasi untuk seller Shopee yang beriklan</p>
            <h1 id="judul-utama" className="mt-3 font-display text-[2.6rem] leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-[3.6rem]">
              Tokomu sebenarnya{' '}
              <span className="block">
                <span className="hl">cuan atau boncos?</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl">
              Upload 3 laporan dari Seller Centre. HitungCuan menghitung untung bersih tokomu bulan itu dan menunjukkan
              iklan mana yang bikin rugi.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Cta lokasi="hero" />
              <a
                href="#simulator"
                className="min-h-11 self-center py-2.5 text-center font-semibold text-fg underline decoration-fg-2 decoration-2 underline-offset-4 hover:decoration-fg"
              >
                Atau cek 1 iklanmu dulu, tanpa chat <ArrowDownIcon className="inline size-4 align-[-0.15em]" />
              </a>
            </div>
            <InAppWaHelp lokasi="hero" className="mt-4" />
            <div className="mt-5 grid max-w-xl gap-1">
              <p className="text-sm font-semibold text-fg">Lewat chat WhatsApp · Tanpa kartu kredit</p>
              <p className="text-sm text-fg-2">
                Nama, alamat, dan nomor HP pembeli tidak disimpan · Bukan produk resmi Shopee
              </p>
            </div>
          </div>

          <StoryCard />
        </div>
      </Container>
    </section>
  )
}

/*
 * Tiruan rekap bulanan di aplikasi. Semua angka rekaan dan berlabel Contoh, dan saling cocok dengan nota di bagian Hasil:
 * 14,25 jt masuk − 8,15 jt modal − 2,68 jt biaya = 3,42 jt untung.
 * Kartu ini menjawab dua hal yang dijanjikan judul dan sub-judul (untung bersih, iklan yang bikin rugi), tanpa tombol
 * atau batang interaktif: di layar pertama satu-satunya hal yang perlu ditekan adalah tombol WhatsApp.
 */
function StoryCard() {
  const [go, setGo] = useState(false)
  useEffect(() => setGo(true), [])
  const shown = useAnimatedNumber(3.42, { duration: 700, delay: 250, mountFrom: 0, enabled: go })

  return (
    <figure
      aria-label="Contoh tampilan rekap bulanan"
      className={`hero-card tone-light relative mx-auto w-full max-w-md rounded-3xl bg-paper p-6 text-fg shadow-sheet ring-1 ring-line sm:p-8 ${go ? 'go' : ''}`}
    >
      <figcaption className="flex items-center justify-between gap-3">
        <ExampleTag />
        <span className="text-sm text-fg-3">Rekap Agustus 2026</span>
      </figcaption>

      <p className="mt-6 text-lg font-semibold">Toko kamu untung bersih</p>
      <p className="count-pending mt-1 font-display text-[clamp(2.5rem,12vw,3.5rem)] leading-none font-extrabold tracking-tight text-gain tabular-nums">
        {juta(shown)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-fg-2">
        Uang masuk Rp14,25 juta, dikurangi modal Rp8,15 juta dan biaya Rp2,68 juta.
      </p>

      <ul className="mt-6 grid divide-y divide-line border-t border-line">
        <li className="flex items-center justify-between gap-3 py-3.5">
          <span className="font-semibold">4 iklan bikin rugi</span>
          <Sticker kind="takedown" delay={950} rot={3} className="gated">
            Takedown
          </Sticker>
        </li>
        <li className="flex items-center justify-between gap-3 pt-3.5">
          <span className="font-semibold">1 produk dengan iklan terbaik</span>
          <Sticker kind="hero" delay={1050} rot={-3} className="gated">
            Hero
          </Sticker>
        </li>
      </ul>
    </figure>
  )
}
