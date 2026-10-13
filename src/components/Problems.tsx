import { Section } from './ui'

const PROBLEMS = [
  {
    title: 'ROAS di Shopee kelihatan bagus, tapi saldo tidak bertambah.',
    body: 'ROAS di Shopee ikut menghitung pesanan yang akhirnya batal. ROAS yang kelihatan bagus juga bisa saja belum untung, tergantung untung per barangmu.',
  },
  {
    title: 'Penghasilan di Seller Centre belum dikurangi modal, biaya iklan, dan packaging.',
    body: 'Itu belum untung bersih. Untung baru ketemu setelah semuanya dikurangkan.',
  },
  {
    title: 'Tiap awal bulan, sore habis untuk spreadsheet.',
    body: 'Rekap manual memakan waktu, dan hasilnya bisa saja belum cocok dengan saldo.',
  },
]

/** Tiga kalimat besar, bukan kotak metrik. Latar putih sebagai jeda setelah hero. */
export function Problems() {
  return (
    <Section tone="paper" labelledby="masalah">
      <h2 id="masalah" className="sr-only">
        Masalah yang sering dialami seller Shopee
      </h2>
      <ul className="grid gap-10 sm:gap-14">
        {PROBLEMS.map((p) => (
          <li key={p.title} data-reveal className="max-w-3xl border-l-4 border-accent pl-5 sm:pl-7">
            <p className="font-display text-2xl leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl">
              {p.title}
            </p>
            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-fg-2 sm:text-lg">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
