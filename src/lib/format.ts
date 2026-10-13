/** Pemformat manual (tanpa Intl) supaya HTML prerender di Node dan hasil di browser selalu sama. */

/** Rupiah bulat dengan titik ribuan: 30000 → "30.000". Pembulatan .5 ke atas, sama dengan aplikasi. */
export function num(n: number): string {
  const r = Math.round(n)
  const s = String(Math.abs(r)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return r < 0 ? `-${s}` : s
}

/** "-Rp1.000" untuk negatif (tanda minus di depan Rp). */
export const rp = (n: number): string => {
  const r = Math.round(n)
  return r < 0 ? `-Rp${num(-r)}` : `Rp${num(r)}`
}

/** Angka dengan koma desimal: (7.5155, 2) → "7,52" */
export function dec(n: number, digits = 2): string {
  return n.toFixed(digits).replace('.', ',')
}

/** Juta dengan dua desimal: 3.42 → "Rp3,42 juta" */
export const juta = (n: number): string => `Rp${dec(n, 2)} juta`
