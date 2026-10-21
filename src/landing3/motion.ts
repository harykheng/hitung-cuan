import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { startSaring } from './saring-driver'

/*
 * Semua gerak landing 3, dimuat setelah hidrasi (import dinamis di App.tsx). Satu jam: GSAP ticker menggerakkan Lenis
 * dan ScrollTrigger; tidak ada requestAnimationFrame atau listener scroll sendiri di sini.
 *  - Lenis hanya untuk pointer halus (mouse, trackpad) tanpa reduced motion. Di layar sentuh gulir tetap bawaan.
 *  - Kata kerja gerak: "dipilih lalu dirapikan". Kursor sel memilih (hero, navigasi, baris), isi yang dirapikan masuk
 *    dengan expo.out. Durasi 0,35 sampai 1,1 detik; benda besar lebih lambat dari benda kecil.
 *  - Reduced motion: tanpa Lenis, tanpa scrub, tanpa intro. Semua isi langsung tampil (CSS menangani sisanya).
 */
export function startMotion(): () => void {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  const html = document.documentElement
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
  const offs: (() => void)[] = []
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Document, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    el.addEventListener(type, fn as EventListener)
    offs.push(() => el.removeEventListener(type, fn as EventListener))
  }

  /* ---------- Gulir halus ---------- */
  let lenis: Lenis | null = null
  if (fine && !reduced) {
    lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis?.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    offs.push(() => {
      gsap.ticker.remove(raf)
      lenis?.destroy()
    })
    // Tautan jangkar: gulir lewat Lenis, lalu pindahkan fokus ke tujuan supaya keyboard ikut pindah.
    on(document, 'click', (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return
      const target = document.getElementById(a.hash.slice(1))
      if (!target) return
      e.preventDefault()
      const hdr = target.id === 'hero' ? 0 : parseFloat(getComputedStyle(html).scrollPaddingTop) || 72
      lenis?.scrollTo(target, { offset: -hdr, duration: 1.1 })
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      history.replaceState(null, '', a.hash)
    })
  }

  const ctx = gsap.context(() => {
    headerAway()
    nav()
    hero()
    splits()
    traces()
    reveals()
  })

  /* ---------- Bar atas menyingkir saat turun, kembali saat naik ---------- */
  function headerAway() {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => html.classList.toggle('hdr-away', self.direction === 1 && self.scroll() > 280),
    })
  }

  /* ---------- Navigasi: penanda kursor sel ---------- */
  function nav() {
    const navEl = document.querySelector<HTMLElement>('[data-nav]')
    const marker = navEl?.querySelector<HTMLElement>('.nav-marker')
    if (!navEl || !marker) return
    const links = [...navEl.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')]
    navEl.classList.add('has-marker')
    let current: HTMLAnchorElement | null = null
    const place = (a: HTMLAnchorElement | null) => {
      if (!a) return marker.style.setProperty('--mo', '0')
      marker.style.setProperty('--mx', `${a.offsetLeft}px`)
      marker.style.setProperty('--mw', `${a.offsetWidth}px`)
      marker.style.setProperty('--mo', '1')
    }
    for (const a of links) {
      on(a, 'pointerenter', () => place(a))
      on(a, 'focus', () => place(a))
      on(a, 'blur', () => place(current))
      const section = document.getElementById(a.dataset.navLink ?? '')
      if (!section) continue
      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            current?.removeAttribute('aria-current')
            current = a
            a.setAttribute('aria-current', 'true')
          } else if (current === a) {
            a.removeAttribute('aria-current')
            current = null
          }
          place(current)
        },
      })
    }
    on(navEl, 'pointerleave', () => place(current))
  }

  /* ---------- Hero: kursor sel pindah dari "omzet" ke "untung bersih", bilah rumus terketik ---------- */
  function hero() {
    const title = document.querySelector<HTMLElement>('[data-hero-title]')
    const from = title?.querySelector<HTMLElement>('[data-cell="from"]')
    const to = title?.querySelector<HTMLElement>('[data-cell="to"]')
    if (!title || !from || !to) return
    if (reduced) return title.classList.add('is-set')

    const fs = parseFloat(getComputedStyle(title).fontSize)
    const box = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      const t = title.getBoundingClientRect()
      return { x: r.left - t.left - 0.12 * fs, y: r.top - t.top - 0.02 * fs, width: r.width + 0.24 * fs, height: r.height + 0.06 * fs }
    }
    const ghost = document.createElement('span')
    ghost.className = 'cell-ghost'
    ghost.setAttribute('aria-hidden', 'true')
    title.appendChild(ghost)
    const done = () => {
      title.classList.add('is-set')
      ghost.remove()
    }
    gsap.set(ghost, { ...box(from), autoAlpha: 0 })
    gsap
      .timeline({ delay: 0.2, onComplete: done, onInterrupt: done })
      .fromTo('.formula-type', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'steps(30)' }, 0)
      .fromTo(ghost, { autoAlpha: 0, scale: 0.86 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, 0.1)
      .to(ghost, { ...box(to), duration: 0.8, ease: 'expo.inOut' }, 0.95)
  }

  /* ---------- Judul bagian: baris naik dari balik garis (sekali) ---------- */
  function splits() {
    if (reduced) return
    for (const el of document.querySelectorAll<HTMLElement>('[data-split]')) {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      })
    }
  }

  /* ---------- Cara kerja: panah "lacak sumber" tergambar mengikuti gulir ---------- */
  function traces() {
    if (reduced) return
    for (const step of document.querySelectorAll<HTMLElement>('.stair-step')) {
      const svg = step.querySelector<SVGSVGElement>('.trace')
      if (!svg || getComputedStyle(svg).display === 'none') continue
      gsap
        .timeline({ scrollTrigger: { trigger: step, start: 'top 70%', end: 'top 30%', scrub: 0.6 } })
        .fromTo(svg, { '--draw': 0 }, { '--draw': 1, ease: 'none', duration: 1 })
        .fromTo(step, { '--head': 0 }, { '--head': 1, ease: 'none', duration: 0.1 }, 0.9)
    }
  }

  /* ---------- Muncul sekali: dinding preview, bidang privasi, sel penutup, garis putus-putus placeholder ---------- */
  function reveals() {
    for (const shot of document.querySelectorAll<HTMLElement>('.shot.is-empty')) {
      if (reduced) break
      ScrollTrigger.create({ trigger: shot, start: 'top bottom', end: 'bottom top', toggleClass: 'is-live' })
    }
    const cell = document.querySelector<HTMLElement>('[data-closing-cell]')
    if (cell) {
      if (reduced) cell.classList.add('is-on')
      else ScrollTrigger.create({ trigger: cell, start: 'top 85%', once: true, onEnter: () => cell.classList.add('is-on') })
    }
    if (reduced) return
    gsap.from('.wall .shot', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: '.wall', start: 'top 80%', once: true },
    })
    gsap.from('.privacy', {
      clipPath: 'inset(5% 2.5% 0 2.5%)',
      duration: 1.2,
      ease: 'expo.out',
      clearProps: 'clipPath',
      scrollTrigger: { trigger: '.privacy', start: 'top 92%', once: true },
    })
  }

  /* ---------- Tombol WhatsApp: bidang kuning mengalir dari sisi pointer ---------- */
  if (fine) {
    for (const btn of document.querySelectorAll<HTMLElement>('[data-fill]')) {
      const set = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect()
        btn.style.setProperty('--fx', `${e.clientX - r.left}px`)
        btn.style.setProperty('--fy', `${e.clientY - r.top}px`)
      }
      on(btn, 'pointerenter', set)
      on(btn, 'pointerleave', set)
    }
  }

  offs.push(startSaring())

  // Ukuran huruf memengaruhi posisi pemicu; hitung ulang setelah font siap.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => {
    ctx.revert()
    for (const f of offs.splice(0)) f()
    html.classList.remove('hdr-away')
  }
}
