import type { ReactNode } from 'react'

type CtaProps = {
  children?: ReactNode
  variant?: 'lime' | 'outline'
  className?: string
}

/** Tombol CTA utama — selalu menuju form pendaftaran. */
export function CtaLink({ children = 'Coba gratis 30 hari', variant = 'lime', className = '' }: CtaProps) {
  const base =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-bold transition active:translate-y-px'
  const look =
    variant === 'lime'
      ? 'bg-lime text-ink shadow-[0_3px_0_0_var(--color-ink)] hover:bg-[#cdee3c]'
      : 'border-2 border-ink text-ink hover:bg-ink hover:text-paper'
  return (
    <a href="#daftar" className={`${base} ${look} ${className}`}>
      {children}
      <ArrowDown />
    </a>
  )
}

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.25">
      <path d="M10 4v12M4.5 10.5 10 16l5.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="max-w-2xl font-display text-3xl leading-tight font-extrabold text-balance sm:text-5xl">
      {children}
    </h2>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}
