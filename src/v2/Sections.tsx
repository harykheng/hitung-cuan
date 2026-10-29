import type { ReactNode } from 'react'
import { ChevronIcon, CheckIcon, Container, Cta, ExampleTag, H2, InAppWaHelp, Section, Sticker } from '../components/ui'
import { APP_URL, LYNK_LABEL, LYNK_URL, PRICE_MONTHLY, PRICE_YEARLY, REPLY_PROMISE, STUDIO_URL, TRIAL_DAYS, TRIAL_LIMITS } from '../config'
import { GUIDE_VIDEO, HERO_SCREEN, PREVIEW_SCREENS, type ScreenSlot } from '../landing3/content'
import { rp } from '../lib/format'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import {
  BEFORE_AFTER,
  CASE_NET,
  CASE_PRODUCTS,
  CASE_REAL,
  CASE_SEEN,
  FEATURES,
  INCLUDED,
  KICKER,
  PRIVACY,
  PROBLEMS,
  STEPS,
} from './content'

/*
 * Landing v2 (/v2/). Kulit dan komponen mengikuti DESIGN.md bagian dasar (Dapur Terang, landing 1): krem, lembar putih
 * bersudut 24px, Parkinsans, satu aksen indigo hanya untuk tombol WhatsApp dan teks aksen. Tidak ada pustaka animasi;
 * gerak hanya stiker yang tersetempel dan bar bawah HP (sudah ada di landing 1).
 */

const LINK = 'inline-flex min-h-11 items-center font-semibold text-fg underline decoration-2 underline-offset-4'

/* ---------- Bar atas ---------- */

export function Header() {
  return (
    <header className="tone-light sticky top-0 z-50 border-b border-rule bg-canvas">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#utama" className="inline-flex min-h-11 min-w-0 items-center rounded-md" aria-label="HitungCuan, ke atas">
          <img src="/logo/logo-horizontal.svg" alt="" width={165} height={28} className="h-6 w-auto max-w-full object-contain object-left sm:h-7" />
        </a>
        <Cta lokasi="bar_atas" size="sm">
          Coba gratis
        </Cta>
      </Container>
    </header>
  )
}

/* ---------- Bingkai screenshot ---------- */

/**
 * Screenshot aplikasi dari toko uji (data contoh). Label Contoh dan keterangan selalu tampil, karena gambarnya memuat
 * angka toko. Di bawah 768px memakai potongan khusus HP kalau ada, supaya tulisannya terbaca.
 */
function Shot({ slot, priority = false, className = '' }: { slot: ScreenSlot; priority?: boolean; className?: string }) {
  if (!slot.src) return null
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-3xl border border-rule bg-paper shadow-sheet">
        <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-2.5">
          <span aria-hidden="true" className="truncate text-xs text-fg-3">
            app.studioharel.id
          </span>
          <ExampleTag />
        </div>
        <picture>
          {slot.srcMobile && (
            <source media="(max-width: 767px)" srcSet={slot.srcMobile} width={slot.widthMobile} height={slot.heightMobile} />
          )}
          <img
            src={slot.src}
            alt={slot.alt}
            width={slot.width}
            height={slot.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>
      </div>
      <figcaption className="mt-3 text-sm text-fg-2">
        {slot.title}. Data toko contoh, bukan hasil pengguna.
      </figcaption>
    </figure>
  )
}

/* ---------- Hero ---------- */

/*
 * Pengganti "3 angka bukti" di halaman rujukan: tiga fakta tentang layanan, bukan angka hasil (README, R-17, R-18).
 */
const FACTS = [
  { big: `${TRIAL_DAYS} hari`, small: 'uji coba gratis' },
  { big: '3 laporan', small: 'pesanan, penghasilan, iklan' },
  { big: '1×24 jam', small: 'paling lama admin membalas' },
]

export function Hero() {
  return (
    <section id="hero" aria-labelledby="judul-utama" className="tone-light bg-canvas pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <h1
            id="judul-utama"
            className="font-display text-[2.5rem] leading-none font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            Saldo cair banyak. <span className="hl">Untungnya berapa?</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl">
            Unggah file export Seller Centre. HitungCuan merangkumnya jadi untung bersih per bulan dan per produk, mengecek
            iklan per produk, dan membantu menyimulasikan harga jual.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Cta lokasi="hero" />
            <a href="#cara-kerja" className={LINK}>
              Lihat cara kerjanya
            </a>
          </div>
          <InAppWaHelp lokasi="hero" className="mt-4" />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-2">
            File export dibaca di browser; file asli tidak diunggah. Akun dibuat oleh pengelola lewat WhatsApp. Bukan
            produk resmi Shopee.
          </p>
          <dl className="mt-8 grid grid-cols-3 divide-x divide-rule rounded-2xl border border-rule bg-paper">
            {FACTS.map((f) => (
              <div key={f.big} className="flex flex-col-reverse justify-end px-3 py-4 text-center sm:px-4">
                <dt className="mt-1 text-xs leading-snug text-fg-2 sm:text-sm">{f.small}</dt>
                <dd className="font-display text-base font-extrabold whitespace-nowrap min-[360px]:text-lg sm:text-2xl">{f.big}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Shot slot={HERO_SCREEN} priority />
      </Container>
    </section>
  )
}

/* ---------- Kalau ini kamu ---------- */

export function Problems() {
  return (
    <Section tone="paper" labelledby="masalah-judul">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p className={KICKER}>Kalau ini kamu</p>
          <H2 id="masalah-judul" className="mt-3">
            Omzet ramai, tapi uangnya entah ke mana.
          </H2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-2">
            Lima tanda angka tokomu belum terbaca sampai habis.
          </p>
        </div>
        <ul className="divide-y divide-rule border-y border-rule">
          {PROBLEMS.map((p) => (
            <li key={p.title} className="py-5">
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-fg-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-12 max-w-3xl font-display text-2xl leading-snug font-extrabold text-balance sm:text-3xl">
        Omzet terasa seperti untung, <span className="hl">padahal belum dikurangi apa-apa.</span>
      </p>
    </Section>
  )
}

/* ---------- Studi kasus (toko rekaan) ---------- */

function Rows({ rows }: { rows: readonly { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-rule">
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-fg-2">{r.label}</dt>
          <dd className="shrink-0 font-semibold tabular-nums">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function CaseStudy() {
  return (
    <Section tone="tint" labelledby="kasus-judul">
      <div className="flex flex-wrap items-center gap-3">
        <p className={KICKER}>Studi kasus</p>
        <ExampleTag />
      </div>
      <H2 id="kasus-judul" className="mt-3">
        Omzet Rp20 juta. Untungnya ternyata Rp3 juta.
      </H2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-2">
        Toko pakaian rekaan, satu bulan. Filenya sama, hanya dibaca sampai habis: potongan Shopee, modal, iklan, dan biaya
        lain ikut dihitung.
      </p>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)] lg:gap-8">
        <div className="rounded-3xl border border-rule p-6 sm:p-7">
          <p className="font-display text-lg font-bold">Yang terlihat</p>
          <div className="mt-3">
            <Rows rows={CASE_SEEN} />
          </div>
          <p className="mt-4 text-sm text-fg-2">Angka yang biasa dilihat di Seller Centre dan saldo.</p>
        </div>

        <div aria-hidden="true" className="flex justify-center self-center text-fg-3">
          <svg viewBox="0 0 24 24" className="size-8 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth={2.25}>
            <path d="M5 12h14M12.5 5.5 19 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="rounded-3xl bg-paper p-6 shadow-sheet sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-display text-lg font-bold">Yang sebenarnya</p>
            <ExampleTag />
          </div>
          <p className="mt-3 font-display text-2xl leading-tight font-extrabold sm:text-3xl">
            Untung bersihnya <span className="hl whitespace-nowrap">{CASE_NET}</span>, dan satu produk rugi.
          </p>
          <div className="mt-4">
            <Rows rows={CASE_REAL} />
            <div className="flex items-baseline justify-between gap-4 border-t-2 border-fg pt-3">
              <span className="font-display text-lg font-extrabold">Untung bersih</span>
              <span className="font-display text-lg font-extrabold tabular-nums">{CASE_NET}</span>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {CASE_PRODUCTS.map((p) => (
              <li key={p.name} className="rounded-2xl bg-tint p-4">
                <Sticker kind={p.status === 'rugi' ? 'takedown' : 'kecil'} rot={p.status === 'rugi' ? -3 : 2}>
                  {p.status === 'rugi' ? 'Rugi' : 'Tipis'}
                </Sticker>
                <p className="mt-3 font-semibold">{p.name}</p>
                <p className="text-sm text-fg-2">
                  <span className="font-semibold text-fg tabular-nums">{p.value}</span>, {p.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* ---------- Sebelum dan sesudah ---------- */

export function BeforeAfter() {
  return (
    <Section tone="paper" labelledby="beda-judul">
      <p className={KICKER}>Yang berubah</p>
      <H2 id="beda-judul" className="mt-3">
        Yang kamu lihat setelah datanya masuk.
      </H2>
      <ul className="mt-10 grid gap-4">
        {BEFORE_AFTER.map((x) => (
          <li key={x.before} className="grid items-stretch gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4">
            <div className="rounded-2xl bg-tint px-5 py-4">
              <p className="text-xs font-semibold tracking-wide text-fg-3 uppercase">Sebelum</p>
              <p className="mt-1 text-fg-2">{x.before}</p>
            </div>
            <div aria-hidden="true" className="flex justify-center self-center text-fg-3">
              <svg viewBox="0 0 24 24" className="size-6 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth={2.25}>
                <path d="M5 12h14M12.5 5.5 19 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="rounded-2xl border border-rule bg-paper px-5 py-4 shadow-sheet">
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">Sesudah</p>
              <p className="mt-1 font-semibold">{x.after}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg-2">
        HitungCuan tidak menjamin toko untung. Yang berubah adalah dasar keputusanmu soal harga dan iklan: angka dari data
        tokomu sendiri, bukan tebakan.
      </p>
    </Section>
  )
}

/* ---------- Cara kerja ---------- */

export function Steps() {
  return (
    <Section id="cara-kerja" tone="canvas" labelledby="cara-judul">
      <p className={KICKER}>Cara kerja</p>
      <H2 id="cara-judul" className="mt-3">
        Tiga langkah, dari file export sampai jawaban.
      </H2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-2">
        Sebelum mulai: akun dan akses tokomu dibuat oleh pengelola lewat WhatsApp, dengan uji coba gratis {TRIAL_DAYS}{' '}
        hari. {REPLY_PROMISE}.
      </p>
      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-fg font-display text-lg font-extrabold"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">
              <span className="sr-only">Langkah {i + 1}: </span>
              {s.title}
            </h3>
            <p className="mt-2 leading-relaxed text-fg-2">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-fg-2">
        Mau lihat langsung cara pakainya?{' '}
        <a href={GUIDE_VIDEO.url} target="_blank" rel="noopener noreferrer" className={LINK}>
          Tonton panduan di YouTube ({GUIDE_VIDEO.minutes} menit)
          <span className="sr-only"> (tab baru)</span>
        </a>
      </p>
    </Section>
  )
}

/* ---------- Yang bisa dicek ---------- */

export function Features() {
  return (
    <Section id="yang-bisa-dicek" tone="paper" labelledby="fitur-judul">
      <p className={KICKER}>Isi aplikasi</p>
      <H2 id="fitur-judul" className="mt-3">
        Tiga hal yang bisa kamu cek.
      </H2>
      <ul className="mt-12 grid gap-16 lg:gap-20">
        {FEATURES.map((f, i) => {
          const slot = PREVIEW_SCREENS[i]
          return (
            <li key={f.title} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="font-display text-sm font-extrabold text-fg-3">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight font-extrabold sm:text-3xl">{f.title}</h3>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-fg-2">{f.body}</p>
              </div>
              {slot && <Shot slot={slot} />}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ---------- Privasi ---------- */

export function Privacy() {
  return (
    <Section tone="tint" labelledby="privasi-judul">
      <p className={KICKER}>Data tokomu</p>
      <H2 id="privasi-judul" className="mt-3">
        Apa yang dibaca, apa yang dilewati, apa yang disimpan.
      </H2>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {PRIVACY.map((p) => (
          <li key={p.title} className="rounded-3xl bg-paper p-6 shadow-sheet">
            <h3 className="font-display text-xl font-bold">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-fg-2">{p.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <a href="/privasi/" className={LINK}>
          Baca Kebijakan Privasi lengkap
        </a>
      </p>
    </Section>
  )
}

/* ---------- Harga ---------- */

/*
 * Pengganti kotak penawaran di halaman rujukan: isi paket tanpa harga per baris (tidak ada "total nilai" rekaan), lalu
 * tiga pilihan harga dari src/config.ts. Kalimat tagihan dan pembayaran sama dengan bagian Harga landing 3.
 */
export function Pricing() {
  const saving = PRICE_MONTHLY * 12 - PRICE_YEARLY
  const perMonth = Math.round(PRICE_YEARLY / 12)
  const trialNote = TRIAL_LIMITS.enforced
    ? `${TRIAL_DAYS} hari, data ${TRIAL_LIMITS.months} bulan, ${TRIAL_LIMITS.simulations} kali simulasi harga, tanpa kartu kredit`
    : `${TRIAL_DAYS} hari, semua fitur, tanpa kartu kredit`
  const rows = [
    { name: 'Uji coba', note: trialNote, price: 'Gratis' },
    { name: 'Bulanan', note: 'per toko per bulan', price: rp(PRICE_MONTHLY) },
    { name: 'Tahunan', note: `setara ${rp(perMonth)} per bulan, hemat ${rp(saving)}`, price: rp(PRICE_YEARLY) },
  ]
  return (
    <Section id="harga" tone="canvas" labelledby="harga-judul">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={KICKER}>Harga</p>
          <H2 id="harga-judul" className="mt-3">
            Coba gratis {TRIAL_DAYS} hari dulu, bayar kalau cocok.
          </H2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-2">
            Akun dibuat oleh pengelola setelah kamu chat lewat WhatsApp. {REPLY_PROMISE}. Upload data bulan lalu dan lihat
            untung aslimu sebelum memutuskan berlangganan.
          </p>
          <ul className="mt-6 grid gap-3">
            {INCLUDED.map((x) => (
              <li key={x} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-gain" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-paper p-6 shadow-sheet sm:p-8">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Harga HitungCuan per toko</caption>
            <thead>
              <tr className="border-b border-rule text-sm text-fg-3">
                <th scope="col" className="pb-3 font-semibold">
                  Pilihan
                </th>
                <th scope="col" className="pb-3 text-right font-semibold">
                  Harga per toko
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-b border-rule">
                  <th scope="row" className="py-4 pr-4 align-top">
                    <span className="block font-display text-lg font-bold">{r.name}</span>
                    <span className="mt-0.5 block text-sm font-normal text-fg-2">{r.note}</span>
                  </th>
                  <td className="py-4 text-right align-top font-display text-xl font-extrabold whitespace-nowrap tabular-nums">
                    {r.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex flex-wrap gap-3">
            <Cta lokasi="harga" className="grow whitespace-nowrap" />
            {/* Sekunder: kotak bergaris, bukan pil, supaya tidak bersaing dengan tombol WhatsApp (DESIGN.md, Landing 3). */}
            <a
              href={LYNK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 grow items-center justify-center gap-2 rounded-xl border-2 border-fg px-5 font-display font-bold"
            >
              Bayar di Lynk.id
              <span className="sr-only"> (halaman pembayaran, tab baru)</span>
            </a>
          </div>
          <p className="mt-4 text-sm text-fg-2">
            Bayar setelah uji coba lewat Lynk.id resmi. Tidak ada tagihan otomatis.{' '}
            <a href="/syarat/" className={LINK}>
              Syarat Layanan
            </a>
          </p>
        </div>
      </div>
    </Section>
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
      className="font-semibold underline decoration-2 underline-offset-4"
    >
      {children}
    </a>
  )
}

/** Jawaban sama dengan FAQ landing 3 (src/landing3/Sections.tsx). Ubah keduanya bersamaan. */
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
          <a href={LYNK_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 underline-offset-4 break-all">
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
      q: 'Apakah HitungCuan menjamin toko pasti untung?',
      a: 'Tidak. HitungCuan membantu membaca data tokomu supaya keputusan soal harga dan iklan punya dasar. Hasil usaha tetap bergantung pada banyak hal di luar aplikasi.',
    },
  ]
  return (
    <Section id="faq" tone="paper" labelledby="faq-judul">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <H2 id="faq-judul">Pertanyaan yang sering muncul.</H2>
        <div className="divide-y divide-rule border-y border-rule">
          {items.map((it) => (
            <details key={it.q} name="faq">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-display text-lg font-bold">
                <span>{it.q}</span>
                <ChevronIcon className="chev size-5 shrink-0" />
              </summary>
              <p className="pb-5 leading-relaxed text-fg-2">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- Penutup ---------- */

/* Tidak menyebut diskon, garansi, atau batas waktu: tidak ada promo bertanggal (keputusan pemilik, 29 Okt 2026). */
export function Closing() {
  return (
    <Section tone="night" size="lg" labelledby="penutup-judul">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="penutup-judul"
          className="font-display text-3xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]"
        >
          Bulan depan masih menebak untung dari saldo cair?
        </h2>
        <p className="mt-4 text-lg text-fg-2">
          Coba HitungCuan gratis {TRIAL_DAYS} hari. Akunnya dibuat admin lewat WhatsApp.
        </p>
        <div className="mt-8 flex justify-center">
          <Cta lokasi="penutup" />
        </div>
        <InAppWaHelp lokasi="penutup" compact className="mt-3" />
      </div>
    </Section>
  )
}

/* ---------- Footer ---------- */

export function Footer() {
  const source = useSource()
  const link = 'inline-flex min-h-11 items-center font-semibold text-fg underline decoration-fg-2 decoration-2 underline-offset-4'
  return (
    <footer className="tone-dark bg-night-deep pt-12 pb-[calc(9rem+env(safe-area-inset-bottom))] text-sm text-fg-2 sm:pb-12">
      <Container className="grid gap-8 md:grid-cols-2">
        <div>
          <img src="/logo/logo-horizontal-on-dark.svg" alt="HitungCuan" width={165} height={28} className="h-7 w-auto max-w-full object-contain object-left" />
          <p className="mt-3 max-w-sm text-base text-fg">
            Aplikasi untuk membantu penjual Shopee membaca untung bersih, kinerja iklan, dan simulasi harga.
          </p>
          <p className="mt-3">
            Sudah punya akun?{' '}
            <a href={APP_URL} className={link}>
              Masuk ke aplikasi
            </a>
          </p>
        </div>
        <ul className="grid content-start gap-1">
          <li>
            <a
              href={waLink(generalMessage(source))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta('footer')}
              className={link}
            >
              WhatsApp pengelola
            </a>
          </li>
          <li>
            <a href={LYNK_URL} target="_blank" rel="noopener noreferrer" className={link}>
              Halaman pembayaran (Lynk.id)
            </a>
          </li>
          <li>
            <a href="/privasi/" className={link}>
              Kebijakan Privasi
            </a>
          </li>
          <li>
            <a href="/syarat/" className={link}>
              Syarat Layanan
            </a>
          </li>
        </ul>
      </Container>
      <Container className="mt-8 border-t border-rule pt-6">
        <p>Halaman ini mencatat statistik kunjungan lewat Umami, tanpa cookie.</p>
        <p className="mt-1">
          HitungCuan oleh{' '}
          <a href={STUDIO_URL} className={link}>
            Studio Harel
          </a>
          , © <span suppressHydrationWarning>{new Date().getFullYear()}</span>. HitungCuan bukan produk resmi Shopee.
        </p>
      </Container>
    </footer>
  )
}
