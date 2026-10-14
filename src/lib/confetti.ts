/** Confetti kertas satu kali per kunjungan, murni transform + opacity (CSS keyframes `confetti`). */
let fired = false

// Warna dari palet yang sama (lime, putih, sun, on-field-muted) ditambah coral-soft dari DESIGN.md aplikasi.
const COLORS = ['#d7f45a', '#ffffff', '#f5d547', '#ff9b85', '#c3c5f2']
// Sudut dan jarak tetap (bukan acak) supaya hasilnya konsisten dan bisa dites.
const PIECES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (i % 2) * 0.2
  const dist = 54 + ((i * 37) % 46)
  return {
    dx: Math.round(Math.cos(angle) * dist),
    dy: Math.round(Math.sin(angle) * dist - 28),
    rot: (i * 83) % 360,
    color: COLORS[i % COLORS.length],
    w: 6 + (i % 3) * 2,
  }
})

export function burstConfetti(origin: HTMLElement | null): void {
  if (fired || !origin) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  fired = true
  const box = document.createElement('span')
  box.setAttribute('aria-hidden', 'true')
  box.className = 'confetti'
  for (const p of PIECES) {
    const s = document.createElement('span')
    s.style.cssText = `--dx:${p.dx}px;--dy:${p.dy}px;--r:${p.rot}deg;width:${p.w}px;height:${Math.round(p.w * 1.6)}px;background:${p.color}`
    box.appendChild(s)
  }
  origin.appendChild(box)
  window.setTimeout(() => box.remove(), 900)
}
