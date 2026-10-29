/*
 * Landing v2 (/v2/): isi yang sering diganti pemilik. Arah dan batasnya ada di DESIGN.md, bagian "Landing v2".
 *
 * Susunan mengikuti ritme halaman penjualan panjang (masalah, studi kasus, sebelum/sesudah, cara kerja, harga, FAQ,
 * penutup) yang disetujui pemilik pada 29 Okt 2026, tetapi tanpa testimoni, statistik hasil, hitung mundur, atau
 * "total nilai" rekaan. Setiap kalimat tentang aplikasi diambil dari landing 3 (src/landing3/), yang sudah dicocokkan
 * dengan kode aplikasi (shopee-profit-calc). Kalau salah satu berubah, ubah keduanya.
 */

export const KICKER = 'text-sm font-semibold tracking-wide text-accent uppercase'

/** Lima kartu "Kalau ini kamu". Menggambarkan keadaan seller, bukan klaim tentang aplikasi. */
export const PROBLEMS = [
  {
    title: 'Omzet naik, saldo tetap tipis',
    body: 'Uang yang cair sudah dipotong Shopee, dan rinciannya tersebar di laporan penghasilan.',
  },
  {
    title: 'Iklan jalan, tapi tidak tahu produk mana yang nombok',
    body: 'ROAS di dashboard iklan belum menghitung modal barang dan potongan Shopee.',
  },
  {
    title: 'Modal dicatat terpisah',
    body: 'HPP ada di buku atau catatan HP, dan tidak pernah ketemu dengan data pesanan.',
  },
  {
    title: 'Harga diubah pakai feeling',
    body: 'Ikut harga kompetitor tanpa tahu batas harga minimal produkmu sendiri.',
  },
  {
    title: 'Rekap manual tidak cocok dengan saldo',
    body: 'Retur, voucher, dan packaging sering lupa dikurangi.',
  },
] as const

/*
 * Studi kasus: toko pakaian rekaan yang SAMA dengan lembar "Saring" di landing 3 (src/landing3/content.ts), satu bulan,
 * dalam juta rupiah. Selalu berlabel Contoh.
 * Cek: omzet 20,0. Potongan Shopee 1,5 + 1,1 + 0,4 + 0,6 = 3,6, jadi uang cair 16,4.
 * HPP 3,6 + 3,0 + 1,5 + 2,3 = 10,4. Iklan 0,9 + 0,4 + 0,2 + 1,1 = 2,6. Biaya lain 0,4.
 * Untung bersih 16,4 − 10,4 − 2,6 − 0,4 = 3,0. Celana Kulot 3,4 − 0,6 − 1,1 − 2,3 = −0,6 (rugi).
 * Hijab Voal 0,3 dari 2,4 = 12,5%, "Tipis" (di bawah 15%, ambang hanya untuk contoh).
 */
export const CASE_SEEN = [
  { label: 'Omzet', value: 'Rp20,0 juta' },
  { label: 'Uang cair dari Shopee', value: 'Rp16,4 juta' },
] as const

export const CASE_REAL = [
  { label: 'Uang cair dari Shopee', value: 'Rp16,4 juta' },
  { label: 'Modal barang (HPP)', value: '−Rp10,4 juta' },
  { label: 'Iklan', value: '−Rp2,6 juta' },
  { label: 'Biaya lain (packaging dan sejenisnya)', value: '−Rp0,4 juta' },
] as const

export const CASE_NET = 'Rp3,0 juta'

export const CASE_PRODUCTS = [
  { name: 'Celana Kulot', value: '−Rp0,6 juta', status: 'rugi' as const, note: 'rugi setelah iklan' },
  { name: 'Hijab Voal', value: '+Rp0,3 juta', status: 'tipis' as const, note: 'untung 12,5% dari omzetnya' },
]

/** Sebelum → sesudah. Sisi "sesudah" hanya menyebut apa yang ditampilkan aplikasi, bukan janji hasil usaha. */
export const BEFORE_AFTER = [
  { before: 'Menebak untung dari saldo cair', after: 'Untung bersih per bulan, lengkap dengan alasannya' },
  { before: 'Rekap manual dari tiga file berbeda', after: 'File export diunggah, lalu dirangkum per produk' },
  {
    before: 'Menilai iklan dari ROAS di dashboard iklan',
    after: 'ROAS nyata dibanding target yang sudah memperhitungkan biaya dan retur',
  },
  { before: 'Mengubah harga pakai feeling', after: 'Simulasi harga jual dan target ROAS sebelum harga diubah' },
] as const

/** Sama dengan STEPS di src/landing3/Sections.tsx. */
export const STEPS = [
  {
    title: 'Siapkan export Shopee',
    body: 'Export pesanan (.xlsx, status Semua), laporan penghasilan Excel "Sudah Dilepas", dan file .csv iklan kalau kamu beriklan. Laporan lama dalam PDF bulanan masih bisa dipakai.',
  },
  {
    title: 'Lengkapi HPP dan biaya',
    body: 'Isi modal per produk atau variasi, lalu biaya di luar Shopee seperti Meta Ads, packaging, dan biaya lain, supaya hitungannya menggambarkan kondisi tokomu.',
  },
  {
    title: 'Baca hasil, tentukan langkah',
    body: 'Cek rekap bulanan, untung per produk, iklan yang rugi, atau coba simulasi harga sebelum mengubah harga jual.',
  },
] as const

/** Sama dengan CHECKS di src/landing3/Sections.tsx; urutannya sama dengan PREVIEW_SCREENS di src/landing3/content.ts. */
export const FEATURES = [
  {
    title: 'Pahami untung bulan ini',
    body: 'Lihat ringkasan untung bersih bulanan dan faktor yang paling memengaruhi hasilnya.',
  },
  {
    title: 'Temukan produk dan iklan yang perlu perhatian',
    body: 'Cek untung per produk, tandai yang rugi atau marginnya tipis, dan bandingkan ROAS nyata iklan dengan target yang sudah memperhitungkan biaya dan retur.',
  },
  {
    title: 'Simulasikan sebelum mengubah harga',
    body: 'Masukkan modal dan biaya, lalu lihat perkiraan harga jual dan target ROAS sebelum harga diubah atau iklan dijalankan.',
  },
] as const

/** Sama dengan PRIV di src/landing3/Sections.tsx (dicocokkan dengan aplikasi dan /privasi/). */
export const PRIVACY = [
  {
    title: 'Dibaca di browser.',
    body: 'File export asli dibaca langsung di browser dan tidak diunggah ke server sebagai file mentah.',
  },
  {
    title: 'Data pembeli dilewati.',
    body: 'Nama penerima, alamat, nomor telepon, username, catatan pembeli, nomor resi, dan metode pembayaran tidak diambil dan tidak disimpan.',
  },
  {
    title: 'Hasil olahan disimpan.',
    body: 'Angka pesanan, penghasilan, dan iklan, serta HPP dan biaya yang kamu isi, disimpan untuk akun tokomu supaya rekap bisa dibuka lagi. Seller lain tidak bisa melihatnya.',
  },
] as const

/** Isi paket: tiga baris INCLUDED landing 3 ditambah tiga fitur. Tanpa harga per baris. */
export const INCLUDED = [
  'Rekap untung bersih per bulan dan per produk',
  'Analisis iklan per produk: ROAS nyata dibanding target ROAS',
  'Simulasi harga jual dan target ROAS',
  'Satu akun untuk 1 toko Shopee. Punya lebih dari satu toko? Tanyakan ke admin.',
  'Pembaruan kalau format file Shopee berubah sudah termasuk.',
  'Data tokomu terpisah dari seller lain.',
] as const
