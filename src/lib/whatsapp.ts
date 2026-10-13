import { DEFAULT_SOURCE, WA_NUMBER } from '../config'

/** Ambil ?src= dari URL: huruf besar, hanya A-Z 0-9 _ -, maks 24 karakter. */
export function getSourceCode(search: string): string {
  const raw = new URLSearchParams(search).get('src') ?? ''
  const clean = raw
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '')
    .slice(0, 24)
  return clean || DEFAULT_SOURCE
}

const withCode = (lines: string[], source: string) => [...lines, `Kode: HC-${source}`].join('\n')

export function generalMessage(source: string): string {
  return withCode(
    ['Halo, saya seller Shopee dan tertarik mencoba HitungCuan untuk toko saya. Bisa dijelaskan cara mulai dan harganya?'],
    source,
  )
}

export function multiStoreMessage(source: string): string {
  return withCode(['Halo, saya punya lebih dari satu toko Shopee dan mau tanya soal HitungCuan.'], source)
}

export function simulatorMessage(
  p: { hpp: string; harga: string; roas: string; verdict: string },
  source: string,
): string {
  return withCode(
    [
      `Halo, saya coba simulasi di HitungCuan: modal Rp${p.hpp}, harga Rp${p.harga}, ROAS Shopee ${p.roas} → hasilnya "${p.verdict}". Saya mau coba HitungCuan untuk toko saya.`,
    ],
    source,
  )
}

export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
