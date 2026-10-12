# HitungCuan — landing page

Landing page `hitungcuan.studioharel.id`. React + Vite + TypeScript + Tailwind CSS v4, statis (tanpa backend/database).
Pendaftaran "Coba gratis 30 hari" dikirim lewat WhatsApp — halaman ini tidak menyimpan data apa pun.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/ (sudah di-prerender jadi HTML statis)
npm run preview  # cek hasil build
```

## Animasi

Animasi memakai `framer-motion` lewat `LazyMotion` (fitur dimuat async, ±6 KB gzip terpisah dari bundle awal). Semua ada di `src/components/motion.tsx`:

- `RollingRupiah` — angka hero berputar dari 0 (HTML prerender dan mode reduced-motion memakai teks biasa).
- `Reveal` — konten muncul sekali saat masuk layar. Jangan dipakai di hero (menunda LCP).
- `Underline`, `ConnectorLine` — garis yang "digambar" saat terlihat.

Pengguna dengan pengaturan "kurangi gerakan" otomatis tidak mendapat animasi transform. Pola geraknya terinspirasi
[componentry](https://github.com/harshjdhv/componentry) (MIT): split-flap, letter-cascade, sticky-scroll-cards.

## Ganti nomor WhatsApp

Buka `src/config.ts`, ganti `WA_NUMBER`:

```ts
export const WA_NUMBER = '6281234567890' // format internasional, tanpa +, spasi, atau tanda hubung
```

Selama nomornya masih placeholder, `npm run build` menampilkan peringatan ⚠️.

## Kode sumber pendaftar (`?src=`)

Pesan WhatsApp ditutup dengan `Kode: HC-{SRC}`. `{SRC}` diambil dari parameter `?src=` (huruf besar, hanya A–Z, 0–9, `_`, `-`, maks. 24 karakter). Tanpa parameter → `HC-WEB`.

Contoh link per konten TikTok:

- `https://hitungcuan.studioharel.id/?src=tt01` → `Kode: HC-TT01`
- `https://hitungcuan.studioharel.id/?src=bio` → `Kode: HC-BIO`

## Screenshot & gambar

- Screenshot aplikasi: taruh di `public/screens/` dengan nama `rekap`, `iklan`, `simulasi`. Halaman mencoba `.webp` dulu, lalu `.png`; kalau dua-duanya belum ada, tampil placeholder abu-abu 16:10. Rasio ideal 16:10, mis. 1600×1000.
  Konversi ke webp (lebih ringan): `convert rekap.png -quality 82 rekap.webp` (ImageMagick) atau lewat squoosh.app.
- Gambar share/Open Graph: `public/og.png` (1200×630). File yang ada sekarang placeholder — ganti kapan saja dengan nama yang sama.

## Deploy ke Cloudflare

Repo ini punya `wrangler.jsonc` (aset statis dari `dist/`), jadi cocok untuk dua alur:

**Workers Builds (Create → Workers → Import a repository)** — alur yang sekarang dipakai:

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
