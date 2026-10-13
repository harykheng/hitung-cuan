import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Angka yang berjalan ke nilai baru (bukan loop). Render pertama (SSR/hidrasi) = nilai akhir.
 * `mountFrom`: kalau diisi, animasi mulai dari angka itu sekali setelah `enabled` jadi true.
 * Reduced motion: langsung nilai akhir.
 */
export function useAnimatedNumber(
  target: number,
  opts: { duration?: number; delay?: number; mountFrom?: number; enabled?: boolean } = {},
): number {
  const { duration = 250, delay = 0, mountFrom, enabled = true } = opts
  const [shown, setShown] = useState(target)
  const shownRef = useRef(target)
  const started = useRef(false)
  const raf = useRef(0)
  const timer = useRef(0)

  useLayoutEffect(() => {
    if (!enabled) return
    let from = shownRef.current
    let wait = 0
    if (!started.current) {
      started.current = true
      if (mountFrom !== undefined) {
        from = mountFrom
        wait = delay
        shownRef.current = from
        setShown(from)
      }
    }
    if (from === target) return
    if (prefersReducedMotion()) {
      shownRef.current = target
      setShown(target)
      return
    }
    const run = () => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const v = from + (target - from) * easeOut(p)
        shownRef.current = v
        setShown(v)
        if (p < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }
    if (wait > 0) timer.current = window.setTimeout(run, wait)
    else run()
    return () => {
      cancelAnimationFrame(raf.current)
      window.clearTimeout(timer.current)
    }
  }, [target, duration, delay, mountFrom, enabled])

  return shown
}

/**
 * Menambah kelas `is-in` ke setiap [data-reveal] sekali saat masuk layar.
 * CSS menyembunyikan elemen hanya kalau <html> punya kelas `js` (di-set di <head>), jadi
 * tanpa JavaScript atau dengan reduced motion semua konten tetap terlihat.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** True sekali elemen mencapai `threshold` terlihat. */
export function useInViewOnce<T extends Element>(threshold = 0.4): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}
