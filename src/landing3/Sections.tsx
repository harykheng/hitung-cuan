import type { ReactNode } from 'react'
import { CheckIcon, InAppWaHelp } from '../components/ui'
import { APP_URL, LYNK_LABEL, LYNK_URL, PRICE_MONTHLY, PRICE_YEARLY, REPLY_PROMISE, STUDIO_URL, TRIAL_DAYS } from '../config'
import { rp } from '../lib/format'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import { PREVIEW_SCREENS } from './content'
import { ArrowDown, BrowserIcon, Cta, ExternalIcon, PlusMinus, Shot, SkipIcon, StoreIcon, Wrap } from './ui'

/* ---------- Yang bisa dicek: daftar indeks selebar halaman ---------- */

/*
 * Tiga manfaat dari brief sebagai baris indeks (bukan tiga kartu sama besar). Tiap baris adalah tautan ke contoh layarnya
 * di bagian Preview, jadi efek "baris terpilih" saat disentuh menandai sesuatu yang memang bisa diklik.
 */
const CHECKS = [
  {
    title: 'Pahami untung bulan ini',
    body: 'Lihat ringkasan untung bersih bulanan dan faktor yang paling memengaruhi hasilnya.',
    to: 'layar-rekap',
  },
  {
    title: 'Temukan produk dan iklan yang perlu perhatian',
    body: 'Cek untung per produk, tandai yang rugi atau marginnya tipis, dan bandingkan ROAS nyata iklan dengan target yang sudah memperhitungkan biaya dan retur.',
    to: 'layar-iklan',
  },
  {
    title: 'Simulasikan sebelum mengubah harga',
    body: 'Masukkan modal dan biaya, lalu lihat perkiraan harga jual dan target ROAS sebelum harga diubah atau iklan dijalankan.',
    to: 'layar-simulasi',
  },
]

export function Checks() {
  return (
    <section id="yang-bisa-dicek" aria-labelledby="cek-judul" className="checks">
      <Wrap className="checks-head">
        <h2 id="cek-judul" className="h2" data-split>
          Yang bisa kamu cek.
        </h2>
      </Wrap>
      <Wrap>
        <ul className="index">
          {CHECKS.map((c) => (
            <li key={c.title}>
              <a href={`#${c.to}`} className="index-row">
                <span className="index-fill" aria-hidden="true" />
                <span className="index-title">
                  <span className="index-sel">{c.title}</span>
                </span>
                <span className="index-body">{c.body}</span>
                <span className="index-go">
                  Lihat contoh layar <ArrowDown className="index-arrow" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  )
}

/* ---------- Cara kerja: tangga tiga langkah dengan panah "lacak sumber" ---------- */

/*
 * Tiga langkah memang berurutan, jadi nomornya membawa informasi. Panah di antara langkah meniru panah "trace precedents"
 * di spreadsheet (titik di pangkal, kepala panah di ujung) dan tergambar saat digulir (motion.ts).
 */
const STEPS = [
  {
    title: 'Siapkan export Shopee',
    body: 'Export pesanan (.xlsx, status Semua), laporan penghasilan Excel "Sudah Dilepas", dan file .csv iklan kalau kamu beriklan. Laporan lama dalam PDF bulanan masih bisa dipakai.',
  },
  {
    title: 'Lengkapi HPP dan biaya',
    body: 'Isi modal per produk atau variasi, lalu biaya di luar Shopee seperti Meta Ads, packaging, dan biaya lain, supaya hitungannya menggambarkan kondisi tokomu.',
  },
  {
    title: 'Baca hasil, tentukan langkah',
    body: 'Cek rekap bulanan, untung per produk, iklan yang rugi, atau coba simulasi harga sebelum mengubah harga jual.',
  },
]

function Trace({ className = '' }: { className?: string }) {
  return (
    <svg className={`trace ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M1 1 C 55 1, 45 99, 99 99" pathLength={1} />
    </svg>
  )
}

export function Steps() {
  return (
    <section id="cara-kerja" aria-labelledby="cara-judul" className="steps">
      <Wrap className="steps-head">
        <h2 id="cara-judul" className="h2" data-split>
          Cara kerjanya tiga langkah.
        </h2>
        <p className="steps-pre">
          Sebelum mulai: akun dan akses tokomu dibuat oleh pengelola lewat WhatsApp, dengan uji coba gratis {TRIAL_DAYS} hari.
        </p>
      </Wrap>
      <Wrap>
        <ol className="stair">
          {STEPS.map((s, i) => (
            <li key={s.title} className="stair-step" data-step-i={i}>
              <span className="stair-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="stair-title">
                <span className="sr-only">Langkah {i + 1}: </span>
                {s.title}
              </h3>
              <p className="stair-body">{s.body}</p>
              {i < STEPS.length - 1 && <Trace />}
            </li>
          ))}
        </ol>
        <aside className="note" aria-label="Catatan tentang status hasil">
          <span className="note-chip">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4 3.5 19h17L12 4Z" />
              <path d="M12 10v4.5M12 17v.01" />
            </svg>
            Belum lengkap
          </span>
          <p>
            Hasil bulan itu berstatus <strong>Belum lengkap</strong> kalau laporan belum tersedia, data belum cocok, HPP
            belum terisi, atau biaya belum disimpan. Angkanya menjadi <strong>Angka final</strong> setelah datanya lengkap,
            jadi kualitas hasil ikut bergantung pada data yang masuk.
          </p>
        </aside>
      </Wrap>
    </section>
  )
}

/* ---------- Preview aplikasi: dinding galeri, satu besar dan dua kecil ---------- */

export function Preview() {
  const [big, ...small] = PREVIEW_SCREENS
  return (
    <section id="preview" aria-labelledby="preview-judul" className="preview">
      <Wrap className="preview-head">
        <h2 id="preview-judul" className="h2" data-split>
          Preview aplikasi.
        </h2>
        <p className="preview-lead">Tiga layar yang paling sering dibuka: rekap, iklan, dan simulasi harga.</p>
      </Wrap>
      <Wrap className="wall">
        <Shot slot={big} className="wall-big" />
        {small.map((s, i) => (
          <Shot key={s.id} slot={s} className={`wall-small wall-small-${i + 1}`} />
        ))}
      </Wrap>
    </section>
  )
}

/* ---------- Privasi: bidang indigo, tiga kata kerja ---------- */

/*
 * Setiap kalimat dicocokkan dengan aplikasi (shopee-profit-calc) dan /privasi/, sama dengan landing 2:
 *  - File dibaca di browser; tidak ada upload file mentah, yang dikirim baris hasil olahan.
 *  - Kolom pembeli tidak dipetakan parser (BUYER_PRIVATE_COLUMNS + metode pembayaran). Ditulis "tidak diambil", bukan
 *    "tidak dibaca": browser tetap memuat seluruh file ke memori (audit 001, putaran 4).
 *  - Pemisahan toko lewat RLS per toko. Jangan menambah klaim keamanan absolut atau sertifikasi.
 */
const PRIV = [
  {
    icon: BrowserIcon,
    word: 'Dibaca di browser.',
    body: 'File export asli dibaca langsung di browser dan tidak diunggah ke server sebagai file mentah.',
  },
  {
    icon: SkipIcon,
    word: 'Data pembeli dilewati.',
    body: 'Nama penerima, alamat, nomor telepon, username, catatan pembeli, nomor resi, dan metode pembayaran tidak diambil dan tidak disimpan.',
  },
  {
    icon: StoreIcon,
    word: 'Hasil olahan disimpan.',
    body: 'Angka pesanan, penghasilan, dan iklan, serta HPP dan biaya yang kamu isi, disimpan untuk akun tokomu supaya rekap bisa dibuka lagi. Seller lain tidak bisa melihatnya.',
  },
]

export function Privacy() {
  return (
    <section id="privasi" aria-labelledby="privasi-judul" className="privacy">
      <Wrap className="privacy-in">
        <h2 id="privasi-judul" className="h2 privacy-title" data-split>
          Data tokomu: apa yang dibaca, apa yang dilewati, apa yang disimpan.
        </h2>
        <ul className="privacy-list">
          {PRIV.map(({ icon: Icon, word, body }) => (
            <li key={word} className="privacy-item">
              <Icon className="privacy-icon" />
              <h3 className="privacy-word">{word}</h3>
              <p className="privacy-body">{body}</p>
            </li>
          ))}
        </ul>
        <a href="/privasi/" className="privacy-link">
          Baca Kebijakan Privasi lengkap
        </a>
      </Wrap>
    </section>
  )
}

/* ---------- Harga dan uji coba ---------- */

/*
 * Ditambahkan atas keputusan pemilik (23 Okt 2026), menggantikan larangan harga di brief landing 2 dan 3, sesuai
 * LANDINGPAGE.md di shopee-profit-calc (keputusan #1 dan #2). Semua angka dari src/config.ts. Kalimat uji coba, tagihan,
 * dan refund sama dengan bagian Harga dan /syarat/ di main. Cara bayar: halaman Lynk.id resmi (LYNK_URL di config.ts),
 * lalu bukti bayar ke admin lewat WhatsApp (keputusan pemilik, 26 Okt 2026). Jangan menambah janji baru di sini.
 * Harga ditulis sebagai lembar kecil: satu baris per pilihan, kursor sel di baris uji coba (langkah pertama).
 */
const INCLUDED = [
  'Satu akun untuk 1 toko Shopee. Punya lebih dari satu toko? Tanyakan ke admin.',
  'Pembaruan kalau format file Shopee berubah sudah termasuk.',
  'Data tokomu terpisah dari seller lain.',
]

export function Pricing() {
  const saving = PRICE_MONTHLY * 12 - PRICE_YEARLY
  const perMonth = Math.round(PRICE_YEARLY / 12)
  return (
    <section id="harga" aria-labelledby="harga-judul" className="pricing">
      <Wrap className="pricing-grid">
        <div className="pricing-side">
          <h2 id="harga-judul" className="h2" data-split>
            Coba gratis {TRIAL_DAYS} hari dulu.
          </h2>
          <p className="pricing-lead">
            Akun dibuat oleh pengelola setelah kamu chat lewat WhatsApp. {REPLY_PROMISE}. Upload data bulan lalu dan lihat
            untung aslimu sebelum memutuskan berlangganan.
          </p>
        </div>

        <div className="pricing-main">
          <table className="price-sheet">
            <caption className="sr-only">Harga HitungCuan per toko</caption>
            <thead>
              <tr>
                <th scope="col">Pilihan</th>
                <th scope="col" className="is-num">
                  Harga per toko
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="is-trial">
                <th scope="row">
                  Uji coba
                  <span className="price-note">{TRIAL_DAYS} hari, semua fitur, tanpa kartu kredit</span>
                </th>
                <td className="is-num">
                  <span className="price-sel">Gratis</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  Bulanan
                  <span className="price-note">per toko per bulan</span>
                </th>
                <td className="is-num">{rp(PRICE_MONTHLY)}</td>
              </tr>
              <tr>
                <th scope="row">
                  Tahunan
                  <span className="price-note">
                    setara {rp(perMonth)} per bulan, hemat {rp(saving)}
                  </span>
                </th>
                <td className="is-num">{rp(PRICE_YEARLY)}</td>
              </tr>
            </tbody>
          </table>

          <ul className="pricing-incl">
            {INCLUDED.map((x) => (
              <li key={x}>
                <CheckIcon className="pricing-check" />
                {x}
              </li>
            ))}
          </ul>

          <Cta lokasi="harga" className="pricing-cta" />
          <p className="pricing-small">
            Bayar hanya kalau mau lanjut setelah {TRIAL_DAYS} hari. Tidak ada tagihan otomatis.{' '}
            <a href="/syarat/" className="inline-link">
              Baca Syarat Layanan
            </a>
          </p>
          <div className="pricing-pay">
            <p className="pay-lead">Sudah selesai uji coba dan mau lanjut?</p>
            <a href={LYNK_URL} target="_blank" rel="noopener noreferrer" className="pay-btn">
              Bayar langganan di Lynk.id
              <ExternalIcon className="pay-icon" />
              <span className="sr-only"> (membuka halaman pembayaran di tab baru)</span>
            </a>
            <p className="pay-note">
              Halaman resmi: <span className="pay-url">{LYNK_LABEL}</span>. Setelah bayar, kirim buktinya ke admin lewat
              WhatsApp supaya aksesmu diperpanjang.
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  )
}

/* ---------- FAQ ---------- */

function WaText({ children }: { children: ReactNode }) {
  const source = useSource()
  return (
    <a
      href={waLink(generalMessage(source))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta('faq')}
      className="inline-link"
    >
      {children}
    </a>
  )
}

export function Faq() {
  const items: { q: string; a: ReactNode }[] = [
    {
      q: 'HitungCuan menghitung apa?',
      a: 'Untung bersih per bulan dan per produk, analisis iklan per produk (ROAS nyata dibanding target ROAS), serta simulasi harga jual dan target ROAS. Semuanya dari data yang kamu unggah dan isi sendiri.',
    },
    {
      q: 'File apa yang perlu disiapkan?',
      a: 'Export pesanan Shopee (.xlsx, status Semua), laporan penghasilan Excel "Sudah Dilepas" (PDF bulanan masih bisa untuk laporan lama), dan file .csv iklan kalau kamu beriklan. HPP dan biaya diisi langsung di aplikasi.',
    },
    {
      q: 'Apakah file asli saya diunggah?',
      a: 'Tidak. File dibaca di browser kamu dan file aslinya tidak diunggah sebagai file mentah. Yang disimpan adalah hasil olahannya untuk akun tokomu, supaya rekap bisa dibuka lagi. Data pribadi pembeli tidak diambil dan tidak disimpan.',
    },
    {
      q: 'Apakah saya bisa langsung daftar dan membayar di website?',
      a: (
        <>
          Tidak. Akun dan akses toko dibuat oleh pengelola HitungCuan, dimulai dengan uji coba gratis {TRIAL_DAYS} hari.
          Kalau tertarik, <WaText>tanyakan aksesnya lewat WhatsApp</WaText>.
        </>
      ),
    },
    {
      q: 'Bagaimana cara bayar? Ada refund?',
      a: (
        <>
          Setelah uji coba, pembayaran lewat halaman resmi HitungCuan di Lynk.id:{' '}
          <a href={LYNK_URL} target="_blank" rel="noopener noreferrer" className="inline-link">
            {LYNK_LABEL}
          </a>
          . Pastikan tautan yang kamu buka sama persis dengan ini. Setelah bayar, kirim buktinya ke admin lewat WhatsApp
          supaya aksesmu diperpanjang. Tidak ada refund, jadi manfaatkan uji coba gratis {TRIAL_DAYS} hari untuk memastikan
          HitungCuan cocok dengan tokomu.
        </>
      ),
    },
    {
      q: 'Apa yang terjadi setelah uji coba habis?',
      a: 'Akunmu otomatis menjadi mode baca saja: Rekap tetap bisa dilihat, tapi kamu tidak bisa mengunggah file atau mengubah data. Datamu tetap tersimpan, dan akses penuh kembali kalau kamu berlangganan lewat admin. Kalau sudah 3 bulan tidak berlangganan, datamu dihapus.',
    },
    {
      q: 'Kenapa hasil bulan saya belum lengkap?',
      a: 'Biasanya karena laporan penghasilan bulan itu belum diunggah, ada uang cair yang belum cocok dengan pesanannya, HPP sebagian produk belum terisi, atau biaya bulan itu belum disimpan. Aplikasi menyebut mana yang kurang.',
    },
    {
      q: 'Apakah HitungCuan menjamin toko pasti untung?',
      a: 'Tidak. HitungCuan membantu membaca data tokomu supaya keputusan soal harga dan iklan punya dasar. Hasil usaha tetap bergantung pada banyak hal di luar aplikasi.',
    },
  ]

  return (
    <section id="faq" aria-labelledby="faq-judul" className="faq">
      <Wrap className="faq-grid">
        <div className="faq-side">
          <h2 id="faq-judul" className="h2" data-split>
            Pertanyaan yang sering muncul.
          </h2>
        </div>
        <div className="faq-list">
          {items.map((it) => (
            <details key={it.q} name="faq" className="faq-item">
              <summary className="faq-q">
                <span>{it.q}</span>
                <PlusMinus className="faq-icon" />
              </summary>
              <div className="faq-a">
                <p>{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/* ---------- Penutup: sel terakhir ---------- */

/*
 * Penutup memakai motif yang sama dengan hero: kursor sel berhenti di tombolnya. Cerita halaman berakhir di satu sel,
 * yaitu aksi berikutnya. Tidak menyebut harga, diskon, garansi, atau batas waktu.
 */
export function Closing() {
  return (
    <section aria-labelledby="penutup-judul" className="closing">
      <Wrap className="closing-in">
        <h2 id="penutup-judul" className="closing-title" data-split>
          Mulai pahami angka toko Shopee-mu dengan lebih jelas.
        </h2>
        <p className="closing-sub">Tanyakan akses HitungCuan lewat WhatsApp.</p>
        <div className="closing-act">
          <span className="closing-cell" data-closing-cell>
            <Cta lokasi="penutup" size="xl" />
            <span className="closing-handle" aria-hidden="true" />
          </span>
        </div>
        <InAppWaHelp lokasi="penutup" className="closing-inapp" />
      </Wrap>
    </section>
  )
}

/* ---------- Footer ---------- */

export function Footer() {
  const source = useSource()
  return (
    <footer className="foot">
      <Wrap className="foot-in">
        <div className="foot-brand">
          <img src="/logo/logo-horizontal-on-dark.svg" alt="HitungCuan" width="742" height="126" className="foot-logo" />
          <p className="foot-line">
            Aplikasi untuk membantu penjual Shopee membaca untung bersih, kinerja iklan, dan simulasi harga.
          </p>
        </div>
        <ul className="foot-links">
          <li>
            <a
              href={waLink(generalMessage(source))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta('footer')}
              className="foot-link"
            >
              WhatsApp pengelola
            </a>
          </li>
          <li>
            <a href={LYNK_URL} target="_blank" rel="noopener noreferrer" className="foot-link">
              Halaman pembayaran (Lynk.id)
            </a>
          </li>
          <li>
            <a href="/privasi/" className="foot-link">
              Kebijakan Privasi
            </a>
          </li>
          <li>
            <a href="/syarat/" className="foot-link">
              Syarat Layanan
            </a>
          </li>
        </ul>
        <div className="foot-small">
          <p>
            Sudah punya akun?{' '}
            <a href={APP_URL} className="foot-link">
              Masuk ke aplikasi
            </a>
          </p>
          <p>Halaman ini mencatat statistik kunjungan lewat Umami, tanpa cookie.</p>
          <p>
            HitungCuan oleh{' '}
            <a href={STUDIO_URL} className="foot-link">
              Studio Harel
            </a>
            , © <span suppressHydrationWarning>{new Date().getFullYear()}</span>. HitungCuan bukan produk resmi Shopee.
          </p>
        </div>
      </Wrap>
    </footer>
  )
}
