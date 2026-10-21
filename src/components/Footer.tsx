import { APP_URL, STUDIO_URL, WA_NUMBER } from '../config'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import { Container } from './ui'

export function Footer() {
  const source = useSource()
  const link = 'inline-flex min-h-11 items-center font-semibold text-fg underline decoration-fg-2 decoration-2 underline-offset-4 hover:decoration-fg'
  return (
    <footer className="tone-dark bg-night-deep pt-12 pb-[calc(3rem+env(safe-area-inset-bottom))] text-sm text-fg-2">
      <Container className="grid gap-8 md:grid-cols-2">
        <div>
          <img src="/logo/logo-horizontal-on-dark.svg" alt="HitungCuan" width={165} height={28} className="h-7 w-auto max-w-full object-contain object-left" />
          <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-fg">
            Aplikasi untuk membantu penjual Shopee membaca untung bersih, kinerja iklan, dan simulasi harga.
          </p>
          <p className="mt-3">
            WhatsApp:{' '}
            <a
              href={waLink(generalMessage(source))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta('footer')}
              className={link}
            >
              +{WA_NUMBER}
            </a>
          </p>
          <p className="mt-1">
            Sudah punya akun?{' '}
            <a href={APP_URL} className={link}>
              Masuk ke aplikasi
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-fg">Privasi singkat</p>
          <p className="mt-2 max-w-[56ch] leading-relaxed">
            Halaman ini mencatat statistik kunjungan lewat Umami, tanpa cookie. Di aplikasi, nama, alamat, dan nomor HP
            pembeli tidak diambil, tidak dikirim, dan tidak disimpan.
          </p>
          <p className="mt-1">
            <a href="/privasi/" className={link}>
              Baca Kebijakan Privasi lengkap
            </a>
          </p>
        </div>
      </Container>
      <Container className="mt-8 border-t border-rule pt-6">
        <p>
          HitungCuan oleh{' '}
          <a href={STUDIO_URL} className={link}>
            Studio Harel
          </a>{' '}
          · © <span suppressHydrationWarning>{new Date().getFullYear()}</span> · Bukan produk resmi Shopee ·{' '}
          <a href="/syarat/" className={link}>
            Syarat Layanan
          </a>{' '}
          ·{' '}
          <a href="/privasi/" className={link}>
            Kebijakan Privasi
          </a>
        </p>
      </Container>
    </footer>
  )
}
