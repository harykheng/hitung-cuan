/*
 * Landing 3: semua isi yang sering diganti pemilik ada di file ini.
 *
 * Asumsi dan placeholder yang masih harus diganti (juga dicatat di DESIGN.md, bagian "Landing 3"):
 *  - Empat screenshot aplikasi belum ada (`src: null`). Bingkainya tampil sebagai "rentang yang menunggu ditempel"
 *    (garis putus-putus bergerak). Untuk mengganti: taruh gambar di public/screens/, isi `src`, `width`, `height`.
 *  - Semua angka dan nama produk di lembar contoh (bagian "Saring") adalah toko rekaan, selalu berlabel Contoh.
 *    Kolom data pembeli tidak pernah diisi, bahkan dengan data rekaan: sejak awal tampil sebagai titik tersamar.
 *  - Nomor WhatsApp dari src/config.ts (WA_NUMBER, sama dengan VITE_SUPPORT_WA di aplikasi).
 */

export const CTA_LABEL = 'Tanya akses HitungCuan'
export const CTA_LABEL_SHORT = 'Tanya akses'

export const NAV = [
  { id: 'cara-kerja', label: 'Cara kerja' },
  { id: 'yang-bisa-dicek', label: 'Yang bisa dicek' },
  { id: 'faq', label: 'FAQ' },
] as const

export type ScreenSlot = {
  id: string
  /** Kode placeholder dari brief, supaya mudah dicari saat aset datang. */
  placeholder: string
  title: string
  alt: string
  src: string | null
  width?: number
  height?: number
}

export const HERO_SCREEN: ScreenSlot = {
  id: 'layar-utama',
  placeholder: 'PLACEHOLDER SCREENSHOT APLIKASI: Rekap bulanan HitungCuan',
  title: 'Rekap bulanan',
  alt: 'Contoh tampilan rekap untung bersih bulanan HitungCuan',
  src: null,
}

export const PREVIEW_SCREENS: ScreenSlot[] = [
  {
    id: 'layar-rekap',
    placeholder: 'PLACEHOLDER SCREENSHOT: Rekap dan alasan untung',
    title: 'Rekap dan alasan untung',
    alt: 'Halaman Rekap HitungCuan: untung bersih bulan itu dan penjelasan faktor yang memengaruhinya',
    src: null,
  },
  {
    id: 'layar-iklan',
    placeholder: 'PLACEHOLDER SCREENSHOT: Analisis iklan per produk',
    title: 'Analisis iklan per produk',
    alt: 'Halaman Iklan HitungCuan: ROAS nyata tiap produk dibandingkan target ROAS',
    src: null,
  },
  {
    id: 'layar-simulasi',
    placeholder: 'PLACEHOLDER SCREENSHOT: Simulasi harga',
    title: 'Simulasi harga',
    alt: 'Halaman Simulasi Harga HitungCuan: modal, harga jual, potongan, dan target ROAS untuk satu produk',
    src: null,
  },
]

/* ---------- Lembar contoh untuk bagian "Saring" ---------- */

/*
 * Kolom dalam satuan lebar `u` (lihat sheet.css). Urutan = urutan di lembar.
 *  kind 'base'    : kolom export pesanan yang dipakai hitungan.
 *  kind 'order'   : hanya bermakna per pesanan, hilang saat dirangkum per produk (No. Pesanan).
 *  kind 'private' : data pembeli. Tidak pernah diisi: selalu titik tersamar, lalu disaring (menyempit dan diarsir).
 *  kind 'extra'   : datang dari laporan lain atau isian seller (bab 2).
 *  kind 'result'  : hasil hitungan per produk (bab 3).
 * Daftar kolom pembeli mengikuti kolom yang tidak dipetakan parser aplikasi (BUYER_PRIVATE_COLUMNS di
 * shopee-profit-calc, ditambah metode pembayaran), sama dengan bagian Privasi.
 */
export type ColKind = 'base' | 'order' | 'private' | 'extra' | 'result'
export type Col = { key: string; label: string; w: number; kind: ColKind; source?: string; num?: boolean }

export const COLS: Col[] = [
  { key: 'produk', label: 'Nama Produk', w: 17, kind: 'base' },
  { key: 'pesanan', label: 'No. Pesanan', w: 15, kind: 'order' },
  { key: 'jml', label: 'Jumlah', w: 8, kind: 'base', num: true },
  { key: 'total', label: 'Total Harga', w: 13, kind: 'base', num: true },
  { key: 'username', label: 'Username (Pembeli)', w: 15, kind: 'private' },
  { key: 'penerima', label: 'Nama Penerima', w: 14, kind: 'private' },
  { key: 'telepon', label: 'No. Telepon', w: 12, kind: 'private' },
  { key: 'alamat', label: 'Alamat Pengiriman', w: 20, kind: 'private' },
  { key: 'resi', label: 'No. Resi', w: 12, kind: 'private' },
  { key: 'bayar', label: 'Metode Pembayaran', w: 16, kind: 'private' },
  { key: 'catatan', label: 'Catatan Pembeli', w: 15, kind: 'private' },
  { key: 'potongan', label: 'Potongan Shopee', w: 14, kind: 'extra', source: 'Penghasilan', num: true },
  { key: 'iklan', label: 'Iklan', w: 9, kind: 'extra', source: 'Iklan .csv', num: true },
  { key: 'hpp', label: 'Modal (HPP)', w: 11, kind: 'extra', source: 'Isianmu', num: true },
  { key: 'untung', label: 'Untung', w: 17, kind: 'result', num: true },
]

/** Lebar kolom pembeli setelah disaring (u). */
export const PRIVATE_W = 2

/** Baris per pesanan (bab 0 sampai 2). Iklan sengaja kosong: biaya iklan dihitung per produk, bukan per pesanan. */
export const ORDER_ROWS: Record<string, string>[] = [
  { produk: 'Kemeja Linen', pesanan: '260803K7QF2M', jml: '2', total: '258.000', potongan: '46.000', hpp: '112.000' },
  { produk: 'Celana Kulot', pesanan: '260803M1XA9C', jml: '1', total: '155.000', potongan: '27.000', hpp: '105.000' },
  { produk: 'Tas Rajut', pesanan: '260804B8RT4D', jml: '1', total: '189.000', potongan: '35.000', hpp: '97.000' },
  { produk: 'Hijab Voal', pesanan: '260804Q2LW7H', jml: '3', total: '180.000', potongan: '30.000', hpp: '113.000' },
  { produk: 'Kemeja Linen', pesanan: '260805C4NE1J', jml: '1', total: '129.000', potongan: '23.000', hpp: '56.000' },
  { produk: 'Celana Kulot', pesanan: '260805T9VK3P', jml: '2', total: '310.000', potongan: '55.000', hpp: '210.000' },
]

/*
 * Rangkuman per produk (bab 3), satu bulan toko rekaan, dalam juta rupiah.
 * Cek: omzet 8,3 + 5,9 + 3,4 + 2,4 = 20,0. Untung per produk 2,3 + 1,4 − 0,6 + 0,3 = 3,4.
 * Biaya lain (packaging dan sejenisnya) 0,4, jadi untung bersih bulan itu 3,0.
 * Status: Tipis = untung di bawah 15% dari omzet (Hijab Voal 12,5%). Ambang ini hanya untuk contoh.
 */
export type Status = 'aman' | 'tipis' | 'rugi'
export const PRODUCT_ROWS: { cells: Record<string, string>; status?: Status; strong?: boolean }[] = [
  { cells: { produk: 'Kemeja Linen', jml: '64', total: '8,3 jt', potongan: '1,5 jt', iklan: '0,9 jt', hpp: '3,6 jt', untung: '+2,3 jt' }, status: 'aman' },
  { cells: { produk: 'Tas Rajut', jml: '31', total: '5,9 jt', potongan: '1,1 jt', iklan: '0,4 jt', hpp: '3,0 jt', untung: '+1,4 jt' }, status: 'aman' },
  { cells: { produk: 'Hijab Voal', jml: '40', total: '2,4 jt', potongan: '0,4 jt', iklan: '0,2 jt', hpp: '1,5 jt', untung: '+0,3 jt' }, status: 'tipis' },
  { cells: { produk: 'Celana Kulot', jml: '22', total: '3,4 jt', potongan: '0,6 jt', iklan: '1,1 jt', hpp: '2,3 jt', untung: '−0,6 jt' }, status: 'rugi' },
  { cells: { produk: 'Biaya lain', untung: '−0,4 jt' } },
  { cells: { produk: 'Untung bersih', total: '20,0 jt', untung: '+3,0 jt' }, strong: true },
]

export const STATUS_LABEL: Record<Status, string> = { aman: 'Aman', tipis: 'Tipis', rugi: 'Rugi' }

/** Lima bab cerita "Saring". Teks ini adalah isi yang dibaca; lembarnya hanya gambaran (aria-hidden). */
export const CHAPTERS = [
  {
    title: 'Mulai dari file yang sudah kamu punya.',
    body: 'Export pesanan Shopee (.xlsx, status Semua) berisi satu baris per pesanan dan puluhan kolom. Modal barang dan biaya iklannya tidak ada di file itu.',
  },
  {
    title: 'Kolom data pembeli dilewati.',
    body: 'Nama, alamat, nomor telepon, dan kolom pribadi lain tidak diambil. Filenya dibaca di browser dan tidak diunggah sebagai file mentah.',
  },
  {
    title: 'Laporan lain melengkapi barisnya.',
    body: 'Potongan Shopee dari laporan penghasilan "Sudah Dilepas", biaya iklan dari file .csv iklan, dan modal (HPP) per produk atau variasi yang kamu isi sendiri.',
  },
  {
    title: 'Lalu dirangkum per produk.',
    body: 'Kelihatan produk mana yang untung, mana yang marginnya tipis, dan mana yang rugi setelah potongan dan iklan.',
  },
  {
    title: 'Jawabannya satu angka, beserta alasannya.',
    body: 'Statusnya "Angka final" kalau laporan, pencocokan data, HPP, dan biaya sudah lengkap. Kalau belum, tertulis "Belum lengkap" dan aplikasi menyebut apa yang kurang.',
  },
] as const
