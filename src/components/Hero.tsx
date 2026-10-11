import { Container, CtaLink } from './ui'

export function Hero() {
  return (
    <header className="dark-surface bg-field text-paper">
      <Container className="pt-5 pb-16 lg:pb-24">
        <a href="/" className="inline-flex items-baseline gap-2 rounded-md" aria-label="HitungCuan by Studio Harel">
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Hitung<span className="text-lime">Cuan</span>
          </span>
          <span className="text-xs text-paper/75">by Studio Harel</span>
        </a>

        <div className="mt-10 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h1 className="font-display text-[2.75rem] leading-[0.98] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Omzet naik. <span className="text-lime">Untungnya beneran ada?</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl">
              Upload file export Shopee, lihat untung bersih asli per bulan dan iklan mana yang diam-diam bikin rugi.
            </p>
            <div className="mt-8">
              <CtaLink className="w-full sm:w-auto" />
              <p className="mt-3 text-sm text-paper/75">Tanpa kartu kredit. Tanpa install.</p>
            </div>
          </div>

          <ReceiptCard />
        </div>
      </Container>
    </header>
  )
}

/** Angka contoh (dummy) — selalu berlabel "contoh tampilan". */
function ReceiptCard() {
  return (
    <figure aria-label="Contoh tampilan untung bersih" className="relative mx-auto w-full max-w-md rounded-2xl bg-paper p-5 text-ink shadow-[0_6px_0_0_var(--color-field-deep)] sm:p-7 lg:rotate-[1.5deg]">
      <span className="rounded-full bg-counter px-3 py-1 text-xs font-bold tracking-wide text-ink/75 uppercase">
        contoh tampilan
      </span>
      <p className="mt-6 text-sm font-bold text-ink/70">Untung bersih</p>
      <p className="font-display text-[clamp(2.4rem,12vw,3.75rem)] leading-none font-extrabold tracking-tight text-gain tabular-nums">
        Rp4.812.300
      </p>
      <div aria-hidden="true" className="mt-6 border-t-2 border-dashed border-ink/15" />
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gain/10 px-3 py-1 text-xs font-bold text-gain">
        <span aria-hidden="true" className="size-2 rounded-full bg-gain" />
        Angka final
      </span>
    </figure>
  )
}
