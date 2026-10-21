import { BrowserIcon, DatabaseIcon, H2, Section, UserOffIcon } from './ui'

/*
 * Privasi dan transparansi. Setiap kalimat dicocokkan dengan aplikasi (shopee-profit-calc, commit 37e3cd3) dan
 * /privasi/:
 *  - File dibaca di browser (SheetJS, pdf.js, parser CSV); tidak ada upload file mentah, yang dikirim baris hasil olahan.
 *  - Kolom pembeli: BUYER_PRIVATE_COLUMNS di src/lib/shopeeColumns.ts (username, nama penerima, telepon, alamat, catatan,
 *    resi, Booking SN) tidak dipetakan parser; kolom metode pembayaran juga tidak dipetakan di parser mana pun.
 *    Ditulis "tidak diambil", bukan "tidak dibaca": browser tetap memuat seluruh file ke memori (audit 001, putaran 4).
 *  - Pemisahan toko: RLS per toko (is_store_member). Admin dan Supabase disebut lengkap di /privasi/.
 * Jangan menambah klaim keamanan absolut atau sertifikasi.
 */
const POINTS = [
  {
    icon: BrowserIcon,
    title: 'File asli tetap di perangkatmu',
    body: 'File export dibaca langsung di browser. File aslinya tidak diunggah ke server sebagai file mentah.',
  },
  {
    icon: UserOffIcon,
    title: 'Data pembeli tidak diambil',
    body: 'Nama penerima, alamat, nomor telepon, username, catatan pembeli, nomor resi, dan metode pembayaran tidak diambil dan tidak disimpan.',
  },
  {
    icon: DatabaseIcon,
    title: 'Yang disimpan: hasil olahan untuk tokomu',
    body: 'Angka pesanan, penghasilan, dan iklan, serta HPP dan biaya yang kamu isi, disimpan supaya rekapmu bisa dibuka lagi. Seller lain tidak bisa melihatnya.',
  },
]

export function Privacy() {
  return (
    <Section tone="tint" id="privasi" labelledby="privasi-judul">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <H2 id="privasi-judul">Data tokomu: apa yang dibaca, apa yang disimpan</H2>
          <a
            href="/privasi/"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-accent underline decoration-2 underline-offset-4"
          >
            Baca Kebijakan Privasi lengkap
          </a>
        </div>
        <ul className="grid gap-8">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <Icon className="mt-0.5 size-8 shrink-0 text-accent" />
              <div>
                <h3 className="text-lg font-bold sm:text-xl">{title}</h3>
                <p className="mt-1 max-w-[56ch] leading-relaxed text-fg-2">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
