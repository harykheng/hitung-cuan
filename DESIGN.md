---
name: HitungCuan (landing)
description: Halaman landing satu aksi untuk seller Shopee yang beriklan. Jawaban dulu sebagai kalimat besar di bidang terang hangat, hitungan di lembar putih, satu tombol WhatsApp.
colors:
  canvas: "#fffbf6"
  paper: "#ffffff"
  tint: "#f7f1e8"
  line: "#ece2d4"
  control: "#8a8178"
  ink: "#1c1917"
  ink-2: "#57534e"
  ink-3: "#6f6860"
  night: "#2a2623"
  night-deep: "#1c1917"
  on-night: "#fffbf6"
  on-night-muted: "#d6cfc4"
  ember: "#2b3a9e"
  ember-text: "#2b3a9e"
  peach: "#dde2fa"
  mintbg: "#ddf3e9"
  loss: "#c4361e"
  gain: "#146c43"
  sun: "#f5d547"
  sun-ink: "#4a3200"
typography:
  h1:
    fontFamily: "Parkinsans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.6rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "Parkinsans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Parkinsans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "tnum"
  small:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
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
    backgroundColor: "{colors.ember}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "56px"
  cta-small:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "44px"
  sticker-positive:
    backgroundColor: "{colors.mintbg}"
    textColor: "{colors.gain}"
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

Struktur arahnya tetap "Cerita Bulan Ini" dari `DESIGN.md` aplikasi (repo `shopee-profit-calc`): jawaban datang lebih dulu sebagai kalimat besar, lalu hitungannya muncul di lembar putih. Contohnya di halaman ini: judul hero berupa satu pertanyaan dengan kata seller ("Tokomu sebenarnya cuan atau boncos?"), kartu "Toko kamu untung bersih Rp3,42 juta" dengan dua baris iklan (Takedown, Hero) di atas lembar putih, dan nota hasil yang "tercetak" baris demi baris.

**Kulitnya berubah dua kali.** Versi pertama memakai indigo jenuh, lime, dan Bricolage Grotesque, yang menurut pemilik terasa terlalu AI. Versi kedua, "Dapur Terang", menggantinya dengan krem hangat, tinta, satu aksen oranye, Parkinsans, dan Plus Jakarta Sans.

**Keputusan pemilik, 15 Okt 2026: aksen kembali ke indigo, oranye dibuang sebagai warna merek.** Alasannya, oranye terbaca sebagai bagian dari Shopee, padahal halaman ini menyatakan "Bukan produk resmi Shopee" dan menjual alat yang mengaudit iklan seller di Shopee. Indigo dipilih karena aplikasi `shopee-profit-calc` sudah memakainya, jadi aksen landing kini **sejalan dengan aplikasi**. Alasan lama membuang indigo (kombinasi indigo gelap, lime, dan Bricolage Grotesque yang terasa "AI") tidak berlaku untuk indigo di atas krem tanpa lime. Yang tidak berubah: latar krem, kedua font, dan semua warna status. Yang masih berbeda dari aplikasi: latar krem dan font landing, serta lime yang masih dipakai aplikasi (landing tidak memakainya).

Nama token `ember`, `ember-text`, dan `peach` sengaja dipertahankan demi diff kecil, tetapi **nilainya sekarang indigo**. Mengganti nama menjadi netral adalah pekerjaan terpisah.

Halaman ini hanya punya satu aksi utama, yaitu chat WhatsApp (README). Semua yang lain (simulator, FAQ, tautan Syarat dan Privasi) mendukung keputusan itu.

**Design Read:** halaman penjualan satu aksi untuk seller Shopee yang beriklan, dalam gaya dapur terang (krem hangat + tinta + satu aksen indigo + stiker stempel miring), dial ENERGY 2 / RHYTHM 2 / MOTION 2.

## Sumber dan siapa yang menulis

Dokumen ini ditulis oleh Claude sebagai bagian dari audit antislop dan pengerjaan arah baru, **bukan dari brief tertulis pemilik**. Isinya mentranskripsikan empat sumber:

1. `DESIGN.md` dan `PRODUCT.md` aplikasi (struktur "jawaban dulu, hitungan di lembar", aturan gerak, aturan tanpa garis samping).
2. Kode landing yang sudah ada (`src/index.css`, `src/components/*`, `README.md`).
3. Perbaikan audit nomor 10 sampai 15 yang disetujui pemilik.
4. **Varian C "Dapur Terang" dari proposal "Ordi Tiga Arah"** (berkas yang diberikan pemilik pada 15 Okt 2026).

**Yang diambil dari varian C:** palet netral (krem `#fffbf6`, tinta `#1c1917`, mint), pasangan font (Parkinsans untuk judul, Plus Jakarta Sans untuk isi), bayangan lembut, dan sorotan di baris jawaban. Aksen oranye varian C sudah digantikan indigo pada 15 Okt 2026 (lihat Arah).

**Yang sengaja tidak diambil**, karena bertentangan dengan aturan antislop dan dengan Don't di bawah: blob radial yang melayang, cahaya yang mengikuti kursor, kartu yang bergoyang tanpa henti dan miring mengikuti kursor, lencana berbentuk pil bertitik di atas judul, kartu pastel (peach, mint, butter, lilac) sebagai hiasan, dan nama serta isi produk Ordi. Proposal itu sendiri menilai varian C "paling dekat dengan gaya aplikasi pada umumnya".

Koreksi dari hitungan kontras (`contrast-check.py`) atas nilai di proposal yang masih berlaku: hijau status memakai `gain` (5,55:1 di atas `mintbg`; mint `#1f8a62` bawaan proposal hanya 3,71:1). Dua koreksi lain khusus oranye (tinta di atas ember, dan teks oranye gelap untuk permukaan terang) sudah tidak berlaku sejak aksen menjadi indigo.

Bagian bertanda **[diinferensi]** adalah bacaan saya, bukan keputusan pemilik: hanya dial di bawah. Sejak 15 Okt 2026 aksen landing **sejalan dengan aplikasi** (indigo). Selisih yang tersisa adalah latar krem, font, dan lime di aplikasi. Pemilik perlu memutuskan apakah aplikasi ikut dibersihkan dari lime atau perbedaan ini disengaja. Kalau arah berubah lagi, dokumen inilah yang diubah lebih dulu, baru kodenya.

## Dial [diinferensi]

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2

- **ENERGY 2.** Hero kini terang dan tenang. Yang paling keras tinggal judul Parkinsans 800 setinggi 3,6 rem, frasa jawaban bertinta dengan sorotan peach, dan tombol ember. Confetti dan judul yang naik per kata sudah dibuang. Sebelumnya (bidang indigo jenuh) nilainya 3.
- **RHYTHM 2.** Grid, container, dan tangga jarak konsisten. Komposisi bagian berbeda-beda secara sengaja: kalimat besar (Masalah), alat (Simulator), baris bergantian (Hasil), cerita pembuat + daftar bukti (Tentang), langkah bernomor (Cara Kerja), dua kolom (Harga), akordeon (FAQ). Ukuran jarak ada tiga (`sm`, `md`, `lg`) dan nada latar bergantian paper, tint, canvas.
- **MOTION 2.** Gerak menandai jawaban yang datang atau status yang berubah (lihat bagian Gerak). Tidak ada paralaks, koreografi gulir, atau gerak yang berulang tanpa henti.

## Warna

**Aturan permukaan.** Teks di permukaan terang memakai skala `ink`. Teks di permukaan gelap (`night`, `night-deep`) memakai `on-night` atau `on-night-muted`. Jangan menaruh `ink` di permukaan gelap atau `on-night` di permukaan terang. Token nada (`.tone-light`, `.tone-dark`) mengatur ini per bagian.

**Tiga kelompok, tidak lebih** (batas R-29; alasan lengkap ada di komentar `src/index.css`):

- **Inti: netral hangat.** `canvas` (halaman dan hero), `paper` (lembar), `tint` (bagian bergantian), `line` (garis), `control`, dan skala `ink`, `ink-2`, `ink-3`. Dua permukaan gelap: `night` (penutup, bar CTA bawah) dan `night-deep` (footer).
- **Satu aksen: indigo**, bernama token `ember` (nama lama, nilainya `#2b3a9e`), dengan turunannya: `ember-text` (`#2b3a9e`, teks dan ikon aksen di permukaan terang), `peach` (`#dde2fa`, tint indigo untuk sorotan di baris jawaban; bukan warna hangat lagi, jangan dipakai sebagai latar kategori), dan `mintbg` (latar stiker positif, bukan indigo). Di permukaan gelap aksen memakai `#b7c0ff` (`--accent` dan `--focus` di `.tone-dark`, belum menjadi token). Peran aksen: latar tombol WhatsApp (teks putih), angka hasil di permukaan gelap, aksen logo ("Cuan"), dan cincin fokus. `ember-text` dipakai untuk kicker, tautan, dan ikon aksen di permukaan terang. Jangan menaruh `ember-text` di permukaan gelap: indigo hanya 1,57:1 terhadap `night`.
- **Status, satu sistem dengan arti tetap:** `loss` (rugi, Takedown), `gain` (untung, stiker positif), `sun` (perlu perhatian, "ROAS terlalu kecil"). Status selalu disertai kata atau ikon, tidak pernah hanya warna. **Aksen tidak pernah dipakai sebagai warna status.** Indigo (rona 232 derajat) jauh dari semua warna status: 80 derajat dari `gain` (152), 137 dari `loss` (9), 177 dari `sun` (49), jadi tidak ada risiko tertukar. Aturannya tetap berlaku supaya arti status tidak kabur: indigo tidak pernah berarti rugi, untung, atau perlu perhatian. Kuning (`sun`) hanya berarti "perlu perhatian", bukan hiasan. Satu pengecualian yang tercatat: tanda merek buatan pemilik (ikon, favicon, logo di `assets/`) memakai kuning `#fbe38a`, dan `#e0b422` di versi untuk latar gelap. Itu bukan token dan bukan status, melainkan bagian dari logo, bukan hiasan halaman. Berkas logo untuk latar gelap juga memakai `#b7c0ff` untuk kata "Cuan", sama dengan aksen `.tone-dark`.

**Kontras pasangan aksen** (dihitung dengan skrip WCAG 2.x, 15 Okt 2026): `ember-text` di atas `canvas` 9,26:1, `paper` 9,54:1, `tint` 8,49:1, dan di atas sorotan `peach` 7,42:1. Putih di atas `ember` 9,54:1. `#b7c0ff` di atas `night` 8,57:1 dan `night-deep` 9,99:1. Garis `on-night` di atas `night` 14,56:1.

**Batas kontrol** (`control`, #8a8178) dipakai untuk border input dan tombol bergaris di permukaan terang. Kontrasnya 3,8:1 terhadap putih (syarat WCAG 1.4.11 adalah 3:1).

Semua pasangan teks harus lulus 4,5:1 (3:1 untuk teks 18px ke atas). Hitung dengan `skills/antislop-human/contrast-check.py` dari repo antislop, jangan dikira-kira.

## Tipografi

- **Tampilan: Parkinsans** (700, 800) untuk judul, kalimat jawaban, angka besar tunggal, nama merek, dan stiker. Kalimat panjang (cerita pembuat, pernyataan privasi) dan pertanyaan FAQ memakai font isi: deretan baris tebal 800 membuat semuanya berteriak. Bersih tapi ramah, dan tidak dikenali sebagai font bawaan halaman buatan AI seperti Bricolage Grotesque 800 (alasan yang sama ditulis proposal).
- **Isi: Plus Jakarta Sans** (400, 600, 700) untuk semua teks lain. Huruf buatan Indonesia, tidak terasa templat di ukuran kecil, dan punya angka tabular.
- **Angka di kolom memakai Plus Jakarta Sans.** Angka Parkinsans proporsional (lebar "1111111111" 180px, "0000000000" 210px), jadi hanya dipakai untuk angka tunggal besar (hero, harga, total nota).
- Keduanya dimuat dari server sendiri lewat `@fontsource`, tanpa layanan font luar.
- Ukuran judul turun di layar kecil: h1 2,6 rem, 3,75 rem (sm), 3,6 rem (lg); h2 1,875 rem, 2,25 rem (sm), 2,75 rem (lg). Tabel di frontmatter menyimpan ukuran desktop.
- Stiker memakai huruf kapital dengan jarak huruf `tracking-wide` (sedang, bukan lebar ekstrem).

## Tata letak

- Container maksimal `72rem`, gutter 16px (sm ke atas 24px).
- **Urutan bagian** (mengikuti `src/App.tsx`): bar atas (terang), hero (canvas), Masalah (paper, `lg`), Simulator (tint, `md`), Hasil yang kamu dapat (canvas, `lg`), Tentang: siapa pembuatnya dan kenapa angkanya bisa dipercaya (paper), Cara Kerja (canvas), Harga (tint), FAQ (paper), penutup (night), footer (night-deep). Urutannya: masalah, coba sendiri, lihat hasilnya, siapa pembuatnya, baru cara mulai dan harga. Orang tidak perlu membaca cara daftar sebelum tahu apa yang didapat.
- **Ritme jarak** (`size` pada komponen `Section`): `sm` 40/56/64px, `md` 56/80/96px, `lg` 64/96/128px (mobile / sm / lg). `lg` untuk bagian berisi kalimat besar atau baris tinggi, `md` untuk sisanya. `sm` tersedia untuk bagian yang hanya satu pernyataan (saat ini tidak dipakai, sejak bagian Pembuat digabung ke Tentang).
- **Titik patah:** satu kolom di bawah 768px. Masalah menjadi tiga kolom dari 1024px (garis tinta di atas tiap kolom), supaya separuh kanan layar desktop tidak kosong. Bagian Hasil, Simulator, Cara Kerja, Harga, dan Tentang menjadi dua kolom dengan jarak rapat dari 768px (`md`), lalu proporsi desktop dari 1024px (`lg`). Hero baru dua kolom dari 1024px. Halaman harus utuh dari 320px sampai 1440px tanpa gulir horizontal.
- Navigasi hanya logo dan satu tombol. Tidak ada menu. Di HP muncul bar CTA bawah setelah hero lewat, dan fokus keyboard tidak boleh berakhir di balik bar itu.

## Kedalaman

Dua tingkat: permukaan halaman, dan lembar di atasnya dengan **satu bayangan lembut** (`--shadow-sheet`, nilainya dari varian C). Dipakai di simulator, ketiga mock hasil, kartu harga, dan kartu hero. Elemen lain datar, termasuk tombol WhatsApp (hanya garis tepi 2px). Tanpa lembar di dalam lembar. Bayangan keras berwarna tinta ("tepi kertas") sudah dibuang (commit terpisah, boleh dibatalkan): menurut pemilik gaya itu ikut membuat halaman terasa seperti templat.

## Bentuk

Pil (9999px) untuk tombol, tautan sekunder, penanda "Contoh", dan sakelar. 24px untuk lembar. 16px untuk blok penegasan. 12px untuk input dan tombol +/-. 8px untuk tombol berkas. 6px untuk stiker. Variasi radius dipakai sebagai penanda jenis elemen, bukan hiasan.

## Komponen

- **CTA WhatsApp:** pil indigo (`ember`) dengan teks putih (9,54:1), tinggi 56px (44px untuk bar atas), turun 1px saat ditekan, tanpa bayangan. Garis tepi 2px hanya di permukaan gelap: `on-night` (indigo hanya 1,57:1 terhadap `night`, garis `on-night` 14,56:1, jadi batas tombol tetap terlihat di penutup dan bar CTA bawah). Di permukaan terang garisnya transparan, karena indigo sendiri sudah 9,26:1 terhadap `canvas` dan garis tinta memberi kesan templat. Hover memakai indigo sedikit lebih terang (`#3546b5`, putih di atasnya 7,79:1). Teks tinta di atas indigo gagal kontras (1,83:1), jangan dipakai. Hanya aksi WhatsApp yang boleh tampak seperti ini. Label pendek supaya satu baris di HP ("Coba gratis 30 hari", "Coba gratis" di bar atas), dengan logo WhatsApp di semua lebar layar dan teks tersembunyi "lewat WhatsApp" untuk pembaca layar. Tautan lain memakai tautan teks (garis bawah, tinggi minimal 44px), termasuk "Atau cek 1 iklanmu dulu, tanpa chat" di hero.
- **Ringkasan simulator (HP):** di bawah 768px, hasil simulator berada di bawah input. Ringkasan putusan (stiker dan untung/rugi per order) menempel di bawah bar atas selama kolom input digulir. Latar `tint` tanpa bayangan supaya tidak menjadi lembar di dalam lembar. Hanya tampilan (`aria-hidden`); hasil untuk pembaca layar ada di `role="status"`.
- **Bantuan WhatsApp di browser bawaan aplikasi** (`InAppWaHelp`): hanya muncul di browser bawaan TikTok, Threads/Instagram, Facebook, LINE, dan WebView, karena browser itu sering menahan tautan `wa.me`. Isinya petunjuk membuka halaman di browser dan tombol "Salin nomor admin". Ada di hero, penutup, dan (versi ringkas) bar CTA bawah.
- **Stiker:** huruf tampilan 800, kapital, miring sekitar 3 sampai 4 derajat, selalu memuat kata dan ikon. Positif = `mintbg` dengan teks dan garis `gain` dan centang (Angka final, Aman, Hero). Rugi = `loss` dengan teks putih dan tanda silang (Takedown). Perhatian = `sun` dengan teks `sun-ink` dan segitiga (ROAS terlalu kecil).
- **Penanda "Contoh":** pil bergaris kapital. Wajib ada di setiap angka demo.
- **Lembar:** `paper`, 24px, `--shadow-sheet`. Lembar di permukaan terang memakai cincin 1px `line`.
- **Kontrol:** input dan tombol bergaris memakai batas `control`, tinggi minimal 44px (input 48px). Tombol terpilih berisi penuh `ink`. Cincin fokus 3px: `ember-text` di permukaan terang, `#b7c0ff` (aksen `.tone-dark`) di permukaan gelap.
- **Logo, ikon, dan favicon:** berkas sumber dari pemilik ada di `assets/` (termasuk `head-snippet.html`). Yang dilayani situs disalin ke `public/`: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `site.webmanifest`, dan `public/logo/` untuk header (`logo-horizontal.svg`, permukaan terang) dan footer (`logo-horizontal-on-dark.svg`, permukaan gelap). Logo di header setinggi 24px di HP dan 28px dari 640px, supaya tombol di sebelahnya tetap satu baris di 375px. Jangan menaruh berkas tanpa hash di `public/assets/`: `_headers` menyimpan semua yang di bawah `/assets/` selama satu tahun. Header gelap `/syarat/` dan `/privasi/` memakai berkas yang sama (`logo-horizontal-on-dark.svg`), dengan ukuran yang sama.
- **Ikon:** satu keluarga garis (viewBox 24, tebal 2 sampai 2,5, ujung bulat) di `src/components/ui.tsx`. Tanpa emoji atau glyph unicode sebagai ikon. Relevansi tiap ikon tertulis di komentar file itu. Satu pengecualian: logo WhatsApp (isian penuh, dari Simple Icons, CC0) di tombol WhatsApp. Itu tanda merek pihak ketiga yang menunjukkan tujuan tombol, bukan bagian dari keluarga ikon garis.

## Gerak

Gerak menandai jawaban yang datang atau status yang berubah. Semuanya hanya `transform` dan `opacity`, tanpa pustaka animasi, dan mati total di bawah `prefers-reduced-motion`.

- Angka hasil menghitung naik ke nilainya (700ms).
- Stiker "tersetempel" saat muncul. Di kartu hero, stiker Takedown dan Hero muncul setelah angka untung selesai menghitung.
- Nota hasil "tercetak" baris demi baris saat digulir ke layar (`data-reveal`, dipakai hanya di nota hasil dan stiker iklan).
- Konten hanya disembunyikan untuk animasi kalau JavaScript benar-benar jalan. Kalau bundle belum berjalan setelah 4 detik, semua konten ditampilkan.
- **Prototipe, belum diputuskan pemilik (16 Okt 2026):** bagian "Uang masuk banyak belum tentu cuan" (`src/components/Story.tsx`, setelah Masalah) adalah cerita yang tertahan saat digulir. Rekap satu bulan dihitung langkah demi langkah dan angkanya ikut maju-mundur bersama gulir. Ini melanggar "tanpa koreografi gulir" di Dial MOTION 2 [diinferensi], dan sengaja dibuat untuk dicoba pemilik setelah melihat ailene.id. Tetap tanpa pustaka animasi (sticky + satu listener scroll), dan statis tanpa JavaScript, dengan reduced motion, atau di layar di bawah 600px. Kalau diterima, Dial dan bagian ini diperbarui. Kalau ditolak, hapus berkas itu, `<Story />` di `App.tsx`, dan blok "Cerita gulir" di `src/index.css`.

## Suara dan isi

- Bahasa Indonesia sehari-hari, memanggil pembaca "kamu". Rupiah ditulis `Rp1.250.000`, dan `Rp3,42 juta` untuk angka besar.
- Istilah mengikuti glosarium aplikasi: HPP, ROAS nyata, Balik modal, Takedown, Hero, Angka final.
- Tidak ada em dash di teks yang tampil (R-02).
- Setiap angka demo berlabel **Contoh**. Dilarang menulis angka hasil, testimoni, atau klaim yang tidak ada datanya (README, R-17, R-18, R-36). Setiap klaim privasi harus dicocokkan dulu dengan kode aplikasi.
- Pakai kata yang dipakai seller sendiri secukupnya (cuan, boncos, untung bersih), bukan bahasa laporan. Slang yang dipaksakan sama buruknya dengan bahasa kaku.
- CTA spesifik pada aksinya ("Coba gratis 30 hari" dengan logo WhatsApp, bukan "Mulai" atau "Pelajari").
- Janji operasional (akun dibuat manual, admin membalas maksimal 1×24 jam) cukup disebut di Cara Kerja dan kolom kiri Harga, tidak di bawah setiap tombol.
- Satu fakta, satu tempat yang terlihat. Daftar lengkap data yang disimpan ada di FAQ (tertutup) dan `/privasi/`; bagian Tentang dan footer hanya memuat kalimat ringkas dan tautan.
- FAQ hanya memuat pertanyaan yang spesifik untuk produk ini. Jangan menambah pertanyaan templat.

## Aksesibilitas

- Target sentuh minimal 44px, termasuk tautan teks (lihat `src/components/Footer.tsx`).
- Skip link "Lewati ke konten utama" sebagai elemen pertama, `<h1>` di dalam `<main>`, bar atas sebagai `<header>`.
- Indikator fokus terlihat di setiap elemen interaktif, kontras minimal 3:1 terhadap latar.
- Pesan galat berupa teks, bukan hanya warna, dan menyebut nilai yang sedang dipakai.

## Do dan Don't

### Do
- **Do** menjawab dengan kalimat sebelum menunjukkan hitungannya, dan memberi angka pasti tepat setelah angka bulat.
- **Do** menaruh isi kerja di lembar putih dan membungkus teks di permukaan gelap dengan nada `tone-dark`.
- **Do** mengikat gerak baru pada perubahan status, dan menambahkannya ke blok `prefers-reduced-motion`.
- **Do** memakai Plus Jakarta Sans untuk angka yang berderet di kolom.
- **Do** memperbarui `public/syarat/index.html` dan `public/privasi/index.html` (beserta tanggal "Terakhir diperbarui") kalau kebijakan atau data yang disimpan berubah.

### Don't
- **Don't** menambah garis samping berwarna, lembar di dalam lembar, atau gradasi.
- **Don't** memakai aksen indigo di luar peran di bagian Warna, memakainya sebagai warna status, atau menambah warna di luar tiga kelompok.
- **Don't** memakai kuning (`sun`) sebagai hiasan, menaruh teks tinta di atas indigo, atau menaruh `ember-text` di permukaan gelap.
- **Don't** membawa blob, cahaya kursor, kartu melayang, atau lencana pil bertitik dari proposal Ordi.
- **Don't** memasang cookie, penyimpanan lokal, analitik, atau skrip pihak ketiga tanpa memperbarui `/privasi/` terlebih dulu.
- **Don't** memakai emoji atau glyph unicode sebagai ikon atau penanda status.
- **Don't** membuat gerak yang berulang tanpa henti, menambah confetti, atau menganimasikan judul per kata. Confetti dan judul per kata dibuang karena terbaca sebagai pola templat.
- **Don't** menganggap bagian "Dial" sudah final sebelum pemilik mengonfirmasinya.
