import { Section } from './ui'

/* Kalimat seller sendiri, bukan bahasa laporan. Badannya satu kalimat pendek: alasannya, bukan penjelasan panjang. */
const PROBLEMS = [
  {
    title: 'ROAS di dashboard bagus, tapi saldo segitu-segitu aja.',
    body: 'ROAS di Shopee ikut menghitung pesanan yang akhirnya batal. Dan ROAS bagus belum tentu untung, tergantung untung per barangmu.',
  },
  {
    title: 'Penghasilan di Seller Centre itu belum untung.',
    body: 'Modal, biaya iklan, dan packaging belum dipotong.',
  },
  {
    title: 'Tiap awal bulan, sore habis buat rekap spreadsheet.',
    body: 'Dan hasilnya belum tentu cocok sama saldo.',
  },
]

/** Tiga kalimat besar, bukan kotak metrik. Latar putih sebagai jeda setelah hero. */
export function Problems() {
  return (
    <Section tone="paper" size="lg" labelledby="masalah">
      <h2 id="masalah" className="sr-only">
        Masalah yang sering dialami seller Shopee
      </h2>
      <ul className="grid gap-8 sm:gap-12">
        {PROBLEMS.map((p) => (
          <li key={p.title} className="max-w-3xl">
            <p className="font-display text-2xl leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl">
              {p.title}
            </p>
            <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-fg-2 sm:mt-3 sm:text-lg">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
