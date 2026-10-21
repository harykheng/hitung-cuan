import type { ReactNode } from 'react'
import { CheckIcon, Cta, H2, Section, Sticker } from './ui'

/** Syarat status "Angka final" di aplikasi (shopee-profit-calc, src/lib/monthStatus.ts). */
const FINAL_CHECKS = [
  'Laporan penghasilan bulan itu sudah diunggah',
  'Uang yang cair cocok dengan pesanannya',
  'Semua barang yang terjual punya HPP',
  'Biaya bulan itu sudah disimpan, walau Rp0',
]

/*
 * Tiga manfaat (brief), sengaja tidak sama besar: "untung bulan ini" adalah jawaban utama aplikasi, jadi kartunya
 * memanjang dua baris di desktop. Isi kartu memakai label yang benar-benar ada di aplikasi (Angka final, Belum lengkap,
 * RUGI, TIPIS, Takedown, Hero), bukan tiruan layar.
 */
export function Benefits() {
  return (
    <Section tone="tint" id="yang-bisa-dicek" labelledby="cek-judul">
      <H2 id="cek-judul">Yang bisa kamu cek setiap bulan</H2>
      <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-fg-2">
        Dari export Shopee dan modal yang kamu isi, HitungCuan menyusun tiga jawaban.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
        <Card
          className="lg:row-span-2"
          title="Pahami untung bulan ini"
          body="Lihat untung bersih satu bulan, dihitung dari uang yang benar-benar cair, lalu baca hal yang paling memengaruhinya: iklan, produk yang rugi, potongan Shopee, atau modal."
        >
          <div className="mt-8 border-t border-line pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Sticker kind="final" rot={-3}>
                Angka final
              </Sticker>
              <span className="text-sm text-fg-3">baru muncul kalau semua ini terpenuhi:</span>
            </div>
            <ul className="mt-4 grid gap-2.5">
              {FINAL_CHECKS.map((c) => (
                <li key={c} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-gain" />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Sticker kind="belum" rot={2}>
                Belum lengkap
              </Sticker>
              <span className="max-w-[40ch] text-sm leading-relaxed text-fg-2">kalau ada yang kurang, dan aplikasi menyebut yang mana.</span>
            </div>
          </div>
        </Card>

        <Card
          title="Temukan produk dan iklan yang perlu perhatian"
          body="Untung per produk dengan penanda yang rugi atau bermargin tipis, dan ROAS nyata tiap iklan dibanding target yang sudah memperhitungkan biaya dan retur."
        >
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Sticker kind="rugi" rot={-3}>
              Rugi
            </Sticker>
            <Sticker kind="tipis" rot={2}>
              Tipis
            </Sticker>
            <Sticker kind="takedown" rot={-2}>
              Takedown
            </Sticker>
            <Sticker kind="hero" rot={3}>
              Hero
            </Sticker>
          </div>
        </Card>

        <Card
          title="Simulasikan sebelum mengubah harga"
          body="Masukkan modal dan biaya, lalu lihat perkiraan harga jual yang masih untung dan target ROAS yang perlu kamu pasang."
        >
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
            <dt className="text-fg-3">Kamu isi</dt>
            <dd className="font-semibold">Modal, harga jual, persen admin, packaging</dd>
            <dt className="text-fg-3">Kamu dapat</dt>
            <dd className="font-semibold">Untung per order dan target ROAS</dd>
          </dl>
        </Card>
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
        <Cta lokasi="manfaat" />
        <p className="text-sm text-fg-2">Akun dan akses toko disiapkan oleh pengelola.</p>
      </div>
    </Section>
  )
}

function Card({ title, body, className = '', children }: { title: string; body: string; className?: string; children: ReactNode }) {
  return (
    <article className={`flex flex-col rounded-3xl bg-paper p-6 shadow-sheet ring-1 ring-line sm:p-8 ${className}`}>
      <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-[1.75rem]">{title}</h3>
      <p className="mt-3 max-w-[50ch] leading-relaxed text-fg-2">{body}</p>
      {children}
    </article>
  )
}
