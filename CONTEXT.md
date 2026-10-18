# Konteks HitungCuan (landing)

Dokumen ini menjelaskan **untuk apa** landing ini ada: produknya, alur seller dari video sampai bayar, hubungan dengan
aplikasi, istilah yang dipakai, keputusan yang sudah diambil, dan jebakan yang sudah diketahui. Isinya tidak mengulang
dokumen lain:

| Butuh apa | Baca |
|---|---|
| Aturan kerja agen, isi yang tidak boleh diubah sendiri | `CLAUDE.md` |
| Menjalankan, melacak, mengganti aset, deploy | `README.md` |
| Token, warna, tipografi, gerak, suara | `DESIGN.md` |
| Riwayat temuan dan perbaikan | `anti-slop/audit-001-*.md` |

**Sumber dan siapa yang menulis.** Ditulis oleh Claude pada 18 Okt 2026 dari isi repo ini (kode, README, DESIGN.md,
laporan audit, riwayat git), bukan dari brief pemilik. Repo aplikasi (`shopee-profit-calc`) tidak dibaca untuk dokumen
ini; semua yang disebut tentang aplikasi berasal dari catatan di repo ini. Bagian bertanda **[diinferensi]** adalah
bacaan, bukan keputusan pemilik.

**Nilai tidak disalin ke sini.** Harga, masa uji coba, nomor WhatsApp, janji balasan, dan konstanta rumus punya satu
sumber (`src/config.ts`, `src/lib/adsMath.ts`). Dokumen ini hanya menyebut nama konstantanya.

## Produk dalam satu paragraf

HitungCuan adalah aplikasi web untuk seller Shopee yang beriklan. Seller mengunggah laporan dari Seller Centre, lalu
aplikasi menghitung **untung bersih toko bulan itu**, memberi **putusan per iklan** (mana yang bikin rugi), dan
memperkirakan **harga jual minimum** yang masih untung. Aplikasinya dibuat dulu untuk dua toko Shopee beauty milik
pemilik (Harel Beauty dan Oraiste Beauty House), lalu dibuka untuk seller lain. Pembuatnya Studio Harel. Hanya untuk
Shopee, dan bukan produk resmi Shopee.

**Tugas landing ini satu: membuat pengunjung memulai chat WhatsApp dengan admin.** Tidak ada form, pendaftaran, backend,
atau cookie. Simulator, FAQ, Syarat, dan Privasi ada untuk mendukung keputusan itu.

## Tiga sistem, satu alur

| Sistem | Alamat | Isi | Kaitan dengan repo ini |
|---|---|---|---|
| Landing (repo ini) | `hitungcuan.studioharel.id` | HTML statis hasil prerender, di Cloudflare | Semua kode di sini |
| Aplikasi | `APP_URL` di `src/config.ts` | Repo `harykheng/shopee-profit-calc`, database dan login lewat Supabase | Rumus, nomor WA, klaim privasi, dan istilah harus sama (lihat tabel di bawah) |
| Admin di WhatsApp | `WA_NUMBER` | Orang, bukan sistem: membalas chat, membuat akun, menerima bayaran, menonaktifkan dan menghapus akun | Pesan WA dari landing membawa kode sumber |

Ditambah Umami Cloud untuk statistik kunjungan (tanpa cookie, hanya mencatat di domain produksi; rinciannya di README).

### Yang harus tetap sama di dua repo

| Hal | Di repo ini | Di aplikasi (menurut catatan di repo ini) |
|---|---|---|
| Rumus simulator | `src/lib/adsMath.ts` | `src/lib/adsMath.ts` (PANDUAN bagian 9) |
| Nomor WhatsApp admin | `WA_NUMBER` di `src/config.ts` | `VITE_SUPPORT_WA` |
| Klaim privasi | Hero, Trust, FAQ, Footer, `public/privasi/` | Migrasi Supabase, parser `src/lib/shopeeColumns.ts`, `BUYER_PRIVATE_COLUMNS` |
| Format file dan syarat file iklan | `HowItWorks.tsx` | `PANDUAN.md`, `src/lib/shopeeColumns.ts` |
| Istilah | Teks halaman | Kamus istilah di aplikasi |
| Aksen indigo | `src/index.css`, `DESIGN.md` | `DESIGN.md` aplikasi (aplikasi masih memakai lime, landing tidak) |

## Alur seller, dari video sampai bayar

1. Seller melihat konten di TikTok atau Threads dengan tautan `/?src=KODE`. **[diinferensi]** dari contoh di README dan
   dari adanya bantuan khusus browser bawaan aplikasi.
2. Di landing: membaca masalahnya, mencoba simulator (angkanya tidak dikirim ke mana pun), lalu menekan tombol WhatsApp.
   Di browser bawaan TikTok, Threads/Instagram, Facebook, LINE, dan WebView, tautan `wa.me` sering tertahan, jadi muncul
   `InAppWaHelp` dengan tombol "Salin nomor admin".
3. Pesan WhatsApp sudah terisi dan ditutup `Kode: HC-KODE`. Tombol di simulator ikut menulis angka simulasinya.
4. **Manual:** admin membalas (`REPLY_PROMISE`) dan membuatkan akun. Aplikasi tidak punya pendaftaran publik (audit 001,
   putaran 4).
5. Seller masuk ke aplikasi, mengunduh laporan dari Seller Centre, lalu mengunggahnya (paling nyaman di laptop; hasil bisa
   dilihat dari HP).
6. Uji coba `TRIAL_DAYS` hari, tanpa kartu kredit, tanpa tagihan otomatis.
7. **Manual:** di akhir uji coba admin menonaktifkan akun. Data tetap tersimpan.
8. Berlangganan: bayar lewat chat admin, per toko, bulanan atau tahunan (`PRICE_MONTHLY`, `PRICE_YEARLY`). Tidak ada
   refund. Satu akun untuk satu toko; seller dengan lebih dari satu toko bertanya ke admin.
9. **Manual:** setelah berhenti berlangganan, akun dinonaktifkan; setelah 3 bulan tidak berlangganan, data dihapus. Bisa
   dihapus lebih cepat atas permintaan.

Langkah 4, 7, dan 9 adalah janji operasional yang dijalankan pemilik dengan tangan (`CLAUDE.md`). Menurut audit 14 Okt
2026 (aplikasi commit `8b5e041`), aplikasi tidak punya konsep uji coba, langganan, atau kedaluwarsa. Ini belum dicek
ulang setelah aplikasi pindah ke multi-tenant.

**Ukuran keberhasilan.** Halaman mengukur klik, bukan chat: CTR per sumber = `cta_click` ÷ `kunjungan` dengan `sumber`
yang sama (README). Chat yang benar-benar masuk hanya terlihat dari `Kode: HC-...` di WhatsApp admin.

## Siapa pembacanya [diinferensi]

- Seller Shopee Indonesia yang sudah memasang iklan Shopee dan melihat ROAS di dashboard, tetapi tidak yakin tokonya
  untung.
- Banyak yang datang dari HP lewat browser bawaan TikTok atau Threads.
- Tidak harus paham spreadsheet atau istilah ROAS (FAQ menjanjikan penjelasan di setiap angka dan kamus istilah).
- Umumnya satu toko. Contoh produk di halaman bertema beauty karena toko pemilik beauty, tetapi produknya tidak dibatasi
  kategori.

## Glosarium

Istilah mengikuti aplikasi (`DESIGN.md`, bagian Suara). Kolom terakhir menunjuk tempat istilah itu hidup di kode.

### Uang dan hitungan

| Istilah | Arti | Di kode |
|---|---|---|
| Untung bersih | Uang yang benar-benar cair dalam sebulan, dikurangi modal dan semua biaya. Angka utama produk. | Kartu hero, `Story.tsx`, nota di `Features.tsx` |
| Cuan / boncos | Kata seller untuk untung / rugi. Dipakai secukupnya di judul, bukan di hitungan. | `Hero.tsx`, `Closing.tsx` |
| Uang masuk | Total yang cair dari Shopee dalam sebulan, sebelum modal dan biaya. | `Story.tsx`, `Features.tsx` |
| Penghasilan | Nama laporan dan menu di Seller Centre. **Belum untung**: modal, iklan, dan packaging belum dipotong. Di `adsMath.ts`, `penghasilan` adalah uang cair per order. | `Problems.tsx`, `adsMath.ts` |
| Modal / HPP | Harga pokok per unit, diisi seller. **Dikunci saat upload**: HPP naik bulan ini tidak mengubah untung bulan lalu. | `Trust.tsx`, `hpp` di `adsMath.ts` |
| Biaya | Admin, XTRA, iklan, dan packaging (di aplikasi juga Meta Ads dan lain-lain). | `Story.tsx`, `/privasi/` |
| Persen admin | Biaya admin Shopee, berbeda per kategori dan bisa berubah. Seller mengisinya sendiri; aplikasi tidak punya tarif bawaan. | `admin`, `DEFAULT_ADMIN` (simulator saja, hanya contoh) |
| XTRA | Program Gratis Ongkir XTRA Shopee, dipotong sebagai persen dari harga. | `XTRA` |
| Biaya proses | Potongan tetap per order. | `PROSES` |
| Target untung | Untung minimal setelah iklan, sebagai persen dari harga. Di aplikasi bisa diatur per toko. | `TARGET` |
| Bulan | Dihitung dari **tanggal uang cair**, bukan tanggal pesanan dibuat. | `Trust.tsx` |
| Retur | Bawaannya barang retur kembali ke stok; bisa diatur per toko kalau retur biasanya rusak. | `Faq.tsx` |
| Angka final | Rekap yang datanya sudah lengkap. Kalau belum lengkap, aplikasi menyebut apa yang kurang. | Stiker positif |

### Iklan

| Istilah | Arti | Di kode |
|---|---|---|
| ROAS | Omzet iklan ÷ biaya iklan, seperti di dashboard Shopee. **Ikut menghitung pesanan yang akhirnya batal.** Input simulator memakai angka ini ("ROAS di laporan Shopee"). | `Problems.tsx`, `Simulator.tsx` |
| ROAS nyata | ROAS setelah pesanan batal dikeluarkan. Yang dipakai aplikasi. | `Trust.tsx`, `Features.tsx` |
| Balik modal | ROAS minimum supaya iklan tidak rugi. | `balikModal` |
| Target ROAS | ROAS yang dibutuhkan supaya untung setelah iklan mencapai target untung. Angka ini yang seller isi di Shopee. Kosong kalau tidak mungkin dicapai. | `target` |
| Harga jual minimum | Perkiraan harga terendah yang masih untung, dengan target ROAS-nya. Hanya perkiraan dari angka yang diisi. | `PriceMock` di `Features.tsx` |

**Putusan per iklan.** Selalu tampil sebagai stiker berisi kata dan ikon, tidak pernah hanya warna.

| Putusan | Kapan | Stiker |
|---|---|---|
| Takedown | ROAS di bawah balik modal, atau untung per order sebelum iklan sudah nol atau minus. Artinya: matikan iklannya. | Rugi (`loss`) |
| ROAS terlalu kecil | Sudah mencapai balik modal, tetapi di bawah target ROAS (atau target tidak mungkin). | Perhatian (`sun`) |
| Aman | ROAS mencapai target ROAS. | Positif |
| Hero | Hanya di aplikasi: produk dengan iklan terbaik. Kriterianya tidak ada di repo ini, dan simulator tidak pernah menghasilkan Hero. | Positif |

Rumus simulator (`hitung()` di `adsMath.ts`), semuanya per order:

```
penghasilan    = harga - (admin + XTRA) x harga - PROSES
untung         = penghasilan - hpp                 (sebelum iklan)
margin         = untung / harga
biaya iklan    = harga / roas
balik modal    = harga / untung                    (kosong kalau untung <= 0)
target ROAS    = 1 / (margin - TARGET)             (kosong kalau margin <= TARGET atau hasilnya > 50)
```

### Laporan dan data

| Istilah | Arti |
|---|---|
| Seller Centre | Dashboard seller Shopee, sumber semua laporan. Jalur menunya dicek pemilik (14 Okt 2026) dan tertulis di `HowItWorks.tsx`. |
| 3 laporan | Tiga **jenis** laporan: pesanan (`.xlsx`), penghasilan (`.pdf`), iklan (`.csv`). Iklan bisa sampai tiga berkas: Data Keseluruhan Iklan (wajib), Rincian data iklan produk otomatis (kalau memakai iklan otomatis), Semua data grup iklan (kalau memakai grup iklan). |
| Data pembeli | Nama, alamat, nomor HP, username, catatan, nomor resi, dan Booking SN. Tidak diambil, tidak dikirim, tidak disimpan. File dibaca di browser; file aslinya tidak diunggah. Daftar lengkap ada di `/privasi/`. |
| Toko dan akun | Satu akun untuk satu toko. Harga dihitung per toko. |

### Pelacakan

| Istilah | Arti |
|---|---|
| Kode sumber | Nilai `?src=` di URL, dibersihkan jadi huruf besar. Tanpa parameter: `DEFAULT_SOURCE`. Ikut di pesan WA sebagai `Kode: HC-...` dan di Umami sebagai properti `sumber`. |
| Lokasi | Tombol WhatsApp mana yang ditekan pertama (`CtaLocation` di `track.ts`). |
| Contoh | Label wajib di setiap angka demo. Angka contoh tidak boleh dibaca sebagai hasil pelanggan. |

### Istilah yang punya dua arti

- **Admin.** (1) Orang di WhatsApp yang membuat akun dan menerima bayaran ("chat admin"). (2) Biaya admin Shopee ("persen
  admin", variabel `admin` di `adsMath.ts`). Di kode, `admin` selalu berarti biaya.
- **Hero.** (1) Bagian paling atas halaman (`Hero.tsx`, `#hero`). (2) Putusan iklan terbaik (`Sticker kind="hero"`).
- **Penghasilan.** Laporan Seller Centre, sekaligus variabel per order di `adsMath.ts`. Keduanya bukan untung.
- **ROAS.** Angka dashboard Shopee (dengan pesanan batal) berbeda dari ROAS nyata (tanpa pesanan batal).
- **3 laporan.** Tiga jenis, bisa tiga sampai lima berkas.
- **`ember`, `ember-text`, `peach`.** Nama token lama; nilainya indigo, bukan oranye (`DESIGN.md`).

## Keputusan yang sudah diambil

Urut waktu. Yang belakangan bisa membatalkan yang lebih awal.

| Tanggal | Keputusan | Sumber |
|---|---|---|
| 14 Okt 2026 | Jalur menu Seller Centre memakai versi yang dicek pemilik. Halaman `/syarat/` dibuat hanya dari fakta pemilik. | Audit 001, putaran 3 |
| 14 Okt 2026 | Satu akun = satu toko. Akhir uji coba = admin menonaktifkan akun (bukan "mode baca saja", karena aplikasi tidak punya mode itu). Data dihapus 3 bulan setelah berhenti berlangganan. | Audit 001, putaran 4 dan 5 |
| 14 Okt 2026 | Tiap seller memakai database sendiri. **Dibatalkan 16 Okt** (baris terakhir). | Audit 001, putaran 5 |
| 15 Okt 2026 | Aksen kembali ke indigo; oranye dibuang karena terbaca sebagai Shopee, padahal halaman menyatakan bukan produk resmi Shopee. | `DESIGN.md`, bagian Arah |
| 15 Okt 2026 | Statistik kunjungan lewat Umami Cloud tanpa cookie; `/privasi/` diperbarui. | `README.md`, `/privasi/` |
| 16 Okt 2026 | Semua seller berbagi satu database di aplikasi, dipisah row level security. `/privasi/` diperbarui. | Commit `7b5c327` |

## Yang belum diputuskan

- **Dial** di `DESIGN.md` masih inferensi.
- **Prototipe cerita gulir** (`Story.tsx`, sejak 16 Okt 2026) melanggar MOTION 2. Kalau ditolak: hapus berkasnya,
  `<Story />` di `App.tsx`, dan blok "Cerita gulir" di `src/index.css`.
- **Lime di aplikasi** dan penggantian nama token `ember`/`peach`: menunggu pemilik.
- **`/syarat/` belum ditinjau orang yang paham hukum.** Tidak ada pasal batas tanggung jawab, hukum yang berlaku, atau
  penyelesaian sengketa, karena pemilik belum memberikannya (audit 001, putaran 3).
- **Penyedia hosting aplikasi** tidak bisa dipastikan dari repo ini (audit 001, putaran 6), jadi tidak ditulis di
  `/privasi/`.

## Jebakan yang diketahui

Ditemukan saat menulis dokumen ini (18 Okt 2026). **Belum diperbaiki.**

1. **Klaim database di FAQ dan README sudah usang.** `src/components/Faq.tsx` (jawaban "Apakah data pembeli saya
   aman?") dan `README.md` (bagian Halaman Syarat Layanan dan Kebijakan Privasi) masih menulis "tiap seller memakai
   database sendiri". Sejak 16 Okt 2026, `/privasi/` menulis satu database bersama yang dipisah row level security. Ini
   klaim privasi, jadi perbaikannya mengikuti aturan di `CLAUDE.md`.
2. **"30 hari" ditulis langsung, bukan dari `TRIAL_DAYS`**, di `src/lib/whatsapp.ts` (dua pesan), `src/components/Faq.tsx`
   (jawaban refund), `public/syarat/index.html` (tiga tempat), `index.html` (description, `og:description`,
   `og:image:alt`), dan gambar `public/og.png`. Mengubah `TRIAL_DAYS` saja meninggalkan semua itu. Janji balasan
   (`REPLY_PROMISE`) juga ditulis ulang di `/syarat/`.
3. **Angka contoh saling terkait.** 14,25 − 8,15 − 2,68 = 3,42 juta, "4 iklan bikin rugi", dan "1 produk dengan iklan
   terbaik" muncul di `Hero.tsx`, `Story.tsx`, dan `Features.tsx`. Ubah satu, ubah semuanya.
4. **Bagian Story belum tercatat** di "Susunan halaman" (`README.md`) dan "Urutan bagian" (`DESIGN.md`). Letaknya di
   antara Masalah dan Simulator.

## Kapan dokumen ini diperbarui

- Alur seller berubah: cara bayar, pembuatan akun, perlakuan akhir uji coba, atau penghapusan data.
- Hubungan dengan aplikasi berubah: rumus, database, kolom yang disimpan, atau istilah baru di aplikasi.
- Istilah baru muncul di teks halaman.
- Butir di "Yang belum diputuskan" diputuskan, atau butir di "Jebakan yang diketahui" diperbaiki (hapus butirnya).

Jangan menyalin nilai yang sudah punya sumber (harga, masa uji coba, nomor WA, konstanta rumus, token warna). Tunjuk
sumbernya.
