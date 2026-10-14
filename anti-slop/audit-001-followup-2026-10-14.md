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
