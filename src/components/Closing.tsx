import { Container, Cta, Hy, InAppWaHelp } from './ui'

/** CTA penutup: satu-satunya blok gelap penuh selain footer. Mengundang, tanpa harga, diskon, atau batas waktu. */
export function Closing() {
  return (
    <section aria-labelledby="penutup" className="tone-dark bg-night py-16 text-fg sm:py-24">
      <Container>
        <h2
          id="penutup"
          className="max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl"
        >
          Mulai pahami angka toko Shopee<Hy />mu dengan lebih jelas.
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-fg-2">
          Tanyakan akses HitungCuan lewat WhatsApp. Pengelola yang menyiapkan akun untuk tokomu.
        </p>
        <div className="mt-8">
          <Cta lokasi="penutup" />
          <InAppWaHelp lokasi="penutup" className="mt-4" />
          <p className="mt-4 text-sm text-fg-2">Saat ini hanya untuk Shopee · Bukan produk resmi Shopee</p>
        </div>
      </Container>
    </section>
  )
}
