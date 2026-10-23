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

/** Pesan bawaan semua tombol "Tanya akses". Sejak 23 Okt 2026 landing 3 menampilkan uji coba, jadi pesannya memintanya. */
export function generalMessage(source: string): string {
  return withCode(
    ['Halo admin HitungCuan, saya seller Shopee dan mau tanya akses dan uji coba gratis 30 hari HitungCuan untuk toko saya. Mohon info langkah selanjutnya.'],
    source,
  )
}

export function multiStoreMessage(source: string): string {
  return withCode(['Halo admin HitungCuan, saya punya lebih dari satu toko Shopee dan mau tanya soal HitungCuan.'], source)
}

export function simulatorMessage(
  p: { hpp: string; harga: string; roas: string; verdict: string },
  source: string,
): string {
  return withCode(
    [
      `Halo admin HitungCuan, saya sudah coba simulator di halaman kalian: modal Rp${p.hpp}, harga Rp${p.harga}, ROAS Shopee ${p.roas}, hasilnya "${p.verdict}". Saya mau minta uji coba gratis 30 hari untuk toko saya.`,
    ],
    source,
  )
}

export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
