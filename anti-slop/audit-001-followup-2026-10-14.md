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
