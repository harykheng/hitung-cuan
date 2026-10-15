import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { TRIAL_DAYS, WA_NUMBER } from '../config'
import { useSource } from '../lib/source'
import { trackCopyNumber, trackCta, type CtaLocation } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'

/** Set properti CSS kustom (--i, --delay) tanpa error tipe. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

/*
 * Ritme latar: terang (paper / canvas / tint) untuk bagian isi, gelap (night) hanya untuk penutup.
 * Hero memakai canvas (krem), sama dengan latar og.png.
 *
 * Ritme jarak: tiga ukuran, dipilih menurut isi bagian, bukan satu nilai untuk semua.
 *   lg = bagian yang isinya kalimat besar atau baris tinggi (Masalah, Hasil yang kamu dapat): perlu ruang napas.
 *   md = bagian bawaan (alat, langkah, bukti, harga, FAQ).
 *   sm = bagian pendek yang hanya satu kutipan: tidak perlu ruang sebanyak itu (saat ini tidak dipakai).
 */
type Tone = 'paper' | 'canvas' | 'tint' | 'night'
type Size = 'sm' | 'md' | 'lg'
const SIZE: Record<Size, string> = {
  sm: 'py-10 sm:py-14 lg:py-16',
  md: 'py-14 sm:py-20 lg:py-24',
  lg: 'py-16 sm:py-24 lg:py-32',
}
const TONE: Record<Tone, string> = {
  paper: 'tone-light bg-paper text-fg',
  canvas: 'tone-light bg-canvas text-fg',
  tint: 'tone-light bg-tint text-fg',
  night: 'tone-dark bg-night text-fg',
}

export function Section({
  id,
  tone = 'paper',
  size = 'md',
  labelledby,
  children,
  className = '',
}: {
  id?: string
  tone?: Tone
  size?: Size
  labelledby?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledby} className={`${TONE[tone]} ${SIZE[size]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function H2({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`max-w-3xl font-display text-3xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${className}`}
    >
      {children}
    </h2>
  )
}

/** Penanda angka rekaan. Semua angka demo wajib berlabel ini. */
export function ExampleTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-current px-2.5 py-0.5 text-xs font-semibold tracking-wide text-fg-3 uppercase ${className}`}
    >
      Contoh
    </span>
  )
}

type StickerKind = 'final' | 'takedown' | 'kecil' | 'aman' | 'hero'
const STICKER: Record<StickerKind, string> = {
  final: 'bg-mintbg text-gain border-gain',
  takedown: 'bg-loss text-paper border-loss',
  kecil: 'bg-sun text-sun-ink border-sun-ink',
  aman: 'bg-mintbg text-gain border-gain',
  hero: 'bg-mintbg text-gain border-gain',
}

/**
 * Ikon kecil per status, supaya status tidak hanya dibedakan lewat warna.
 * Hero, Aman, dan Angka final sama-sama bernada positif (seperti Stamp tone "gain" di aplikasi, yang tidak punya ikon
 * khusus untuk Hero), jadi ketiganya memakai centang dan dibedakan oleh katanya. Tidak ada ikon bintang.
 */
const STICKER_ICON: Record<StickerKind, ReactNode> = {
  final: <path d="m5 12.5 4.5 4.5L19 7" />,
  aman: <path d="m5 12.5 4.5 4.5L19 7" />,
  takedown: <path d="M6 6l12 12M18 6 6 18" />,
  kecil: (
    <>
      <path d="M12 4 3.5 19h17L12 4Z" />
      <path d="M12 10v4.5M12 17v.01" />
    </>
  ),
  hero: <path d="m5 12.5 4.5 4.5L19 7" />,
}

/** Stiker miring ala stempel. Selalu bertuliskan teks, dan memakai ikon, bukan hanya warna. */
export function Sticker({
  kind,
  children,
  rot = -4,
  delay,
  index,
  className = '',
}: {
  kind: StickerKind
  children: ReactNode
  rot?: number
  /** ms; dipakai kalau stiker jalan sendiri (bukan di dalam blok reveal) */
  delay?: number
  /** urutan di dalam blok reveal (jeda 60 ms per stiker) */
  index?: number
  className?: string
}) {
  const style: Record<string, string | number> = { '--rot': `${rot}deg`, '--rot-from': `${rot - 10}deg` }
  if (delay !== undefined) style['--delay'] = `${delay}ms`
  if (index !== undefined) style['--i'] = index
  return (
    <span
      className={`stamp rounded-md border-2 px-2.5 py-1 font-display text-sm font-extrabold tracking-wide uppercase ${STICKER[kind]} ${className}`}
      style={vars(style)}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {STICKER_ICON[kind]}
      </svg>
      {children}
    </span>
  )
}

/* ---------- Tombol WhatsApp ---------- */

/**
 * CTA utama WhatsApp. Selalu latar indigo (token ember) dengan teks putih (9,54:1), di latar apa pun, dan hanya aksi
 * WhatsApp yang boleh terlihat seperti ini. Teks tinta di atas indigo gagal kontras (1,83:1).
 * Garis tepi mengikuti nada bagian (border-fg): tinta di permukaan terang, on-night di permukaan gelap. Indigo hanya
 * 1,57:1 terhadap night, jadi tanpa garis terang batas tombol hilang di penutup dan bar bawah HP; garis on-night 14,56:1.
 * Hover: indigo sedikit lebih terang, putih di atasnya 7,79:1. Aksi lain memakai tautan teks.
 * Label pendek supaya satu baris di HP; logo WhatsApp menunjukkan tujuannya, dan pembaca layar mendengar "lewat WhatsApp".
 */
export function Cta({
  lokasi,
  children = `Coba gratis ${TRIAL_DAYS} hari`,
  size = 'lg',
  messageFor,
  className = '',
}: {
  lokasi: CtaLocation
  children?: ReactNode
  size?: 'sm' | 'lg'
  /** Pesan WhatsApp khusus (mis. dari simulator). Bawaan: pesan umum. */
  messageFor?: (source: string) => string
  className?: string
}) {
  const source = useSource()
  const href = waLink((messageFor ?? generalMessage)(source))
  const dims = size === 'sm' ? 'min-h-11 px-5 text-sm whitespace-nowrap' : 'min-h-14 px-6 py-2.5 text-base leading-snug sm:px-7 sm:text-lg'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(lokasi)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-fg bg-ember text-center font-display font-bold text-white transition-[transform,background-color] duration-150 hover:bg-[#3546b5] active:translate-y-px ${dims} ${className}`}
    >
      <WhatsAppIcon className={size === 'sm' ? 'size-4 shrink-0' : 'size-5 shrink-0 sm:size-6'} />
      {children}
      <span className="sr-only"> lewat WhatsApp</span>
    </a>
  )
}

/** Nomor tampilan: 6281292567788 → +62 812-9256-7788. Panjang lain ditampilkan apa adanya. */
const displayNumber = (n: string) =>
  /^62\d{11}$/.test(n) ? `+62 ${n.slice(2, 5)}-${n.slice(5, 9)}-${n.slice(9)}` : `+${n}`

/** Browser bawaan aplikasi (TikTok, Threads/Instagram, Facebook, LINE, Android WebView, iOS WebView tanpa Safari). */
function isInAppBrowser(ua: string) {
  return (
    /musical_ly|Bytedance|TikTok|trill|Instagram|Barcelona|FBAN|FBAV|FB_IAB|Line\/|; wv\)/i.test(ua) ||
    (/iPhone|iPad|iPod/.test(ua) && !/Safari\//.test(ua))
  )
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Cadangan untuk WebView yang tidak mengizinkan Clipboard API.
    const t = document.createElement('textarea')
    t.value = text
    t.setAttribute('readonly', '')
    t.style.position = 'fixed'
    t.style.opacity = '0'
    document.body.appendChild(t)
    t.select()
    const ok = document.execCommand('copy')
    t.remove()
    return ok
  }
}

/**
 * Bantuan kalau tombol WhatsApp tidak membuka aplikasi WhatsApp. Browser bawaan TikTok dan Threads sering menahan
 * tautan wa.me di halaman web WhatsApp, jadi blok ini hanya muncul di browser bawaan aplikasi (dideteksi setelah
 * hidrasi, supaya HTML prerender tetap sama). Nomor yang disalin tidak membawa pesan dan kode sumber, jadi petunjuk
 * pertama tetap membuka halaman di browser.
 */
export function InAppWaHelp({ lokasi, compact = false, className = '' }: { lokasi: CtaLocation; compact?: boolean; className?: string }) {
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState<boolean | null>(null)
  useEffect(() => setShow(isInAppBrowser(navigator.userAgent)), [])
  if (!show) return null

  const onCopy = async () => {
    trackCopyNumber(lokasi)
    setCopied(await copyText(`+${WA_NUMBER}`))
  }
  const status = copied === null ? '' : copied ? 'Nomor tersalin.' : 'Gagal menyalin. Tekan lama nomornya untuk menyalin.'
  const button = (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex min-h-11 items-center font-semibold text-fg underline decoration-2 underline-offset-4"
    >
      Salin nomor admin
    </button>
  )

  if (compact) {
    return (
      <p className={`flex flex-wrap items-center justify-center gap-x-2 text-sm text-fg-2 ${className}`}>
        WhatsApp tidak terbuka? {button}
        <span aria-live="polite" className="w-full text-center">{status}</span>
      </p>
    )
  }
  return (
    <div className={`max-w-xl text-sm text-fg-2 ${className}`}>
      <p>
        <span className="font-semibold text-fg">WhatsApp tidak terbuka?</span> Ketuk menu titik tiga di pojok kanan atas,
        pilih buka di browser, lalu tekan tombolnya lagi.
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-x-3">
        <span>
          Atau simpan nomor admin: <span className="font-semibold text-fg tabular-nums select-all">{displayNumber(WA_NUMBER)}</span>
        </span>
        {button}
      </p>
      <p aria-live="polite" className="font-semibold text-fg">{status}</p>
    </div>
  )
}

/*
 * ---------- Ikon garis (tanpa emoji atau glyph unicode) ----------
 * Satu keluarga garis (viewBox 24, tebal 2 sampai 2,5, ujung bulat) agar semua ikon terbaca sebagai satu set.
 * Aturannya mengikuti DESIGN.md aplikasi: tidak memakai emoji atau glyph unicode sebagai ikon; centang dan panah bawah
 * sama bentuknya dengan set aplikasi (icons.tsx). Relevansi tiap ikon:
 *   ArrowDown = tautan yang menggulir ke simulator di bawahnya. Check = status selesai atau
 *   butir bukti. Shield = klaim privasi. Chevron = bagian yang bisa dibuka. Plus dan Minus = ubah angka per Rp1.000.
 * Satu pengecualian: logo WhatsApp di tombol WhatsApp. Itu tanda merek pihak ketiga (isian penuh, bukan garis), dipakai
 * supaya pengunjung langsung tahu tombolnya membuka WhatsApp. Path dari Simple Icons (CC0), warnanya mengikuti teks.
 */

type IconProps = { className?: string }
const base = { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const

export const WhatsAppIcon = ({ className = 'size-6' }: IconProps) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)
export const ArrowDownIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const CheckIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.5}>
    <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const ShieldIcon = ({ className = 'size-7' }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6L12 3Z" strokeLinejoin="round" />
    <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const ChevronIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const PlusIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)
export const MinusIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path d="M5 12h14" strokeLinecap="round" />
  </svg>
)
