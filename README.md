# HitungCuan — landing page

Landing page `hitungcuan.studioharel.id`. React + Vite + TypeScript + Tailwind CSS v4, statis (tanpa backend/database).
Pendaftaran "Coba gratis 30 hari" dikirim lewat WhatsApp — halaman ini tidak menyimpan data apa pun.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/ (sudah di-prerender jadi HTML statis)
npm run preview  # cek hasil build
```

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

## Deploy ke Cloudflare Pages

1. Push repo ini ke GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pilih repo `hitung-cuan`.
3. Pengaturan build:
   - Framework preset: **None** (atau Vite)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Versi Node dibaca dari `.node-version` (22).
4. **Save and Deploy**. Setiap push ke `main` otomatis deploy ulang; branch lain dapat URL preview.

`public/_headers` mengatur cache: aset ber-hash di `/assets/*` di-cache 1 tahun.

## Pasang custom domain `hitungcuan.studioharel.id`

1. Di project Pages → **Custom domains** → **Set up a custom domain** → isi `hitungcuan.studioharel.id`.
2. Kalau DNS `studioharel.id` sudah dikelola Cloudflare: klik **Activate domain**, record CNAME dibuat otomatis.
3. Kalau DNS di penyedia lain: tambahkan record
   `CNAME  hitungcuan  →  <nama-project>.pages.dev`
   di penyedia DNS-mu, lalu tunggu status di Cloudflare jadi **Active** (SSL otomatis).

URL kanonik dan Open Graph (`index.html`) sudah menunjuk ke `https://hitungcuan.studioharel.id/`.
