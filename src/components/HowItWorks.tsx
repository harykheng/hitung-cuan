import { REPLY_PROMISE, TRIAL_DAYS } from '../config'
import { ChevronIcon, H2, Section } from './ui'

/*
 * Langkah mulai, tanpa demo animasi: hasilnya sudah diperlihatkan di bagian "Hasil yang kamu dapat" tepat di atas,
 * jadi bagian ini cukup menjawab "apa yang harus aku lakukan". Janji balas 1×24 jam disebut di sini (dan di Harga),
 * bukan di bawah setiap tombol.
 */
const STEPS = [
  { t: 'Chat admin lewat WhatsApp', d: `Minta uji coba gratis ${TRIAL_DAYS} hari. ${REPLY_PROMISE}.` },
  { t: 'Admin membuatkan akun tokomu', d: 'Kamu tinggal login.' },
  { t: 'Unduh 3 laporan dari Seller Centre', d: 'Pesanan (.xlsx), penghasilan (.pdf), dan iklan (.csv).' },
  { t: 'Upload, lalu lihat hasilnya', d: 'Untung atau rugi bulan itu, iklan yang bikin rugi, dan harga jual yang aman.' },
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

export function HowItWorks() {
  return (
    <Section tone="canvas" id="cara-kerja" labelledby="cara-kerja-judul">
      <H2 id="cara-kerja-judul">Dari chat sampai hasil pertama</H2>
      <ol className="mt-8 grid gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8">
        {STEPS.map((s, i) => (
          <li key={s.t} className="flex gap-4">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-display text-xl font-extrabold text-white"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold">
                <span className="sr-only">Langkah {i + 1}: </span>
                {s.t}
              </h3>
              <p className="mt-1 max-w-[46ch] text-fg-2">{s.d}</p>
              {i === 2 ? <FilePaths /> : null}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-fg-2">Upload paling nyaman lewat laptop. Hasilnya bisa dilihat dari HP.</p>
    </Section>
  )
}

/** Jalur menu Seller Centre, tertutup secara bawaan: berguna setelah akun dibuat, bukan untuk memutuskan chat. */
function FilePaths() {
  return (
    <details className="mt-1">
      <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-semibold text-accent">
        Di mana dapatnya?
        <ChevronIcon className="chev size-5 shrink-0" />
      </summary>
      <ul className="mt-1 grid max-w-[60ch] gap-2 text-sm leading-relaxed text-fg-2">
        {FILES.map((f) => (
          <li key={f.name}>
            <span className="font-semibold text-fg">{f.name}</span>: Seller Centre → {f.path}
          </li>
        ))}
      </ul>
    </details>
  )
}
