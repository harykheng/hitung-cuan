import { STUDIO_URL } from '../config'
import { CheckIcon, H2, Section, ShieldIcon } from './ui'

const RULES = [
  'Bulan dihitung dari tanggal uang cair, bukan tanggal pesanan dibuat.',
  'Modal dikunci saat upload. HPP naik bulan ini, untung bulan lalu tidak ikut berubah.',
  'Pesanan batal dikurangkan dari angka iklan Shopee, jadi ROAS yang kamu lihat ROAS nyata.',
  'Kalau data belum lengkap, aplikasi bilang apa yang kurang. Baru "Angka final" kalau semua pas.',
]

/*
 * Siapa yang membuat dan kenapa angkanya bisa dipercaya, dalam satu bagian (dulu "Kenapa angkanya bisa dipercaya" dan
 * "Siapa di balik ini" terpisah, dan cerita pembuatnya baru muncul di dua pertiga halaman).
 * Klaim privasi di sini sengaja ringkas; daftar lengkap data yang disimpan ada di FAQ dan /privasi/ (sudah dicocokkan
 * dengan kode aplikasi). Jangan menambah klaim baru tanpa mencocokkannya dulu.
 */
export function Trust() {
  return (
    <Section tone="paper" id="tentang" labelledby="tentang-judul">
      <H2 id="tentang-judul">Dipakai dulu di toko kami sendiri</H2>
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-fg-2 sm:text-xl">
        HitungCuan dibuat untuk dua toko Shopee beauty kami, Harel Beauty dan Oraiste Beauty House, karena rekap
        spreadsheet tidak pernah cocok dengan saldo. Sekarang dibuka untuk seller lain. Dibangun oleh{' '}
        <a href={STUDIO_URL} className="py-3 font-semibold text-accent underline decoration-2 underline-offset-4">
          Studio Harel
        </a>
        .
      </p>

      <h3 className="mt-12 font-display text-xl font-bold sm:text-2xl">Kenapa angkanya bisa dipercaya</h3>
      <ul className="mt-6 grid gap-x-12 gap-y-5 md:grid-cols-2">
        {RULES.map((r) => (
          <li key={r} className="flex gap-4">
            <CheckIcon className="mt-1 size-6 shrink-0 text-accent" />
            <p className="max-w-[44ch] leading-relaxed sm:text-lg">{r}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex gap-4 rounded-2xl bg-tint p-5 sm:p-6">
        <ShieldIcon className="mt-0.5 size-7 shrink-0 text-accent" />
        <div>
          <p className="max-w-[60ch] font-semibold leading-relaxed sm:text-lg">
            Nama, alamat, nomor HP, username, dan nomor resi pembeli tidak diambil, tidak dikirim, dan tidak disimpan.
            File dibaca di browser kamu.
          </p>
          <a
            href="/privasi/"
            className="inline-flex min-h-11 items-center font-semibold text-accent underline decoration-2 underline-offset-4"
          >
            Lihat data apa saja yang disimpan
          </a>
        </div>
      </div>
    </Section>
  )
}
