/**
 * Rumus simulator, sama dengan src/lib/adsMath.ts di aplikasi (PANDUAN bagian 9).
 * Jangan diubah tanpa mengubah aplikasi. Semua dihitung di browser.
 */
export const DEFAULT_ADMIN = 0.0825
export const XTRA = 0.04
export const PROSES = 1250
export const TARGET = 0.05

export type AdsInput = { hpp: number; harga: number; roas: number; admin?: number }

export type AdsResult = {
  /** Uang yang cair dari Shopee per order (sebelum modal) */
  penghasilan: number
  untung: number
  margin: number
  /** ROAS balik modal, null kalau untung per order <= 0 */
  balikModal: number | null
  /** ROAS untuk untung 5% setelah iklan, null kalau margin <= target atau > 50 (tidak mungkin) */
  target: number | null
  biayaIklan: number
  setelahIklan: number
  verdict: Verdict
}

export type Verdict = 'takedown' | 'kecil' | 'aman'

export const VERDICT_LABEL: Record<Verdict, string> = {
  takedown: 'Takedown',
  kecil: 'ROAS terlalu kecil',
  aman: 'Aman',
}

export function hitung({ hpp, harga, roas, admin = DEFAULT_ADMIN }: AdsInput): AdsResult {
  const penghasilan = harga - admin * harga - XTRA * harga - PROSES
  const untung = penghasilan - hpp // per order, sebelum iklan
  const margin = untung / harga
  const balikModal = untung > 0 ? harga / untung : null
  const rawTarget = margin > TARGET ? 1 / (margin - TARGET) : null
  const target = rawTarget !== null && rawTarget <= 50 ? rawTarget : null
  const biayaIklan = harga / roas // per order
  const setelahIklan = untung - biayaIklan // per order

  let verdict: Verdict
  if (balikModal === null || roas < balikModal) verdict = 'takedown'
  else if (target === null || roas < target) verdict = 'kecil'
  else verdict = 'aman'

  return { penghasilan, untung, margin, balikModal, target, biayaIklan, setelahIklan, verdict }
}
