import { Container, Cta, InAppWaHelp } from './ui'

/** CTA penutup: satu-satunya blok gelap penuh selain footer. Tombol ember paling menonjol di sini. */
export function Closing() {
  return (
    <section aria-labelledby="penutup" className="tone-dark bg-night py-16 text-fg sm:py-24">
      <Container>
        <h2
          id="penutup"
          className="max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl"
        >
          Cek tokomu bulan ini: cuan atau boncos.
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-fg-2">
          Chat admin lewat WhatsApp. Setelah akunmu siap, upload 3 laporan dari Seller Centre dan lihat untung bersih
          tokomu bulan itu.
        </p>
        <div className="mt-8">
          <Cta lokasi="penutup" />
          <InAppWaHelp lokasi="penutup" className="mt-4" />
          <p className="mt-4 text-sm text-fg-2">Tanpa kartu kredit · Saat ini hanya untuk Shopee · Bukan produk resmi Shopee</p>
        </div>
      </Container>
    </section>
  )
}
