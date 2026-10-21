import { useEffect, useRef, useState } from 'react'
import { CTA_LABEL_SHORT, NAV } from '../content'
import { CloseIcon, Container, Cta, MenuIcon } from './ui'

/**
 * Tautan lewati navigasi: tersembunyi di luar layar sampai mendapat fokus keyboard (Tab pertama).
 * Memakai translate, bukan sr-only, supaya ukurannya tetap 44px. Sengaja tidak berwarna ember:
 * ember hanya untuk aksi WhatsApp.
 */
export function SkipLink() {
  return (
    <a
      href="#utama"
      className="fixed top-2 left-2 z-[60] inline-flex min-h-11 -translate-y-[200%] items-center rounded-full border-2 border-ink bg-paper px-5 font-semibold text-ink underline decoration-2 underline-offset-4 focus:translate-y-0"
    >
      Lewati ke konten utama
    </a>
  )
}

/** Bagian yang sedang terbaca (untuk penanda di navigasi). Kosong di atas bagian pertama. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length || !('IntersectionObserver' in window)) return
    const visible = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        // Urutan halaman, bukan urutan menu: yang paling atas di antara yang terlihat.
        const order = [...els].sort((a, b) => a.offsetTop - b.offsetTop)
        setActive(order.find((el) => visible.get(el.id))?.id ?? '')
      },
      // Garis baca: pita tipis sepertiga dari atas layar.
      { rootMargin: '-30% 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

/**
 * Bar atas menempel: logo, tiga tautan bagian, dan satu tombol WhatsApp.
 * Dari 768px tautan tampil sejajar. Di bawahnya tautan pindah ke panel "Menu" yang turun dari bar (tidak menutup layar
 * penuh dan tidak menggeser isi). Escape dan klik tautan menutupnya, lalu fokus kembali ke tombol Menu.
 */
const NAV_IDS = NAV.map((n) => n.id)

export function TopBar() {
  const active = useActiveSection(NAV_IDS)
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    const onResize = () => window.matchMedia('(min-width: 768px)').matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const link = (n: (typeof NAV)[number], mobile = false) => (
    <a
      key={n.id}
      href={n.href}
      aria-current={active === n.id ? 'true' : undefined}
      onClick={mobile ? () => setOpen(false) : undefined}
      className={
        mobile
          ? 'flex min-h-12 items-center border-b border-rule text-lg font-semibold last:border-b-0 aria-[current]:text-accent'
          : 'nav-link inline-flex min-h-11 items-center px-1 font-semibold text-fg-2 hover:text-fg aria-[current]:text-fg'
      }
    >
      {n.label}
    </a>
  )

  return (
    <header className="tone-light sticky top-0 z-50 border-b border-rule bg-canvas">
      <Container className="flex h-16 items-center gap-3">
        <a href="/" className="mr-auto inline-flex min-h-11 min-w-0 items-center rounded-md" aria-label="HitungCuan, ke atas">
          {/* Di bawah 360px hanya tanda logo, supaya tombol Menu dan WhatsApp muat tanpa logo mengecil sampai tak terbaca. */}
          <img src="/favicon.svg" alt="" width={28} height={28} className="size-7 min-[360px]:hidden" />
          <img src="/logo/logo-horizontal.svg" alt="" width={165} height={28} className="hidden h-6 w-auto max-w-full object-contain object-left min-[360px]:block sm:h-7" />
        </a>
        <nav aria-label="Bagian halaman" className="hidden md:block">
          <div className="flex items-center gap-6 lg:gap-8">{NAV.map((n) => link(n))}</div>
        </nav>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="menu-hp"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-control text-fg md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{open ? 'Tutup menu' : 'Menu'}</span>
        </button>
        <Cta lokasi="bar_atas" size="sm" className="shrink-0 md:ml-4">
          {CTA_LABEL_SHORT}
        </Cta>
      </Container>
      <nav
        id="menu-hp"
        aria-label="Bagian halaman"
        hidden={!open}
        className="border-t border-rule bg-canvas shadow-sheet md:hidden"
      >
        <Container className="py-2">{NAV.map((n) => link(n, true))}</Container>
      </nav>
    </header>
  )
}
