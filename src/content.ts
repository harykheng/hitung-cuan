/*
 * Isi yang paling sering diganti pemilik: label CTA, navigasi, dan slot screenshot.
 * Asumsi dan placeholder yang masih harus diganti (juga dicatat di DESIGN.md, bagian "Landing 2"):
 *  - Semua screenshot aplikasi belum ada. Slot di bawah `src: null` menampilkan bingkai bertanda placeholder.
 *    Untuk mengganti: taruh gambar di public/screens/ (mis. rekap.webp), isi `src: '/screens/rekap.webp'`,
 *    serta `width` dan `height` aslinya supaya tidak ada lompatan tata letak.
 *  - Angka di kartu hero dan pita "dari setiap Rp100" adalah toko rekaan, selalu berlabel Contoh.
 *  - Nomor WhatsApp diambil dari src/config.ts (WA_NUMBER, sama dengan VITE_SUPPORT_WA di aplikasi).
 */

export const CTA_LABEL = 'Tanya akses HitungCuan'
export const CTA_LABEL_SHORT = 'Tanya akses'

export const NAV = [
  { href: '#cara-kerja', id: 'cara-kerja', label: 'Cara kerja' },
  { href: '#yang-bisa-dicek', id: 'yang-bisa-dicek', label: 'Yang bisa dicek' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
] as const

export type ScreenSlot = {
  /** Kode placeholder dari brief, supaya mudah dicari saat aset datang. */
  placeholder: string
  title: string
  alt: string
  src: string | null
  width?: number
  height?: number
}

/** Hero: kalau `src` diisi, kartu contoh diganti screenshot asli di dalam bingkai browser. */
export const HERO_SCREEN: ScreenSlot = {
  placeholder: 'PLACEHOLDER SCREENSHOT APLIKASI: Rekap bulanan HitungCuan',
  title: 'Rekap bulanan',
  alt: 'Contoh tampilan rekap untung bersih bulanan HitungCuan',
  src: null,
}

/** Bagian Preview aplikasi: satu besar (pertama) dan dua kecil. */
export const PREVIEW_SCREENS: ScreenSlot[] = [
  {
    placeholder: 'PLACEHOLDER SCREENSHOT: Rekap dan alasan untung',
    title: 'Rekap dan alasan untung',
    alt: 'Halaman Rekap HitungCuan: untung bersih bulan itu dan kotak "Kenapa untungnya segini?"',
    src: null,
  },
  {
    placeholder: 'PLACEHOLDER SCREENSHOT: Analisis iklan per produk',
    title: 'Analisis iklan per produk',
    alt: 'Halaman Iklan HitungCuan: kartu per produk dengan ROAS nyata, target ROAS, dan label seperti Takedown atau Hero',
    src: null,
  },
  {
    placeholder: 'PLACEHOLDER SCREENSHOT: Simulasi harga',
    title: 'Simulasi harga',
    alt: 'Halaman Simulasi Harga HitungCuan: modal, harga jual, potongan, dan target ROAS untuk satu produk',
    src: null,
  },
]
