import { DEFAULT_SOURCE, WA_NUMBER } from '../config'

export type SignupData = {
  nama: string
  toko: string
  omzet: string
  iklan: 'Ya' | 'Tidak'
}

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

export function buildSignupMessage(data: SignupData, source: string): string {
  return [
    'Halo, saya mau coba gratis HitungCuan.',
    `Nama: ${data.nama}`,
    `Toko: ${data.toko}`,
    `Omzet/bulan: ${data.omzet}`,
    `Pakai iklan Shopee: ${data.iklan}`,
    `Kode: HC-${source}`,
  ].join('\n')
}

export function buildMultiStoreMessage(source: string): string {
  return ['Halo, saya punya lebih dari satu toko Shopee dan mau tanya soal HitungCuan.', `Kode: HC-${source}`].join('\n')
}

export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
