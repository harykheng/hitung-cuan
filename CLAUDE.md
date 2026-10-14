# HitungCuan (landing)

Landing page `hitungcuan.studioharel.id`: React + Vite + TypeScript + Tailwind CSS v4, statis, di-prerender jadi HTML.
Satu aksi utama: chat WhatsApp. Detail pemakaian dan deploy ada di `README.md`.

## Perintah

- `npm run dev` untuk pengembangan.
- `npm run build` menjalankan `tsc --noEmit`, build Vite, build SSR, lalu prerender. Harus lulus sebelum commit.
- Tidak ada test otomatis. Verifikasi UI dengan menjalankan hasil build di browser (lebar 320 sampai 1440px).

## Arah desain

Untuk pekerjaan UI, teks, atau tata letak, baca **`DESIGN.md`** lebih dulu. Itu sumber arah desain landing ini: token, aturan
lime, tipografi, gerak, suara, aksesibilitas, dan dial.

- Bagian **Dial** di `DESIGN.md` masih **inferensi** dan belum dikonfirmasi pemilik. Jangan menganggapnya final.
- Kalau token di `src/index.css` berubah, ubah frontmatter `DESIGN.md` juga. Nilainya harus identik.
- Arah desain mengikuti `DESIGN.md` aplikasi di repo `harykheng/shopee-profit-calc`. Kalau keduanya berbeda, tanyakan ke pemilik.

## Isi yang tidak boleh diubah sendiri

- **Klaim privasi, keamanan, dan hukum** (Hero, Trust, FAQ, footer, `public/privasi/index.html`, `public/syarat/index.html`) harus
  dicocokkan dulu dengan kode aplikasi (`shopee-profit-calc`). Jangan menulis klaim yang belum terbukti di sana.
- **Janji operasional** di halaman dikerjakan manual oleh pemilik (menonaktifkan akun di akhir uji coba, menghapus data 3 bulan
  setelah berhenti berlangganan). Ubah teksnya hanya bersama keputusan pemilik.
- **Angka demo** wajib berlabel "Contoh". Jangan menulis angka hasil, testimoni, atau statistik tanpa sumber.
- **Harga, masa uji coba, nomor WhatsApp** ada di `src/config.ts`. Halaman statis di `public/` sengaja tidak menyebut harga.
- Jangan menghapus `wrangler.jsonc` atau blok `previews` di dalamnya: tanpa blok itu build branch dan pull request di Cloudflare gagal (lihat `README.md`).

## Riwayat audit

`anti-slop/audit-001-2026-10-14.md` memuat 19 temuan, dan `anti-slop/audit-001-followup-2026-10-14.md` memuat perbaikan, bukti,
serta batasannya. Baca keduanya sebelum membongkar keputusan yang sudah diambil di sana.

<!-- antislop:start -->
## antislop

Skill antislop (repo `miqdadbadjuber/anti-slop`) belum terpasang di repo ini, jadi tidak ada berkas skill yang bisa ditunjuk.
Audit 001 memakainya dari salinan sementara di luar repo.

Untuk memasangnya, pemilik menjalankan `npx antislop-ai` sendiri (agen tidak mengunduh skill). Installer akan menimpa blok ini
dengan pointer yang benar. Pointer `DESIGN.md` di atas berada di luar blok ini, jadi tidak ikut tertimpa.

Sampai terpasang, rujukannya adalah `DESIGN.md` dan dua laporan audit di atas.
<!-- antislop:end -->
