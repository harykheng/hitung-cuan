import type { CSSProperties, ReactNode } from 'react'
import { useSource } from '../lib/source'
import { trackCta, type CtaLocation } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'

/** Set properti CSS kustom (--i, --delay) tanpa error tipe. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

/*
 * Ritme latar: terang (paper / canvas / tint) untuk bagian isi, gelap (night) hanya untuk penutup.
 * Hero memakai gradasi indigo sendiri (.hero-bg).
 */
type Tone = 'paper' | 'canvas' | 'tint' | 'night'
const TONE: Record<Tone, string> = {
  paper: 'tone-light bg-paper text-fg',
  canvas: 'tone-light bg-canvas text-fg',
  tint: 'tone-light bg-tint text-fg',
  night: 'tone-dark bg-field-deep text-fg',
}

export function Section({
  id,
  tone = 'paper',
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
    <section id={id} aria-labelledby={labelledby} className={`${TONE[tone]} py-14 sm:py-20 lg:py-24 ${className}`}>
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
  final: 'bg-lime text-field-deep border-field-deep',
  takedown: 'bg-loss text-paper border-loss',
  kecil: 'bg-sun text-sun-ink border-sun-ink',
  aman: 'bg-lime text-field-deep border-field-deep',
  hero: 'bg-field text-lime border-field',
}

/** Ikon kecil per status, supaya status tidak hanya dibedakan lewat warna. */
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
  hero: <path d="m12 3.5 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3.5Z" />,
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
 * CTA utama WhatsApp. Selalu lime dengan teks gelap dan garis tepi gelap, di latar apa pun,
 * dan hanya aksi WhatsApp yang boleh terlihat seperti ini. Aksi lain memakai GhostLink atau tautan teks.
 */
export function Cta({
  lokasi,
  children = 'Minta uji coba gratis lewat WhatsApp',
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
  const dims = size === 'sm' ? 'min-h-11 px-5 text-sm' : 'min-h-14 px-6 py-2.5 text-base leading-snug sm:px-7 sm:text-lg'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(lokasi)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-lime text-center font-display font-bold text-ink shadow-[0_3px_0_0_#16173d] transition-[transform,background-color] duration-150 hover:bg-[#e3fb7d] active:translate-y-px active:shadow-[0_2px_0_0_#16173d] ${dims} ${className}`}
    >
      <ChatIcon className={size === 'sm' ? 'size-5 shrink-0' : 'size-6 shrink-0 max-[419px]:hidden'} />
      {children}
    </a>
  )
}

/** CTA sekunder: outline transparan, jelas kalah menonjol dari tombol lime. Untuk aksi non-WhatsApp. */
export function GhostLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-fg-2/60 px-5 py-2 text-center font-semibold text-fg transition-colors hover:border-fg hover:bg-fg/10 ${className}`}
    >
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
