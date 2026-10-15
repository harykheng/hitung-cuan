import { APP_URL, STUDIO_URL, WA_NUMBER } from '../config'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import { Container } from './ui'

export function Footer() {
  const source = useSource()
  const link = 'inline-flex min-h-11 items-center font-semibold text-fg underline decoration-fg-2 decoration-2 underline-offset-4'
  return (
    <footer className="tone-dark bg-night-deep pt-12 pb-28 text-sm text-fg-2 sm:pb-12">
      <Container className="grid gap-8 md:grid-cols-2">
        <div>
          <img src="/logo/logo-horizontal-on-dark.svg" alt="HitungCuan" width={173} height={28} className="h-7 w-auto max-w-full object-contain object-left" />
          <p className="mt-3 text-base font-semibold text-fg">HitungCuan bukan produk resmi Shopee.</p>
          <p className="mt-3">
            Kontak:{' '}
            <a
              href={waLink(generalMessage(source))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCta('footer')}
              className={link}
            >
              WhatsApp +{WA_NUMBER}
            </a>
          </p>
          <p className="mt-2">
            Sudah berlangganan?{' '}
            <a href={APP_URL} className={link}>
              Masuk ke aplikasi
            </a>
          </p>
        </div>
        <div id="privasi">
          <p className="font-semibold text-fg">Privasi singkat</p>
          <p className="mt-2 leading-relaxed">
            Halaman ini tidak menyimpan data apa pun; simulator dihitung di browser kamu. Di aplikasi, nama, alamat,
            nomor HP, username, dan nomor resi pembeli tidak diambil, tidak dikirim, dan tidak disimpan. Yang disimpan:
            nomor pesanan, produk dan variasi, qty, status, waktu pesanan, subtotal, angka penghasilan, data iklan per produk, serta HPP dan biaya yang kamu isi sendiri. Emailmu untuk login juga tercatat.
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
          · © <span suppressHydrationWarning>{new Date().getFullYear()}</span> ·{' '}
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
