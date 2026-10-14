import { useEffect, useRef, useState } from 'react'
import { Container, Cta } from './ui'

/**
 * Tautan lewati navigasi: tersembunyi di luar layar sampai mendapat fokus keyboard (Tab pertama).
 * Memakai translate, bukan sr-only, supaya ukurannya tetap 44px. Sengaja tidak berwarna lime:
 * lime hanya untuk aksi WhatsApp.
 */
export function SkipLink() {
  return (
    <a
      href="#utama"
      className="fixed top-2 left-2 z-[60] inline-flex min-h-11 -translate-y-[200%] items-center rounded-full border-2 border-field bg-paper px-5 font-semibold text-ink underline decoration-2 underline-offset-4 focus:translate-y-0 focus-visible:outline-lime"
    >
      Lewati ke konten utama
    </a>
  )
}

/** Bar atas menempel: nama + satu tombol. Tidak ada menu lain. */
export function TopBar() {
  return (
    <header className="tone-dark sticky top-0 z-50 border-b border-rule bg-field-deep">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="/" className="inline-flex min-h-11 items-center rounded-md font-display text-2xl font-extrabold tracking-tight text-fg" aria-label="HitungCuan, ke atas">
          Hitung<span className="text-accent">Cuan</span>
        </a>
        <Cta lokasi="bar_atas" size="sm">
          Minta uji coba
        </Cta>
      </Container>
    </header>
  )
}

/** Di HP: bar bawah menempel dengan satu tombol, muncul setelah hero lewat dari layar. */
export function BottomBar() {
  const [show, setShow] = useState(false)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  // Fokus keyboard tidak boleh berakhir di balik bar ini. scroll-padding saja tidak cukup: browser tidak menggulir
  // elemen yang sebagian sudah terlihat. Hanya untuk fokus keyboard (:focus-visible), supaya ketukan jari tidak
  // menggeser halaman di antara tekan dan lepas.
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const b = bar.current
      const t = e.target
      if (!b || !(t instanceof HTMLElement) || b.contains(t) || getComputedStyle(b).visibility === 'hidden') return
      if (!t.matches(':focus-visible')) return
      const overlap = t.getBoundingClientRect().bottom - b.getBoundingClientRect().top
      if (overlap > 0) window.scrollBy({ top: overlap + 16, behavior: 'instant' })
    }
    document.addEventListener('focusin', onFocus)
    return () => document.removeEventListener('focusin', onFocus)
  }, [])

  return (
    <div
      ref={bar}
      aria-hidden={!show}
      className={`tone-dark fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-field-deep px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-[transform,visibility] duration-300 sm:hidden ${
        show ? 'visible translate-y-0' : 'invisible translate-y-full'
      }`}
    >
      <Cta lokasi="bar_bawah" className="w-full">
        Minta uji coba gratis
      </Cta>
    </div>
  )
}
