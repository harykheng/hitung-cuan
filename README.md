# HitungCuan — landing page

Landing page `hitungcuan.studioharel.id`. React + Vite + TypeScript + Tailwind CSS v4, statis (tanpa backend/database),
di-prerender jadi HTML. Satu aksi: chat WhatsApp. Tidak ada form dan tidak ada data yang disimpan di halaman ini.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/ (sudah di-prerender jadi HTML statis)
npm run preview  # cek hasil build
```

## Susunan halaman

Bar atas → Hero (kartu contoh) → Masalah → **Simulator iklan** → Animasi "3 file jadi 1 jawaban" → Yang kamu dapat →
Kenapa angkanya bisa dipercaya → Siapa di balik ini → Harga dan cara mulai → FAQ → CTA penutup → Footer.
Di HP ada bar CTA bawah yang muncul setelah hero. Komponen ada di `src/components/`.

## Simulator

`src/lib/adsMath.ts` memakai rumus yang sama dengan aplikasi (`src/lib/adsMath.ts` di repo aplikasi). Jangan diubah di
sini saja: ubah dua-duanya. Persen admin 8,25% hanya **contoh**; potongan lain tetap (XTRA 4%, proses Rp1.250,
target untung 5%). Angka bawaan sudah dicek: 30.000/45.000/ROAS 6 → untung tipis Rp738, balik modal 5,46, target 7,52;
ROAS 5 → Takedown rugi Rp762; harga 59.000 → Aman, 2,87 dan 3,36.

## Animasi

Hanya `transform` dan `opacity`, tidak ada loop, tanpa dependensi animasi (CSS + `IntersectionObserver` +
`requestAnimationFrame`, lihat `src/index.css` dan `src/lib/hooks.ts`).

- Konten disembunyikan untuk animasi **hanya** kalau JavaScript jalan (`<html class="js">` di-set di `<head>`).
  Tanpa JS dan dengan `prefers-reduced-motion`, semua teks dan angka langsung tampil, tanpa confetti.
  Kalau JS aktif tetapi bundle belum berjalan setelah 4 detik (gagal muat atau jaringan lambat), skrip di `<head>`
  mencabut kelas `js` supaya semua konten tampil; `src/main.tsx` memasang `data-hc` di `<html>` begitu bundle berjalan.
- Confetti sekali per kunjungan (`src/lib/confetti.ts`).
- Semua angka demo berlabel **Contoh**. Jangan tulis angka hasil, testimonial, atau klaim yang tidak ada datanya.

## Ganti nomor WhatsApp, harga, janji balasan

Semua di `src/config.ts` (`WA_NUMBER`, `PRICE_MONTHLY`, `PRICE_YEARLY`, `TRIAL_DAYS`, `REPLY_PROMISE`).
Selama nomornya masih placeholder, `npm run build` menampilkan peringatan.

## Kode sumber (`?src=`) dan pelacakan

Pesan WhatsApp ditutup dengan `Kode: HC-{SRC}`. `{SRC}` diambil dari `?src=` (huruf besar, A–Z, 0–9, `_`, `-`, maks.
24 karakter). Tanpa parameter → `HC-WEB`. Contoh: `https://hitungcuan.studioharel.id/?src=tt01` → `Kode: HC-TT01`.

Tidak ada skrip analitik bawaan. Peristiwa dikirim lewat `src/lib/track.ts`: `cta_click` (properti `lokasi`: `bar_atas`,
`hero`, `simulator`, `harga`, `faq`, `penutup`, `bar_bawah`, `footer`), `simulator_used`, dan `scroll_depth` (25/50/75/100).
Mereka otomatis diteruskan ke `window.plausible` / `window.umami` kalau skripnya dipasang, dan selalu dikirim sebagai
`CustomEvent('hc:track')`. Cloudflare Web Analytics cocok untuk trafik per sumber, tetapi tidak menerima peristiwa kustom;
untuk `cta_click` per `lokasi`, pasang Plausible atau Umami.

CTA click rate = pengunjung unik yang menekan tombol WhatsApp ÷ pengunjung unik, dibaca **per sumber** (`?src=`).

## Halaman Syarat Layanan

`public/syarat/index.html` adalah halaman statis tanpa JavaScript (disalin apa adanya ke `dist/syarat/`), dilayani di `/syarat/`.
Harga sengaja tidak ditulis di sana; ubah aturan dan tanggal "Terakhir diperbarui" di file itu kalau kebijakannya berubah.
Halaman Kebijakan Privasi belum ada: isinya harus menunggu klaim privasi diverifikasi terhadap kode aplikasi.

## Gambar share / Open Graph

`public/og.png` (1200×630). Ganti dengan nama yang sama kapan saja.

## Deploy ke Cloudflare

Repo ini punya `wrangler.jsonc` (aset statis dari `dist/`), jadi cocok untuk dua alur:

**Workers Builds (Create → Workers → Import a repository)**:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: kosongkan.

**Pages (Create → Pages → Connect to Git):** build command `npm run build`, output directory `dist`.

Jangan hapus `wrangler.jsonc`: tanpanya, `wrangler deploy` menjalankan autoconfig yang menyisipkan
`@cloudflare/vite-plugin` ke `vite.config.ts` dan merusak langkah prerender. Versi Node dibaca dari `.node-version` (22).
Setiap push ke branch produksi otomatis deploy ulang. `public/_headers` mengatur cache aset ber-hash selama 1 tahun.

## Pasang custom domain `hitungcuan.studioharel.id`

1. Di project Cloudflare (Workers & Pages) → **Settings → Domains & Routes** (di Pages: **Custom domains**) → **Set up a custom domain** → isi `hitungcuan.studioharel.id`.
2. Kalau DNS `studioharel.id` sudah dikelola Cloudflare: klik **Activate domain**, record CNAME dibuat otomatis.
3. Kalau DNS di penyedia lain: tambahkan record
   `CNAME  hitungcuan  →  <nama-project>.pages.dev`
   di penyedia DNS-mu, lalu tunggu status di Cloudflare jadi **Active** (SSL otomatis).

URL kanonik dan Open Graph (`index.html`) sudah menunjuk ke `https://hitungcuan.studioharel.id/`.
