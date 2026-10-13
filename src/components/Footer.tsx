import { APP_URL, STUDIO_URL, WA_NUMBER } from '../config'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import { Container } from './ui'

export function Footer() {
  const source = useSource()
  const link = 'font-semibold text-on-field underline decoration-lime decoration-2 underline-offset-4'
  return (
    <footer className="bg-field-deep pt-12 pb-28 text-sm text-on-field-muted sm:pb-12">
      <Container className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight text-on-field">
            Hitung<span className="text-lime">Cuan</span>
          </p>
          <p className="mt-3 text-base font-semibold text-on-field">HitungCuan bukan produk resmi Shopee.</p>
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
        <div>
          <p className="font-semibold text-on-field">Privasi singkat</p>
          <p className="mt-2 leading-relaxed">
            Halaman ini tidak menyimpan data apa pun; simulator dihitung di browser kamu. Di aplikasi, nama, alamat,
            nomor HP, username, dan nomor resi pembeli tidak pernah dibaca atau disimpan. Yang disimpan: nomor pesanan,
            produk, qty, status, dan angka penghasilan.
          </p>
        </div>
      </Container>
      <Container className="mt-8 border-t border-on-field/15 pt-6">
        <p>
          HitungCuan oleh{' '}
          <a href={STUDIO_URL} className={link}>
            Studio Harel
          </a>{' '}
          · © <span suppressHydrationWarning>{new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  )
}
