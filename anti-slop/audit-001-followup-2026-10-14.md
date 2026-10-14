# antislop audit 001, laporan perbaikan (2026-10-14)

Nomor yang disetujui: 1, 3, 9. Nomor lain tidak disentuh dan masih terbuka di `audit-001-2026-10-14.md`.

| # | Perbaikan | File | Verifikasi |
|---|---|---|---|
| 1 | Em dash di `<title>` dan `og:title` diganti titik dua: "HitungCuan: Hitung untung bersih toko Shopee-mu". | `index.html` | `grep` em dash di `index.html` dan `dist/index.html`: 0. Judul tab dan `og:title` dibaca dari browser. |
| 3 | Input ROAS dan persen admin kini menampilkan pesan teks saat tidak valid (kosong, 0, di atas 99, admin 60 ke atas atau hanya tanda koma). Pesan menyebut nilai yang sedang dipakai hasil. Ditambah `aria-invalid`, `aria-describedby`, `role="alert"`, dan border merah (bukan satu-satunya penanda). Pesan hilang saat nilai valid atau saat blur. | `src/components/Simulator.tsx` | 9 skenario diuji di Chromium: kosong, 0, 150, kembali valid, admin 99, admin ",", admin 8,25, blur. Teks merah `#c4361e` di putih = 5,39:1. |
| 9 | Skrip di `<head>` mencabut kelas `js` kalau bundle belum berjalan dalam 4 detik, sehingga 18 blok `[data-reveal]` tidak lagi tertahan transparan. `main.tsx` memasang `data-hc` di `<html>` begitu bundle berjalan. README diperbarui. | `index.html`, `src/main.tsx`, `README.md` | Bundle diblokir: 18 dari 18 blok tersembunyi di detik 1,5, 0 tersembunyi di detik 5. Bundle ditunda 7 detik: konten tampil di detik 5, lalu hidrasi, simulator jalan, 0 error. Muat normal: animasi gulir tetap utuh (18 tersembunyi sebelum digulir, 0 setelah). |

Build (`tsc` + vite + prerender) lulus. Console 0 error dan warning pada muat normal.

## Batasan

- Ambang 4 detik adalah tebakan saya, bukan angka dari data jaringan pengunjungmu. Di jaringan yang sangat lambat, konten bisa tampil tanpa animasi gulir sebelum bundle datang. Itu pilihan yang disengaja: konten terbaca lebih penting daripada animasinya.
- Pesan ROAS di atas 99 hanya muncul untuk nilai yang diketik. Slider tetap dibatasi 1 sampai 15 seperti sebelumnya.

---

# Putaran 2: nomor 4 dan 8

| # | Perbaikan | File | Verifikasi |
|---|---|---|---|
| 4 | Batas semua kontrol interaktif di simulator (input HPP, harga, ROAS, admin, tombol +/-, preset yang belum dipilih) memakai token baru `--color-control` (#7f7f94) menggantikan `border-ink/25` (1,71:1). Kontrasnya kini 3,91:1 terhadap putih, syarat 3:1. Garis putus-putus dekoratif tidak diubah. | `src/index.css`, `src/components/Simulator.tsx` | Warna border dibaca dari browser pada 7 kontrol lalu dihitung dengan `contrast-check.py`: semuanya 3,91:1 (preset terpilih 10,19:1). |
| 8 | Target sentuh dinaikkan ke minimal 44px: link logo (`min-h-11`), area input uang (input kini setinggi kotaknya, 44px, jadi mengetuk tepi bawah kotak memfokuskan input), link footer dan "Studio Harel" di Maker (`min-h-11`), link WhatsApp di FAQ (`py-3.5`). Tombol file di demo "Cara Kerja" terukur 40px karena `scale-90`, jadi `scale-90` dihapus. | `Bars.tsx`, `Simulator.tsx`, `Footer.tsx`, `Maker.tsx`, `Faq.tsx`, `HowItWorks.tsx` | Semua `a`, `button`, `summary`, `input` (dengan semua `<details>` dibuka) diukur di 360, 390, 1280px: 0 elemen di bawah 44px. Tidak ada overflow horizontal, console bersih. |

## Temuan baru dari putaran ini (belum diperbaiki)

| # | Prioritas (tier) | Aturan | Temuan | Bukti | Keyakinan |
|---|---|---|---|---|---|
| 19 | HIGH | R-25 | Setelah animasi demo "Cara Kerja" selesai, tiga tombol file (`pesanan.xlsx`, `penghasilan.pdf`, `iklan.csv`) tetap diredupkan ke `opacity-30` dan masih bisa diklik. Teksnya jadi sekitar #5e60a1 di atas #1d2079 = 2,39:1, di bawah 4,5:1. Audit 001 terlewat karena saya hanya menghitung warna token, bukan opasitas elemen. | `HowItWorks.tsx:129` (`uploading ? 'translate-y-4 opacity-30'`). Opasitas komputasi 0,3 dibaca di browser setelah animasi selesai. | Certain |

## Batasan

- Toggle "Bulan untung / Bulan rugi" di kartu hero memakai latar `tint` di atas putih (1,18:1). Tombol terpilih berisi penuh dan tombol yang tidak terpilih punya label teks, jadi saya tidak menganggapnya pelanggaran, tapi batas kelompoknya sendiri lemah. Tidak diubah.
- Link yang berada di dalam kalimat (FAQ) dibesarkan lewat padding supaya aliran kalimat tidak berubah. WCAG 2.5.8 sebenarnya mengecualikan link inline, jadi ini mengikuti aturan skill (R-03) yang lebih ketat, bukan syarat WCAG.

---

# Putaran 3: nomor 2 dan 6

Sumber fakta: jawaban pemilik toko (14 Okt 2026). Tidak ada isi yang saya karang.

| # | Perbaikan | File | Verifikasi |
|---|---|---|---|
| 2 | Jalur menu diganti dengan yang dicek pemilik di Seller Centre: Pesanan Saya → Semua → Export → pilih rentang tanggal; Penghasilan Saya → Catatan transaksi penghasilan → pilih rentang tanggal bulanan; Iklan → Download data → pilih 3 pilihan (Data Keseluruhan Iklan, Rincian data iklan produk otomatis, semua data grup iklan). Komentar "perlu dicocokkan" dihapus. | `HowItWorks.tsx` | Ketiga tombol file diklik di browser, teks jalur baru tampil, jalur lama tidak ada lagi di halaman. |
| 6 | (a) Kalimat akhir uji coba: setelah 30 hari akun jadi mode baca saja, tanpa tagihan otomatis (menutup TODO di `Pricing.tsx`). (b) Kartu harga: "Pembayaran lewat chat admin. Tidak ada refund." plus tautan Syarat Layanan. (c) FAQ: jawaban "berhenti berlangganan" kini memuat penghapusan data 3 bulan dan hapus lebih cepat lewat admin; FAQ baru "Bagaimana cara bayar? Ada refund?". (d) Halaman baru `/syarat/` (statis, tanpa JS). (e) Footer: tautan Syarat Layanan dan anchor `#privasi`. | `Pricing.tsx`, `Faq.tsx`, `Footer.tsx`, `public/syarat/index.html`, `README.md` | Build lulus. Halaman utama dan `/syarat/` diuji di 360, 390, 1280px: 0 target di bawah 44px, tanpa overflow, console bersih. Kontras `/syarat/`: teks 7,48:1, tautan 9,53:1. Tanpa em dash. Semua tautan internal (`/#harga`, `/#privasi`) ada tujuannya. |

## Batasan dan asumsi

- **Mode baca saja untuk akhir uji coba adalah rekomendasi saya.** Pemilik bertanya "baca saja atau dikunci", dan saya memilih baca saja karena FAQ sudah menjanjikan itu untuk langganan yang habis. Ubah satu kalimat di `Pricing.tsx` dan satu butir di `public/syarat/index.html` kalau diputuskan lain.
- **Penghapusan 3 bulan** saya baca sebagai "3 bulan setelah uji coba atau langganan berakhir" (jawaban asli: "kalau sudah tidak berlangganan 3 bulan"). Perlu dikonfirmasi untuk pengguna yang hanya mencoba dan tidak pernah berlangganan.
- **Iklan:** jalurnya ditulis persis seperti jawaban pemilik ("pilih 3 pilihan"). Kalau ketiganya memang diunduh, berarti ada lebih dari satu file iklan, dan teks "3 laporan" / "tiga file" di `HowItWorks.tsx` dan `Faq.tsx` serta nama `iklan.csv` perlu disesuaikan. Belum dikonfirmasi.
- **Format file** (`.xlsx`, `.pdf`, `.csv`) tidak dikonfirmasi ulang di putaran ini.
- **Halaman Kebijakan Privasi sengaja belum dibuat.** Isinya harus mengutip klaim privasi yang sama dengan #5 dan belum bisa dibuktikan dari repo ini. Membuatnya sekarang berarti menuliskan klaim yang belum terverifikasi ke dokumen resmi.
- Halaman `/syarat/` tidak memuat pasal batas tanggung jawab, hukum yang berlaku, atau penyelesaian sengketa, karena itu tidak diberikan pemilik dan tidak boleh saya karang. Sebaiknya dibaca orang yang paham hukum sebelum tayang. Saya bukan penasihat hukum.

---

# Putaran 4: nomor 5 (verifikasi klaim privasi terhadap kode aplikasi)

Sumber: repo `harykheng/shopee-profit-calc` (commit `8b5e041`, dibaca read-only). Yang dicek adalah kode di branch utama repo itu, **bukan** instance yang sedang berjalan di produksi.

## Koreksi #2 (iklan)

Jalur Iklan diperbaiki berdasarkan `PANDUAN.md` dan parser aplikasi: hanya **Data Keseluruhan Iklan** yang wajib. **Rincian Data Iklan Produk Otomatis** hanya kalau memakai iklan produk otomatis, dan **Semua Data Grup Iklan** hanya kalau memakai grup iklan. Periode 1 bulan penuh. Versi sebelumnya (dari jawaban pemilik, "pilih 3 pilihan") terbaca seolah ketiganya wajib. Format file terkonfirmasi: pesanan `.xlsx`, penghasilan `.pdf`, iklan `.csv`.
Catatan: `PANDUAN.md` aplikasi masih menulis "Keuangan → Penghasilan Saya", sedangkan jawaban pemilik tidak memakai "Keuangan". Landing mengikuti jawaban pemilik (lebih baru); `PANDUAN.md` sebaiknya disamakan.

## Hasil per klaim

| Klaim di landing | Hasil | Bukti | Keyakinan |
|---|---|---|---|
| File dibaca di browser, file asli tidak dikirim ke server | **Terbukti** | Tidak ada `storage`, `upload`, `fetch`, atau `FormData` di `src`. Yang dikirim ke database hanya baris hasil parse lewat `supabase.rpc(...)` (`api.ts`). | Certain (kode di commit ini) |
| Kolom data pembeli (nama, alamat, HP, username, resi) tidak disimpan | **Terbukti** | Parser pesanan hanya membaca kolom yang dipetakan (`shopeeColumns.ts`). Ada test (`tests/orders.test.ts:102-110`) yang memastikan nilai kolom pribadi tidak muncul di hasil parse. | Certain |
| "tidak pernah **dibaca**" | **Berlebihan** | `XLSX.read` dan `pdf.js` memuat seluruh file ke memori browser. Kolom pribadi tidak diambil, tidak dikirim, tidak disimpan, tapi file-nya tetap terbaca oleh browser. Kalimat yang akurat: "tidak diambil, tidak dikirim, dan tidak disimpan". | Certain |
| Yang disimpan: nomor pesanan, produk, qty, status, angka penghasilan | **Tidak lengkap** | Tabel juga menyimpan variasi, SKU, status retur, waktu pesanan, subtotal per item, data iklan per produk (biaya, omzet), HPP dan biaya yang diisi pengguna, dan email login (Supabase Auth). | Certain |
| Upload file yang sama dua kali aman | **Terbukti** | `on conflict (...) do update/nothing` di fungsi upload. | Certain |
| Akun dibuat manual oleh admin | **Sesuai kode** | Tidak ada `signUp` di `src`, hanya `signInWithPassword`. README menyuruh mematikan pendaftaran publik di dashboard Supabase (setelan itu tidak bisa dicek dari repo). | Likely |
| **Data tiap toko terpisah dan hanya bisa dilihat akun toko itu** | **SALAH di kode ini** | Semua tabel: `create policy "login: akses penuh" ... for all to authenticated using (true) with check (true)`. Artinya setiap akun yang login membaca dan menulis semua toko. Tabel `stores` hanya berisi dua toko milik pemilik (`insert ... 'Harel Beauty', 'Oraiste Beauty House'`). README: "Semua akun bisa mengakses kedua toko." | Certain |
| **Setelah langganan/uji coba habis akun jadi mode baca saja** | **Tidak ada di aplikasi** | Tidak ada konsep langganan, uji coba, kedaluwarsa, atau mode baca di `src` maupun `supabase/`. Yang ada: admin bisa menghapus user (README bagian 2). | Certain |

## Dampak pada pekerjaan saya sebelumnya

Halaman `/syarat/`, kalimat akhir uji coba di `Pricing.tsx`, dan FAQ "berhenti berlangganan" yang saya tulis di putaran 3 menjanjikan **mode baca saja**. Rekomendasi itu saya buat sebelum memeriksa kode, dengan asumsi aplikasi sudah mendukungnya (FAQ lama sudah menjanjikannya). Ternyata belum. Kalimat itu tidak boleh tayang sebelum aplikasinya memang melakukannya, atau diganti dengan yang bisa dilakukan hari ini (admin menonaktifkan atau menghapus akun).

## Keputusan yang dibutuhkan

Satu pertanyaan menentukan semuanya: **apakah tiap seller baru mendapat database/instance aplikasi sendiri, atau login ke aplikasi yang sama dengan toko pemilik?**

- Instance terpisah per seller: klaim "data terpisah" benar. Yang perlu diperbaiki hanya "mode baca saja".
- Instance yang sama: seller baru bisa melihat dan mengubah data Harel Beauty dan Oraiste, dan data seller lain. Aplikasi perlu dibuat multi-toko (tabel keanggotaan dan kebijakan RLS per toko) sebelum dibuka untuk seller lain.
- Aplikasi belum siap dibuka: landing sebaiknya jadi daftar tunggu sampai siap.

Belum diubah di landing (menunggu keputusan): `Faq.tsx:26` ("Data tiap toko terpisah..."), `Pricing.tsx:8`, klaim "mode baca saja" di `Pricing.tsx`, `Faq.tsx`, `public/syarat/index.html`, serta kalimat "tidak pernah dibaca" dan daftar "Yang disimpan" di `Hero.tsx`, `Trust.tsx`, `Footer.tsx`, `Faq.tsx`.
