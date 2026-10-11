import { useEffect, useState } from 'react'

/**
 * Screenshot aplikasi dari /public/screens/{name}.webp (fallback .png).
 * Kalau dua-duanya belum ada, yang tampil placeholder abu-abu 16:10.
 * <img> baru dipasang setelah mount supaya onError tidak terlewat saat hidrasi.
 */
export function Screenshot({ name, alt }: { name: string; alt: string }) {
  const sources = [`/screens/${name}.webp`, `/screens/${name}.png`]
  const [index, setIndex] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => setIndex(0), [])

  const src = index !== null && index < sources.length ? sources[index] : null

  return (
    <div className="rounded-2xl bg-ink p-2 shadow-[0_6px_0_0_var(--color-field)] sm:p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#d3d6e0]">
        {!loaded ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center text-sm font-bold text-ink/60"
          >
            Screenshot {name}
          </span>
        ) : null}
        {src ? (
          <img
            key={src}
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-top"
            onLoad={() => setLoaded(true)}
            onError={() => setIndex((i) => (i ?? 0) + 1)}
          />
        ) : null}
      </div>
    </div>
  )
}
