import { useEffect, useState } from 'react'
import { Container, Cta } from './ui'

/** Bar atas menempel: nama + satu tombol. Tidak ada menu lain. */
export function TopBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-on-field/10 bg-field">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="/" className="rounded-md font-display text-2xl font-extrabold tracking-tight" aria-label="HitungCuan, ke atas">
          Hitung<span className="text-lime">Cuan</span>
        </a>
        <Cta lokasi="bar_atas" size="sm">
          Minta uji coba
        </Cta>
      </Container>
    </div>
  )
}

/** Di HP: bar bawah menempel dengan satu tombol, muncul setelah hero lewat dari layar. */
export function BottomBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-on-field/10 bg-field-deep px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-[transform,visibility] duration-300 sm:hidden ${
        show ? 'visible translate-y-0' : 'invisible translate-y-full'
      }`}
    >
      <Cta lokasi="bar_bawah" className="w-full">
        Minta uji coba gratis
      </Cta>
    </div>
  )
}
