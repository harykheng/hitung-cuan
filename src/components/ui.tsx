import type { CSSProperties, ReactNode } from 'react'
import { useSource } from '../lib/source'
import { trackCta, type CtaLocation } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'

/** Set properti CSS kustom (--i, --delay) tanpa error tipe. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

type Tone = 'field' | 'deep' | 'lime' | 'paper'
const TONE: Record<Tone, string> = {
  field: 'bg-field text-on-field',
  deep: 'bg-field-deep text-on-field',
  lime: 'on-lime bg-lime text-field-deep',
  paper: 'on-paper bg-paper text-ink',
}

export function Section({
  id,
  tone = 'field',
  labelledby,
  children,
  className = '',
}: {
  id?: string
  tone?: Tone
  labelledby?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledby} className={`${TONE[tone]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function H2({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`max-w-3xl font-display text-3xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl ${className}`}
    >
      {children}
    </h2>
  )
}

/** Penanda angka rekaan. Semua angka demo wajib berlabel ini. */
export function ExampleTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-current px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${className}`}
    >
      Contoh
    </span>
  )
}

type StickerKind = 'final' | 'takedown' | 'kecil' | 'aman' | 'hero'
const STICKER: Record<StickerKind, string> = {
  final: 'bg-lime text-field-deep border-field-deep',
  takedown: 'bg-loss text-paper border-loss',
  kecil: 'bg-sun text-sun-ink border-sun-ink',
  aman: 'bg-lime text-field-deep border-field-deep',
  hero: 'bg-field text-lime border-field',
}

/** Stiker miring ala stempel. Selalu bertuliskan teks, bukan hanya warna. */
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
      {children}
    </span>
  )
}

/* ---------- Tombol WhatsApp ---------- */

type CtaVariant = 'lime' | 'blue'

export function Cta({
  lokasi,
  children = 'Chat WhatsApp, tanya cara mulai',
  variant = 'lime',
  size = 'lg',
  messageFor,
  className = '',
}: {
  lokasi: CtaLocation
  children?: ReactNode
  variant?: CtaVariant
  size?: 'sm' | 'lg'
  /** Pesan WhatsApp khusus (mis. dari simulator). Bawaan: pesan umum. */
  messageFor?: (source: string) => string
  className?: string
}) {
  const source = useSource()
  const href = waLink((messageFor ?? generalMessage)(source))
  const look =
    variant === 'lime'
      ? 'bg-lime text-field-deep shadow-[0_3px_0_0_#0f1150] hover:bg-[#e3fb7d]'
      : 'bg-btn text-paper shadow-[0_3px_0_0_#0f1150] hover:bg-[#4a4fcc]'
  const dims = size === 'sm' ? 'min-h-11 px-5 text-sm' : 'min-h-14 px-7 text-base sm:text-lg'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(lokasi)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full text-center font-display font-bold transition-transform duration-150 active:scale-[0.97] ${dims} ${look} ${className}`}
    >
      <ChatIcon className={size === 'sm' ? 'size-5' : 'size-6'} />
      {children}
    </a>
  )
}

/* ---------- Ikon garis (tanpa emoji atau glyph unicode) ---------- */

type IconProps = { className?: string }
const base = { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const

export const ChatIcon = ({ className = 'size-6' }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 19.5 5.3 15.6A8 8 0 1 1 8.4 18.7L4 19.5Z" strokeLinejoin="round" />
    <path d="M9 10.5h6M9 13.5h4" strokeLinecap="round" />
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
export const FileIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 3h7l5 5v13H7V3Z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
)
export const ReplayIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 12a8 8 0 1 0 2.6-5.9L4 8.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4v4.5h4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
