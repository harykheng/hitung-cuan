import type { CSSProperties, ReactNode } from 'react'
import { useSource } from '../lib/source'
import { trackCta, type CtaLocation } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from '../components/ui'
import { CTA_LABEL, type ScreenSlot } from './content'

/** Set properti CSS kustom (--b, --r, ...) tanpa error tipe. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties

/** Pembungkus selebar grid 12 kolom (garis kolom di hero memakai grid yang sama). */
export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`l3-wrap ${className}`}>{children}</div>
}

/**
 * Tombol WhatsApp landing 3. Diam: pil indigo, teks putih (9,54:1). Disentuh: bidang kuning "sel terpilih" mengalir dari
 * sisi pointer dan teks berganti tinta (tinta di atas sun 12,07:1). Alirannya diatur motion.ts; tanpa JS, :active dan
 * :focus-visible memakai keadaan penuh. Hanya aksi WhatsApp yang tampak seperti ini.
 */
export function Cta({
  lokasi,
  children = CTA_LABEL,
  size = 'lg',
  className = '',
}: {
  lokasi: CtaLocation
  children?: ReactNode
  size?: 'sm' | 'lg' | 'xl'
  className?: string
}) {
  const source = useSource()
  return (
    <a
      href={waLink(generalMessage(source))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(lokasi)}
      data-fill
      className={`cta cta-${size} ${className}`}
    >
      <span className="cta-fill" aria-hidden="true" />
      <WhatsAppIcon className="cta-icon" />
      <span className="cta-label">{children}</span>
      <span className="sr-only"> lewat WhatsApp</span>
    </a>
  )
}

/** Penanda angka rekaan. Semua angka demo wajib berlabel ini. */
export function Contoh({ className = '' }: { className?: string }) {
  return <span className={`contoh ${className}`}>Contoh</span>
}

/*
 * Bingkai screenshot. Tanpa gambar, bingkainya adalah "rentang yang disalin dan menunggu ditempel": garis putus-putus
 * yang berjalan pelan (satu-satunya gerak saat diam selain kursor rumus di hero, mati di reduced motion). Judul layar dan
 * kode placeholder tertulis jelas supaya tidak dikira tampilan asli.
 *
 * Dengan gambar: label "Contoh" selalu tampil di bilah alamat, karena screenshot memuat angka toko (aturan repo: setiap
 * angka demo berlabel Contoh). Kalau `srcMobile` diisi, layar di bawah 768px memakai potongan khusus HP lewat <picture>,
 * supaya tulisan di screenshot tetap terbaca (screenshot desktop di HP mengecil sekitar 4 kali).
 * Dari 768px, bingkai tidak pernah lebih lebar dari ukuran asli gambar (--nat): screenshot yang diperbesar terlihat pecah.
 */
export const SHOT_MOBILE_QUERY = '(max-width: 767px)'

export function Shot({ slot, priority = false, className = '' }: { slot: ScreenSlot; priority?: boolean; className?: string }) {
  return (
    <figure
      id={slot.id}
      className={`shot ${slot.src ? 'has-img' : 'is-empty'} ${className}`}
      style={slot.src && slot.width ? vars({ '--nat': `${slot.width}px` }) : undefined}
    >
      <div className="shot-bar">
        <span className="shot-url" aria-hidden="true">
          app.studioharel.id
        </span>
        {slot.src && <Contoh className="shot-contoh" />}
      </div>
      {slot.src ? (
        <picture>
          {slot.srcMobile && (
            <source media={SHOT_MOBILE_QUERY} srcSet={slot.srcMobile} width={slot.widthMobile} height={slot.heightMobile} />
          )}
          <img
            src={slot.src}
            alt={slot.alt}
            width={slot.width}
            height={slot.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="shot-img"
          />
        </picture>
      ) : (
        <div className="shot-empty" role="img" aria-label={`Placeholder screenshot: ${slot.alt}`}>
          <span className="shot-title">{slot.title}</span>
          <span className="shot-note">Screenshot aplikasi menyusul</span>
          <code className="shot-code">[{slot.placeholder}]</code>
        </div>
      )}
      <figcaption className="shot-cap">
        {slot.title}
        {slot.src && <span className="shot-cap-note">. Data toko contoh, bukan hasil pengguna.</span>}
      </figcaption>
    </figure>
  )
}

/* Ikon garis kecil, keluarga yang sama dengan components/ui.tsx (viewBox 24, tebal 2, ujung bulat). */
const base = { 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const
type IconProps = { className?: string }

export const ArrowDown = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const PlusMinus = ({ className = 'size-6' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path className="pm-v" d="M12 5v14" strokeLinecap="round" />
    <path d="M5 12h14" strokeLinecap="round" />
  </svg>
)
/** Browser: file dibaca di perangkat. */
export const BrowserIcon = ({ className = 'size-8' }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M3 9h18M6.5 6.75h.01M9 6.75h.01" strokeLinecap="round" />
  </svg>
)
/** Kolom dilewati: sel diarsir. */
export const SkipIcon = ({ className = 'size-8' }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16M15 4v16M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
  </svg>
)
/** Disimpan: tumpukan data. */
export const StoreIcon = ({ className = 'size-8' }: IconProps) => (
  <svg {...base} className={className}>
    <ellipse cx="12" cy="6" rx="7.5" ry="2.75" />
    <path d="M4.5 6v6c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6M4.5 12v6c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-6" />
  </svg>
)
/** Tautan keluar (halaman pembayaran Lynk.id). */
export const ExternalIcon = ({ className = 'size-5' }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.25}>
    <path d="M8 16 16 8M9.5 8H16v6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
