import { useEffect, useRef, useState } from 'react'
import { CTA_LABEL_SHORT, NAV } from './content'
import { Cta, vars } from './ui'

/*
 * Bar atas: logo, tiga tautan bagian, tombol "Tanya akses". Penanda kuning (kursor sel) meluncur ke tautan yang disentuh
 * dan berhenti di bagian yang sedang dibaca (aria-current, diatur motion.ts). Bar menyingkir saat menggulir turun dan
 * kembali saat menggulir naik atau saat ada fokus di dalamnya.
 * Di bawah 768px tautan pindah ke panel "Menu" layar penuh: fokus terkunci di dalam, Escape dan klik tautan menutupnya.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const root = panel.current
    const focusables = () => [...(root?.querySelectorAll<HTMLElement>('a[href], button') ?? [])]
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const f = [btn.current!, ...focusables()]
      const i = f.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && i <= 0) {
        e.preventDefault()
        f[f.length - 1].focus()
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault()
        f[0].focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="hdr">
      <div className="l3-wrap hdr-in">
        <a href="#hero" className="hdr-logo" aria-label="HitungCuan, ke atas halaman">
          <img src="/logo/logo-horizontal.svg" alt="" width="742" height="126" className="hdr-logo-full" />
          <img src="/favicon.svg" alt="" width="32" height="32" className="hdr-logo-mark" />
        </a>

        <nav aria-label="Bagian halaman" className="hdr-nav" data-nav>
          <span className="nav-marker" aria-hidden="true" />
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} data-nav-link={n.id} className="nav-link">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hdr-act">
          <Cta lokasi="bar_atas" size="sm">
            {CTA_LABEL_SHORT}
          </Cta>
          <button
            ref={btn}
            type="button"
            className="hdr-menu"
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="hdr-menu-label">{open ? 'Tutup' : 'Menu'}</span>
            <span className="hdr-menu-bars" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="menu-panel" ref={panel} className="menu" hidden={!open}>
        <nav aria-label="Menu" className="l3-wrap menu-in">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} className="menu-link" style={vars({ '--i': i })} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <Cta lokasi="menu" className="menu-cta" />
        </nav>
      </div>
    </header>
  )
}
