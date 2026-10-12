import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { LazyMotion, MotionConfig, animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

/**
 * Pola gerak terinspirasi componentry (https://github.com/harshjdhv/componentry, MIT):
 * split-flap (angka berputar), letter-cascade (muncul bertahap), sticky-scroll-cards (progres saat scroll).
 * Ditulis ulang tanpa foto stock, lenis, atau efek hover-only karena penontonnya di HP.
 */
const loadFeatures = () => import('../lib/motionFeatures').then((mod) => mod.default)

/** `reducedMotion="user"` mematikan gerakan transform kalau perangkat meminta lebih sedikit animasi. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const

type Tag = 'div' | 'li' | 'article' | 'p' | 'blockquote'

/** Muncul sekali saat masuk layar. Hanya untuk konten di bawah layar pertama (jangan untuk hero/LCP). */
export function Reveal({
  as = 'div',
  delay = 0,
  y = 18,
  className,
  children,
}: {
  as?: Tag
  delay?: number
  y?: number
  className?: string
  children: ReactNode
}) {
  const Component = m[as] as typeof m.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

/** Garis bawah yang "digambar" saat teks masuk layar. */
export function Underline({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <m.span
      className="bg-bottom bg-no-repeat pb-0.5 [background-image:linear-gradient(var(--color-ink),var(--color-ink))]"
      initial={{ backgroundSize: '0% 0.14em' }}
      whileInView={{ backgroundSize: '100% 0.14em' }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </m.span>
  )
}

/** Garis penghubung antar langkah; tumbuh saat langkahnya terlihat. */
export function ConnectorLine({ className }: { className: string }) {
  return (
    <m.span
      aria-hidden="true"
      className={className}
      initial={{ scaleX: 0, scaleY: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, margin: '0px 0px -25% 0px' }}
      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
    />
  )
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** Satu kolom digit: angka akhir (tak terlihat) jadi pengukur lebar; strip 0–9 berputar sampai angka akhir. */
function RollingDigit({ digit, delay }: { digit: number; delay: number }) {
  const y = useMotionValue(0)
  const translateY = useTransform(y, (v) => `${v}%`)

  useEffect(() => {
    const controls = animate(y, -digit * 10, { duration: 1.1, delay, ease: EASE })
    return () => controls.stop()
  }, [digit, delay, y])

  return (
    <span className="relative inline-block h-[1.12em] overflow-hidden align-bottom leading-[1.12]">
      <span className="invisible">{digit}</span>
      <m.span className="absolute inset-x-0 top-0 flex flex-col text-center" style={{ y: translateY }}>
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1.12em] leading-[1.12]">
            {d}
          </span>
        ))}
      </m.span>
    </span>
  )
}

/**
 * Angka rupiah yang berputar dari 0 ke nilai akhir ala papan flip.
 * HTML prerender, reduced-motion, dan JS-mati menampilkan teks biasa; strip putar baru dipasang di klien sebelum paint.
 */
export function RollingRupiah({ value }: { value: string }) {
  const reduce = useReducedMotion()
  const [armed, setArmed] = useState(false)

  useLayoutEffect(() => {
    if (!reduce) setArmed(true)
  }, [reduce])

  if (!armed) return <>{value}</>

  const chars = value.split('')
  const digitCount = chars.filter((c) => /\d/.test(c)).length
  let seen = 0

  return (
    <span role="img" aria-label={value}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) return <span key={i} aria-hidden="true">{c}</span>
        // Digit paling kanan selesai duluan seperti odometer; kiri menyusul.
        const order = digitCount - 1 - seen++
        return (
          <span key={i} aria-hidden="true">
            <RollingDigit digit={Number(c)} delay={0.15 + order * 0.07} />
          </span>
        )
      })}
    </span>
  )
}
