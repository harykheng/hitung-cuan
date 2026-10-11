import { STUDIO_URL } from '../config'
import { Container } from './ui'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="dark-surface bg-ink py-8 text-sm text-paper/80">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>HitungCuan oleh Studio Harel · Tidak berafiliasi dengan Shopee.</p>
        <p>
          <a href={STUDIO_URL} className="font-bold text-paper underline underline-offset-4 hover:text-lime">
            studioharel.id
          </a>{' '}
          · © <span suppressHydrationWarning>{year}</span>
        </p>
      </Container>
    </footer>
  )
}
