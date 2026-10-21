import { useEffect, useState } from 'react'
import { HERO_SCREEN } from '../content'
import { dec } from '../lib/format'
import { useAnimatedNumber } from '../lib/hooks'
import { ScreenFrame } from './Screen'
import { ArrowDownIcon, Container, Cta, ExampleTag, Hy, InAppWaHelp, Sticker } from './ui'

/*
 * Konsep landing 2 "Dari omzet sampai untung" (DESIGN.md): halaman berjalan dari angka yang terlihat (omzet) ke angka
 * yang tersisa (untung bersih). Di judul, kata "omzet" dicoret sekali saat halaman terbuka, lalu frasa jawabannya
 * diberi sorotan. Coretan hanya garis dekoratif di luar teks, jadi pembaca layar membaca kalimat utuh.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="judul-utama" className="tone-light bg-canvas text-fg">
      <Container className="pt-10 pb-16 sm:pt-14 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="font-semibold text-accent">Aplikasi web untuk penjual Shopee</p>
            <h1
              id="judul-utama"
              className="mt-3 font-display text-[2.4rem] leading-[1.06] font-extrabold tracking-tight text-balance sm:text-[3.4rem] lg:text-[3.6rem]"
            >
              Jangan cuma lihat <span className="coret">omzet</span>. Cari tahu{' '}
              <span className="hl">untung bersih</span> toko Shopee<Hy />mu.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl">
              Unggah file export dari Seller Centre. HitungCuan merangkumnya jadi untung bersih per bulan dan per produk,
              memeriksa iklan mana yang rugi, dan membantu menyimulasikan harga jual sebelum kamu mengubahnya.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Cta lokasi="hero" />
              <a
                href="#cara-kerja"
                className="link-arrow min-h-11 self-center py-2.5 text-center font-semibold text-fg underline decoration-fg-2 decoration-2 underline-offset-4 hover:decoration-fg"
              >
                Lihat cara kerjanya <ArrowDownIcon className="arrow inline size-4 align-[-0.15em]" />
              </a>
            </div>
            <InAppWaHelp lokasi="hero" className="mt-4" />
            <div className="mt-6 grid max-w-xl gap-1 text-sm">
              <p className="font-semibold text-fg">File export dibaca di browser; file asli tidak diunggah ke server.</p>
              <p className="text-fg-2">Akses dibuat oleh pengelola lewat WhatsApp · Bukan produk resmi Shopee</p>
            </div>
          </div>

          {HERO_SCREEN.src ? <ScreenFrame slot={HERO_SCREEN} priority /> : <PreviewCard />}
        </div>
      </Container>
    </section>
  )
}

/*
 * Mockup netral selama screenshot asli belum ada (brief: "Preview aplikasi" dengan data yang jelas rekaan).
 * Susunannya mengikuti Bab 1 Rekap di aplikasi: satu kalimat, satu angka besar, status bulan, dan kotak
 * "Kenapa untungnya segini?". Bukan tiruan piksel antarmuka: tanpa menu, tombol, atau grafik.
 * Angkanya toko rekaan dan cocok dengan pita "dari setiap Rp100" di bagian Masalah:
 * omzet 20 jt − potongan 3,6 − modal 9,8 − iklan 2,6 − biaya lain 1,0 = untung 3,0 jt (15%).
 */
/** 2.4 → "Rp2,4 juta", 3 → "Rp3 juta" (desimal nol tidak ditulis di angka akhir). */
const jutaRingkas = (n: number) => `Rp${dec(n, 1).replace(/,0$/, '')} juta`

function PreviewCard() {
  const [go, setGo] = useState(false)
  useEffect(() => setGo(true), [])
  const shown = useAnimatedNumber(3, { duration: 700, delay: 250, mountFrom: 0, enabled: go })

  return (
    <figure
      aria-label="Preview aplikasi: contoh rekap bulanan dengan data rekaan"
      className={`hero-card tone-light relative mx-auto w-full max-w-md rounded-3xl bg-paper p-6 text-fg shadow-sheet ring-1 ring-line sm:p-8 ${go ? 'go' : ''}`}
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-fg-2">Preview aplikasi</span>
        <ExampleTag />
      </figcaption>

      <p className="mt-6 text-lg font-semibold">Toko contoh untung bersih</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="count-pending font-display text-[clamp(2.5rem,12vw,3.5rem)] leading-none font-extrabold tracking-tight text-gain tabular-nums">
          {jutaRingkas(shown)}
        </p>
        <Sticker kind="final" delay={950} rot={-3} className="gated">
          Angka final
        </Sticker>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-fg-2">Agustus 2026, dari omzet Rp20 juta.</p>

      <div className="mt-6 rounded-2xl bg-tint p-4 sm:p-5">
        <p className="font-semibold">Kenapa untungnya segini?</p>
        <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed text-fg-2">
          <li>Iklan memakan 13% dari omzet.</li>
          <li>2 produk rugi setelah potongan Shopee.</li>
        </ul>
      </div>
    </figure>
  )
}
