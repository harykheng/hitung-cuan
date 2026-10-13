import { CheckIcon, H2, Section, ShieldIcon } from './ui'

const RULES = [
  'Bulan dihitung dari tanggal uang cair, bukan tanggal pesanan dibuat.',
  'Modal dikunci saat upload. HPP naik bulan ini, untung bulan lalu tidak ikut berubah.',
  'Pesanan batal dikurangkan dari angka iklan Shopee, jadi ROAS yang kamu lihat ROAS nyata.',
  'Kalau data belum lengkap, aplikasi bilang apa yang kurang. Baru "Angka final" kalau semua pas.',
]

export function Trust() {
  return (
    <Section tone="paper" id="percaya" labelledby="percaya-judul">
      <H2 id="percaya-judul">Kenapa angkanya bisa dipercaya</H2>
      <ul className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {RULES.map((r, i) => (
          <li key={r} data-reveal className="flex gap-4" style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
            <CheckIcon className="mt-1 size-6 shrink-0 text-accent" />
            <p className="max-w-[44ch] text-lg leading-relaxed">{r}</p>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-12 flex gap-4 rounded-2xl bg-tint p-5 sm:p-8">
        <ShieldIcon className="mt-1 size-8 shrink-0 text-accent" />
        <div>
          <p className="max-w-[40ch] font-display text-2xl leading-snug font-extrabold text-balance sm:text-3xl">
            Nama, alamat, nomor HP, username, dan nomor resi pembeli tidak pernah dibaca atau disimpan.
          </p>
          <p className="mt-3 max-w-[60ch] text-fg-2">
            Yang disimpan: nomor pesanan, produk, qty, status, dan angka penghasilan. File dibaca di browser kamu, dan
            upload file yang sama dua kali aman, tidak ada data ganda.
          </p>
        </div>
      </div>
    </Section>
  )
}
