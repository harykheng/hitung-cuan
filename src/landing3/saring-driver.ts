import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COLS, PRIVATE_W } from './content'

/*
 * Penggerak tunggal bagian "Saring" (lihat Saring.tsx). Satu objek `p` (empat angka 0..1) diisi oleh gulir, lalu
 * apply() menuliskannya ke CSS (--p1..--p4, --cam) dan menghitung kursor sel. Semua visual lembar membaca angka yang
 * sama, jadi tidak ada yang bisa tidak sinkron.
 *  - Bab 2..5 masing-masing menggerakkan satu angka saat judul babnya naik ke tengah layar (scrub).
 *  - Reduced motion: tanpa scrub; angka langsung 0 atau 1 saat bab dilewati, tanpa transisi.
 *  - Saat diam, lembar tidak bergerak dengan sengaja (DESIGN.md: gerak di bagian ini mengikuti gulir pembaca).
 */

const L = 3
const H = 5
const R = 4.6
const G = 3.5
const ROWS = 6

const sum = (kind: string) => COLS.filter((c) => c.kind === kind).reduce((a, c) => a + c.w, 0)
const firstPrivate = COLS.findIndex((c) => c.kind === 'private')
const PRIV_X = COLS.slice(0, firstPrivate).reduce((a, c) => a + c.w, 0)
const PRIV_W = COLS.filter((c) => c.kind === 'private').length * PRIVATE_W
const EXTRA_X = PRIV_X + PRIV_W
const EXTRA_W = sum('extra')
const RESULT_X = EXTRA_X - sum('order') + EXTRA_W
const RESULT_W = sum('result')
const FULL_W = COLS.reduce((a, c) => a + c.w, 0)
const BODY_H = H + ROWS * R

type Rect = [number, number, number, number]
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpRect = (a: Rect, b: Rect, t: number): Rect => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)]

export function startSaring(): () => void {
  const section = document.getElementById('saring')
  const sheet = section?.querySelector<HTMLElement>('[data-sheet]')
  const stage = section?.querySelector<HTMLElement>('[data-stage]')
  const cursor = section?.querySelector<HTMLElement>('[data-cursor]')
  const probe = sheet?.querySelector<HTMLElement>('.sh-probe')
  if (!section || !sheet || !stage || !cursor || !probe) return () => {}
  const chapters = [...section.querySelectorAll<HTMLElement>('[data-chapter]')]

  const p = { p1: 0, p2: 0, p3: 0, p4: 0 }
  let u = 7.2
  let visible = 100
  let step = -1

  const measure = () => {
    u = probe.getBoundingClientRect().width / 100 || 7.2
    visible = sheet.clientWidth / u - G
  }

  const apply = () => {
    const { p1, p2, p3, p4 } = p
    // Kamera: geser hanya kalau bagian yang sedang dibahas berada di luar layar (HP, tablet).
    let focus = 0
    focus = lerp(focus, EXTRA_X, p1)
    focus = lerp(focus, EXTRA_X + EXTRA_W, p2)
    focus = lerp(focus, RESULT_X + RESULT_W, p3)
    const cam = Math.max(0, focus - visible)

    let r: Rect = [0, L, Math.min(visible, FULL_W), H]
    r = lerpRect(r, [PRIV_X, L, PRIV_W, BODY_H], p1)
    r = lerpRect(r, [EXTRA_X, L, EXTRA_W, BODY_H], p2)
    r = lerpRect(r, [RESULT_X, L, RESULT_W, BODY_H], p3)
    r = lerpRect(r, [cam, 0, visible, L + BODY_H], p4)

    const s = sheet.style
    s.setProperty('--p1', p1.toFixed(4))
    s.setProperty('--p2', p2.toFixed(4))
    s.setProperty('--p3', p3.toFixed(4))
    s.setProperty('--p4', p4.toFixed(4))
    s.setProperty('--cam', cam.toFixed(3))
    const c = cursor.style
    c.translate = `${((r[0] - cam + G) * u).toFixed(1)}px ${(r[1] * u).toFixed(1)}px`
    c.width = `${(r[2] * u).toFixed(1)}px`
    c.height = `${(r[3] * u).toFixed(1)}px`

    const next = p4 > 0.5 ? 4 : p3 > 0.5 ? 3 : p2 > 0.5 ? 2 : p1 > 0.5 ? 1 : 0
    if (next !== step) {
      step = next
      stage.dataset.step = String(step)
    }
  }

  measure()
  apply()

  const keys = ['p1', 'p2', 'p3', 'p4'] as const
  const mm = gsap.matchMedia()
  // `all` selalu cocok: matchMedia hanya menjalankan fungsi kalau minimal satu kondisi benar (di HP tanpa reduced motion,
  // desk dan reduced sama-sama salah).
  mm.add({ all: '(min-width: 0px)', desk: '(min-width: 1024px)', reduced: '(prefers-reduced-motion: reduce)' }, (ctx) => {
    const { desk, reduced } = ctx.conditions as { desk: boolean; reduced: boolean }
    chapters.slice(1).forEach((ch, i) => {
      const key = keys[i]
      const trigger = ch.querySelector('.chapter-title') ?? ch
      if (reduced) {
        ScrollTrigger.create({
          trigger,
          start: desk ? 'top 60%' : 'top 80%',
          onEnter: () => ((p[key] = 1), apply()),
          onLeaveBack: () => ((p[key] = 0), apply()),
        })
        return
      }
      gsap.to(p, {
        [key]: 1,
        ease: 'none',
        onUpdate: apply,
        scrollTrigger: {
          trigger,
          start: desk ? 'top 88%' : 'top 98%',
          end: desk ? 'top 48%' : 'top 72%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
    })
    return () => {
      for (const k of keys) p[k] = 0
      apply()
    }
  })

  const ro = new ResizeObserver(() => {
    measure()
    apply()
  })
  ro.observe(sheet)

  return () => {
    ro.disconnect()
    mm.revert()
  }
}
