import { ExampleTag, H2, Hy, Section, vars } from './ui'

/*
 * Masalah + momen khas halaman: pita "dari setiap Rp100 omzet". Saat masuk layar, pita omzet dipotong satu per satu
 * (potongan Shopee, modal, iklan, biaya lain) sampai tersisa bagian untung. Tiap potongan menyebut di laporan mana ia
 * tercatat, karena itulah masalahnya: angkanya tersebar.
 * Warna: biaya memakai skala netral (bukan warna status), hanya sisa untung yang hijau (gain = untung).
 * Angka toko rekaan, sama dengan kartu hero (lihat Hero.tsx). Jumlah = 100.
 */
const CUTS = [
  { label: 'Potongan Shopee', value: 18, where: 'Laporan penghasilan', bar: 'bg-ink-3' },
  { label: 'Modal barang (HPP)', value: 49, where: 'Catatan modal milikmu', bar: 'bg-ink' },
  { label: 'Iklan Shopee', value: 13, where: 'File data iklan', bar: 'bg-ink-2' },
  { label: 'Packaging dan biaya lain', value: 5, where: 'Catatan biaya milikmu', bar: 'bg-control' },
] as const
const PROFIT = 100 - CUTS.reduce((a, c) => a + c.value, 0)

export function Problem() {
  return (
    <Section tone="paper" size="lg" labelledby="masalah-judul">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <H2 id="masalah-judul">Omzet ramai belum tentu uangnya benar<Hy />benar jadi untung.</H2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-fg-2">
            Uang yang cair sudah dipotong Shopee. Modal barang, iklan, retur, dan packaging belum dikurangi. Semuanya
            tercatat di laporan yang berbeda, jadi wajar kalau rekap manual sering tidak cocok dengan saldo.
          </p>
        </div>

        <figure data-reveal className="tone-light self-center" style={vars({ '--step': '160ms' })}>
          <figcaption className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold">Dari setiap Rp100 omzet toko contoh</span>
            <ExampleTag />
          </figcaption>

          {/* Pita: dekoratif, angka lengkapnya ada di daftar di bawah. */}
          <div aria-hidden="true" className="mt-4 flex h-14 overflow-hidden rounded-xl bg-tint">
            {CUTS.map((c, i) => (
              <span
                key={c.label}
                className={`cut stage-item h-full ${c.bar}`}
                style={vars({ width: `${c.value}%`, '--i': i })}
              />
            ))}
            <span
              className="cut stage-item flex h-full items-center justify-end bg-gain pr-3 font-display text-lg font-extrabold text-white"
              style={vars({ width: `${PROFIT}%`, '--i': CUTS.length })}
            >
              Rp{PROFIT}
            </span>
          </div>

          <ul className="mt-6 grid divide-y divide-line border-y border-line">
            {CUTS.map((c, i) => (
              <li key={c.label} className="stage-item flex items-start gap-3 py-3" style={vars({ '--i': i })}>
                <span aria-hidden="true" className={`mt-1.5 size-3 shrink-0 rounded-sm ${c.bar}`} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{c.label}</span>
                  <span className="block text-sm text-fg-3">Tercatat di: {c.where}</span>
                </span>
                <span className="font-semibold tabular-nums">−Rp{c.value}</span>
              </li>
            ))}
            <li className="stage-item flex items-center gap-3 py-3" style={vars({ '--i': CUTS.length })}>
              <span aria-hidden="true" className="size-3 shrink-0 rounded-sm bg-gain" />
              <span className="flex-1 font-display text-lg font-extrabold">Sisa jadi untung bersih</span>
              <span className="font-display text-lg font-extrabold text-gain tabular-nums">Rp{PROFIT}</span>
            </li>
          </ul>
          <p className="mt-3 text-sm text-fg-3">Angka rekaan. Di aplikasi, hitungannya dari data tokomu sendiri.</p>
        </figure>
      </div>
    </Section>
  )
}
