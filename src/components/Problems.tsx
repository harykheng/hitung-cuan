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

/** Tiga kalimat besar, bukan kotak metrik. Satu per layar HP, masuk saat digulir. */
export function Problems() {
  return (
    <Section tone="deep" labelledby="masalah">
      <h2 id="masalah" className="sr-only">
        Masalah yang sering dialami seller Shopee
      </h2>
      <ul className="grid gap-14 sm:gap-20">
        {PROBLEMS.map((p) => (
          <li key={p.title} data-reveal className="max-w-4xl border-l-4 border-lime pl-5 sm:pl-8">
            <p className="font-display text-3xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl">
              {p.title}
            </p>
            <p className="mt-4 max-w-2xl text-lg text-on-field-muted">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
