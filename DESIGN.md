---
name: HitungCuan (landing)
description: Halaman landing satu aksi untuk seller Shopee yang beriklan. Jawaban dulu sebagai kalimat besar di bidang indigo, hitungan di lembar putih, satu tombol WhatsApp.
colors:
  field: "#2b2fa6"
  field-deep: "#1d2079"
  night: "#14165a"
  field-soft: "#a9adeb"
  paper: "#ffffff"
  canvas: "#f6f7fc"
  tint: "#e9ecfb"
  line: "#d9dcf3"
  control: "#7f7f94"
  ink: "#16173d"
  ink-2: "#4a4d78"
  ink-3: "#5c5f89"
  on-field: "#f6f4ff"
  on-field-muted: "#c3c5f2"
  lime: "#d7f45a"
  btn: "#2b2fa6"
  loss: "#c4361e"
  gain: "#146c43"
  sun: "#f5d547"
  sun-ink: "#4a3200"
typography:
  h1:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.6rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontFeature: "tnum"
  h2:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
    fontFeature: "tnum"
  h3:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "tnum"
  small:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  tag: "6px"
  file: "8px"
  control: "12px"
  callout: "16px"
  sheet: "24px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-wide: "24px"
  container: "72rem"
  section-sm: "40px"
  section-md: "56px"
  section-lg: "64px"
components:
  cta:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "56px"
  cta-small:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
  ghost-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-field}"
    rounded: "{rounded.pill}"
    height: "48px"
  sticker-positive:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.field-deep}"
    rounded: "{rounded.tag}"
  sticker-loss:
    backgroundColor: "{colors.loss}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tag}"
  sticker-warn:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.sun-ink}"
    rounded: "{rounded.tag}"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "28px"
  control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "48px"
---

# Design System: HitungCuan (landing)

## Arah

Landing ini mengikuti arah "Cerita Bulan Ini" dari `DESIGN.md` aplikasi (repo `shopee-profit-calc`): jawaban datang lebih dulu sebagai kalimat besar di satu bidang indigo yang penuh, lalu hitungannya muncul di lembar putih. Contohnya di halaman ini: judul hero berupa dua pertanyaan, kartu "Agustus 2026, toko kamu untung Rp3,42 juta" di atas lembar putih, dan nota hasil yang "tercetak" baris demi baris.

Halaman ini hanya punya satu aksi utama, yaitu chat WhatsApp (README). Semua yang lain (simulator, FAQ, tautan Syarat dan Privasi) mendukung keputusan itu.

**Design Read:** halaman penjualan satu aksi untuk seller Shopee yang beriklan, dalam gaya bidang indigo + lembar putih + stiker stempel miring, dial ENERGY 3 / RHYTHM 2 / MOTION 2.

## Sumber dan siapa yang menulis

Dokumen ini ditulis oleh Claude pada 14 Oktober 2026 sebagai bagian dari audit antislop, **bukan dari brief baru dari pemilik**. Isinya hanya mentranskripsikan tiga sumber:

1. `DESIGN.md` dan `PRODUCT.md` aplikasi. Arah di dokumen itu dipilih pemilik dari tiga pratinjau (Resi & Kardus, Cerita Bulan Ini, Papan Toko).
2. Kode landing yang sudah ada: `src/index.css` (token), `src/components/*` (komponen), `README.md`.
3. Perbaikan audit nomor 10 sampai 15 yang disetujui pemilik (lime hanya untuk peran tertentu, tanpa garis samping, bidang hero datar). Pilihan teknis di dalamnya, seperti menghapus gradasi hero, saya putuskan berdasarkan aturan `DESIGN.md` aplikasi dan `og.png`, dan belum dikonfirmasi satu per satu.

Bagian bertanda **[diinferensi]** adalah bacaan saya atas kode yang ada, bukan keputusan pemilik: hanya dial di bawah. Pemilik perlu mengonfirmasi atau mengubahnya. Kalau arah desain landing berbeda dari aplikasi, dokumen inilah yang diubah lebih dulu, baru kodenya.

## Dial [diinferensi]

Dial: ENERGY 3 / RHYTHM 2 / MOTION 2

- **ENERGY 3.** Hero dan penutup berupa bidang indigo jenuh, judul tampilan 800 setinggi 3,6 rem, baris jawaban berwarna lime, stiker stempel miring, dan satu ledakan confetti. Bagian isi di antaranya tenang (lembar putih, teks polos), jadi nilai 3 terutama berlaku untuk hero dan penutup.
- **RHYTHM 2.** Grid, container, dan tangga jarak konsisten. Komposisi bagian berbeda-beda secara sengaja: kalimat besar (Masalah), alat (Simulator), langkah + demo (Cara Kerja), baris bergantian (Hasil), dua kolom (Trust, Harga), satu pernyataan (Pembuat), akordeon (FAQ). Ukuran jarak ada tiga (`sm`, `md`, `lg`) dan nada latar bergantian paper, tint, canvas.
- **MOTION 2.** Gerak menandai jawaban yang datang atau status yang berubah (lihat bagian Gerak). Tidak ada paralaks, tidak ada koreografi gulir, tidak ada gerak yang berulang tanpa henti.

## Warna

**Aturan bidang dan lembar.** Teks langsung di atas bidang indigo memakai `on-field` atau `on-field-muted`. Teks di lembar terang memakai skala `ink`. Jangan menaruh teks `ink` di bidang indigo, dan jangan menaruh `on-field` di lembar putih. Token nada (`.tone-light`, `.tone-dark`) mengatur ini per bagian.

**Tiga kelompok, tidak lebih** (batas R-29; alasan lengkap ada di komentar `src/index.css`):

- **Inti: indigo.** `field` (hero dan aksen di permukaan terang), `field-deep` (bar atas, penutup, kartu demo), `night` (footer), `field-soft` (bagian "Biaya" pada batang di kartu contoh). Netral bernuansa indigo: `paper`, `canvas`, `tint`, `line`, `control`.
- **Satu aksen: `lime`.** Hanya untuk: baris jawaban di judul hero dan angka hasil di demo, kicker (baris kecil di atas judul hero), stiker bernada positif (Angka final, Aman, Hero), cincin fokus di permukaan gelap, aksen logo ("Cuan"), dan tombol WhatsApp. Peran terakhir adalah tambahan khusus landing karena ini satu-satunya aksi utama halaman. Di luar peran itu, teks dan garis di permukaan gelap memakai `on-field` atau `on-field-muted`.
- **Status, satu sistem dengan arti tetap:** `loss` (rugi, Takedown), `gain` (untung), `sun` (perlu perhatian, "ROAS terlalu kecil"). Status selalu disertai kata atau ikon, tidak pernah hanya warna.

**Batas kontrol** (`control`, #7f7f94) dipakai untuk border input dan tombol bergaris di permukaan terang. Kontrasnya 3,9:1 terhadap putih (syarat WCAG 1.4.11 adalah 3:1). Jangan memakai `ink` dengan opasitas rendah untuk batas kontrol.

Semua pasangan teks harus lulus 4,5:1 (3:1 untuk teks 18px ke atas). Hitung dengan `skills/antislop-human/contrast-check.py` dari repo antislop, jangan dikira-kira.

## Tipografi

- **Tampilan: Bricolage Grotesque** (800, 700) untuk judul, kalimat jawaban, angka besar, nama merek, dan stiker. Alasannya sama dengan aplikasi: bobotnya tebal dan angkanya jelas dibaca besar ("Rp3,42 juta").
- **Isi: Public Sans** (400, 600) untuk semua teks lain. Polos, nyaman dibaca panjang, dan punya angka tabular (`tnum` aktif di seluruh halaman) supaya kolom rupiah rata.
- Keduanya dimuat dari server sendiri lewat `@fontsource`, tanpa layanan font luar.
- Ukuran judul turun di layar kecil: h1 2,6 rem, 3,75 rem (sm), 3,6 rem (lg); h2 1,875 rem, 2,25 rem (sm), 2,75 rem (lg). Tabel di frontmatter menyimpan ukuran desktop.
- Stiker memakai huruf kapital dengan jarak huruf `tracking-wide` (sedang, bukan lebar ekstrem).

## Tata letak

- Container maksimal `72rem`, gutter 16px (sm ke atas 24px).
- **Urutan bagian** (mengikuti `src/App.tsx`): bar atas, hero (indigo), Masalah (paper, `lg`), Simulator (tint, `md`), Cara Kerja (paper), Hasil yang kamu dapat (canvas, `lg`), Kenapa angkanya bisa dipercaya (paper), Siapa di balik ini (canvas, `sm`), Harga (tint), FAQ (paper), penutup (field-deep), footer (night).
- **Ritme jarak** (`size` pada komponen `Section`): `sm` 40/56/64px, `md` 56/80/96px, `lg` 64/96/128px (mobile / sm / lg). `lg` untuk bagian berisi kalimat besar atau baris tinggi, `sm` untuk bagian yang hanya satu pernyataan, `md` untuk sisanya.
- **Titik patah:** satu kolom di bawah 768px. Bagian Hasil, Simulator, Cara Kerja, Harga, dan Trust menjadi dua kolom dengan jarak rapat dari 768px (`md`), lalu proporsi desktop dari 1024px (`lg`). Hero baru dua kolom dari 1024px. Halaman harus utuh dari 320px sampai 1440px tanpa gulir horizontal.
- Navigasi hanya logo dan satu tombol. Tidak ada menu. Di HP muncul bar CTA bawah setelah hero lewat, dan fokus keyboard tidak boleh berakhir di balik bar itu.

## Kedalaman

Dua tingkat: permukaan halaman, dan lembar di atasnya dengan **satu bayangan lembut** (`--shadow-sheet`). Dipakai di simulator, ketiga mock hasil, kartu harga, dan kartu demo. Elemen lain datar. Tanpa lembar di dalam lembar.

Pengecualian yang disengaja: tombol WhatsApp dan kartu hero memakai bayangan keras setebal 3px dan 8px ("tepi kertas"), selaras dengan stiker yang miring.

## Bentuk

Pil (9999px) untuk tombol, tautan sekunder, penanda "Contoh", dan sakelar. 24px untuk lembar. 16px untuk blok penegasan. 12px untuk input dan tombol +/-. 8px untuk tombol berkas. 6px untuk stiker. Variasi radius dipakai sebagai penanda jenis elemen, bukan hiasan.

## Komponen

- **CTA WhatsApp:** pil lime, teks dan garis tepi `ink`, tinggi 56px (44px untuk bar atas), bayangan keras 3px yang menekan saat ditekan. Hanya aksi WhatsApp yang boleh tampak seperti ini. Tautan lain memakai **ghost link** (garis tepi transparan, tinggi 48px) atau tautan teks.
- **Stiker:** huruf tampilan 800, kapital, miring sekitar 3 sampai 4 derajat, selalu memuat kata dan ikon. Positif = lime di atas teks `field-deep` dengan centang (Angka final, Aman, Hero). Rugi = `loss` dengan teks putih dan tanda silang (Takedown). Perhatian = `sun` dengan teks `sun-ink` dan segitiga (ROAS terlalu kecil).
- **Penanda "Contoh":** pil bergaris kapital. Wajib ada di setiap angka demo.
- **Lembar:** `paper`, 24px, `--shadow-sheet`. Lembar di permukaan terang memakai cincin 1px `line`, kartu demo gelap tidak.
- **Kontrol:** input dan tombol bergaris memakai batas `control`, tinggi minimal 44px (input 48px), cincin fokus 3px (lime di permukaan gelap, indigo di permukaan terang).
- **Ikon:** satu keluarga garis (viewBox 24, tebal 2 sampai 2,5, ujung bulat) di `src/components/ui.tsx`. Tanpa emoji atau glyph unicode sebagai ikon. Relevansi tiap ikon tertulis di komentar file itu.

## Gerak

Gerak menandai jawaban yang datang atau status yang berubah. Semuanya hanya `transform` dan `opacity`, tanpa pustaka animasi, dan mati total di bawah `prefers-reduced-motion`.

- Kata di judul hero naik satu per satu, jeda 55ms.
- Angka hasil menghitung naik ke nilainya (700ms).
- Batang "Dari setiap Rp100" tumbuh dari kiri, dan stiker "tersetempel" saat muncul.
- Nota hasil "tercetak" baris demi baris saat digulir ke layar (`data-reveal`, dipakai hanya di nota hasil dan stiker iklan).
- Confetti satu kali per kunjungan, dari stiker "Angka final".
- Konten hanya disembunyikan untuk animasi kalau JavaScript benar-benar jalan. Kalau bundle belum berjalan setelah 4 detik, semua konten ditampilkan.

## Suara dan isi

- Bahasa Indonesia sehari-hari, memanggil pembaca "kamu". Rupiah ditulis `Rp1.250.000`, dan `Rp3,42 juta` untuk angka besar.
- Istilah mengikuti glosarium aplikasi: HPP, ROAS nyata, Balik modal, Takedown, Hero, Angka final.
- Tidak ada em dash di teks yang tampil (R-02).
- Setiap angka demo berlabel **Contoh**. Dilarang menulis angka hasil, testimoni, atau klaim yang tidak ada datanya (README, R-17, R-18, R-36). Setiap klaim privasi harus dicocokkan dulu dengan kode aplikasi.
- CTA spesifik pada aksinya ("Minta uji coba gratis lewat WhatsApp"), bukan "Mulai" atau "Pelajari".
- FAQ hanya memuat pertanyaan yang spesifik untuk produk ini. Jangan menambah pertanyaan templat.

## Aksesibilitas

- Target sentuh minimal 44px, termasuk tautan teks (lihat `src/components/Footer.tsx`).
- Skip link "Lewati ke konten utama" sebagai elemen pertama, `<h1>` di dalam `<main>`, bar atas sebagai `<header>`.
- Indikator fokus terlihat di setiap elemen interaktif, kontras minimal 3:1 terhadap latar.
- Pesan galat berupa teks, bukan hanya warna, dan menyebut nilai yang sedang dipakai.

## Do dan Don't

### Do
- **Do** menjawab dengan kalimat di bidang indigo sebelum menunjukkan hitungannya, dan memberi angka pasti tepat setelah angka bulat.
- **Do** menaruh isi kerja di lembar putih dan membungkus teks di bidang indigo dengan nada `tone-dark`.
- **Do** mengikat gerak baru pada perubahan status, dan menambahkannya ke blok `prefers-reduced-motion`.
- **Do** memperbarui `public/syarat/index.html` dan `public/privasi/index.html` (beserta tanggal "Terakhir diperbarui") kalau kebijakan atau data yang disimpan berubah.

### Don't
- **Don't** menambah garis samping berwarna, lembar di dalam lembar, atau gradasi.
- **Don't** memakai lime di luar peran di bagian Warna, atau menambah warna di luar tiga kelompok.
- **Don't** memasang cookie, penyimpanan lokal, analitik, atau skrip pihak ketiga tanpa memperbarui `/privasi/` terlebih dulu.
- **Don't** memakai emoji atau glyph unicode sebagai ikon atau penanda status.
- **Don't** membuat gerak yang berulang tanpa henti, atau confetti untuk hal selain hasil yang benar-benar muncul.
- **Don't** menganggap bagian "Dial" sudah final sebelum pemilik mengonfirmasinya.
