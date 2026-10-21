import type { ReactNode } from 'react'
import { FileIcon, H2, Section, Sticker } from './ui'

/*
 * Tiga langkah (urutan sungguhan, jadi angka 1 sampai 3 membawa informasi). Disusun sebagai baris selebar halaman,
 * berbeda dari kartu di bagian sebelumnya.
 * Format file dicocokkan dengan aplikasi (shopee-profit-calc, CONTEXT.md dan src/lib/parsers, commit 37e3cd3):
 * pesanan .xlsx status Semua; penghasilan Excel "Sudah Dilepas" (disarankan) atau PDF bulanan untuk laporan lama;
 * iklan .csv. Syarat "Angka final" dari src/lib/monthStatus.ts: laporan penghasilan ada, uang cair cocok dengan
 * pesanannya, semua barang punya HPP, biaya bulan itu sudah disimpan.
 */
const FILES = [
  { name: 'Export pesanan', type: '.xlsx', note: 'status Semua' },
  { name: 'Laporan penghasilan', type: '.xlsx', note: 'Excel "Sudah Dilepas" (disarankan), atau PDF bulanan untuk laporan lama' },
  { name: 'Data iklan', type: '.csv', note: 'kalau kamu beriklan di Shopee' },
]

export function HowItWorks() {
  return (
    <Section tone="canvas" id="cara-kerja" labelledby="cara-kerja-judul">
      <H2 id="cara-kerja-judul">Dari export Shopee sampai jawaban</H2>

      <ol className="mt-10 border-t border-rule">
        <Step n={1} title="Siapkan export Shopee" body="Unduh dari Seller Centre sesuai kebutuhan, lalu unggah di aplikasi.">
          <ul className="mt-4 grid gap-2.5">
            {FILES.map((f) => (
              <li key={f.name} className="flex items-start gap-3">
                <FileIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="font-semibold">{f.name}</span> <span className="text-fg-3">{f.type}</span>
                  <span className="block text-sm text-fg-2">{f.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Step>
        <Step
          n={2}
          title="Lengkapi HPP dan biaya"
          body="Isi modal per produk atau variasi, serta biaya seperti Meta Ads, packaging, dan biaya lain, supaya hitungannya menggambarkan kondisi tokomu."
        />
        <Step
          n={3}
          title="Baca hasilnya, lalu tentukan langkah"
          body="Cek rekap bulanan, untung per produk, iklan yang perlu dimatikan atau dipertahankan, atau simulasikan harga baru."
        />
      </ol>

      <div className="mt-10 grid gap-4 rounded-2xl bg-tint p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6 sm:p-6">
        <Sticker kind="belum" rot={-3} className="justify-self-start">
          Belum lengkap
        </Sticker>
        <p className="max-w-[62ch] leading-relaxed">
          Kalau laporan atau data pendukung belum lengkap atau belum cocok, hasilnya berstatus <strong>Belum lengkap</strong>{' '}
          dan belum bisa dipegang sebagai angka akhir. HitungCuan hanya seakurat file dan angka yang kamu masukkan.
        </p>
      </div>
      <p className="mt-6 text-fg-2">Unggah file paling nyaman lewat laptop. Hasilnya bisa dibuka dari HP atau iPad.</p>
    </Section>
  )
}

function Step({ n, title, body, children }: { n: number; title: string; body: string; children?: ReactNode }) {
  return (
    <li className="grid gap-4 border-b border-rule py-7 sm:grid-cols-[5rem_1fr] sm:gap-6 lg:grid-cols-[8rem_minmax(0,22rem)_1fr] lg:gap-10">
      <span aria-hidden="true" className="font-display text-5xl leading-none font-extrabold text-fg sm:text-6xl">
        {n}
      </span>
      <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight">
        <span className="sr-only">Langkah {n}: </span>
        {title}
      </h3>
      <div className="sm:col-start-2 lg:col-start-3">
        <p className="max-w-[56ch] leading-relaxed text-fg-2">{body}</p>
        {children}
      </div>
    </li>
  )
}
