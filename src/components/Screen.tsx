import type { ScreenSlot } from '../content'

/**
 * Bingkai browser netral untuk screenshot aplikasi. Tanpa `src`, isinya placeholder yang terang-terangan
 * (bukan tiruan antarmuka aplikasi): judul layar dan kode placeholder, supaya tidak ada yang mengira ini tampilan asli.
 * Bilah atas hanya garis dan alamat aplikasi; tanpa tiga titik warna-warni.
 */
export function ScreenFrame({
  slot,
  priority = false,
  fill = false,
  className = '',
}: {
  slot: ScreenSlot
  /** true untuk gambar di layar pertama (hero): dimuat lebih dulu, tidak lazy. */
  priority?: boolean
  /** true: bingkai mengisi tinggi induknya dari 1024px (placeholder melebar ke bawah, bukan rasio tetap). */
  fill?: boolean
  className?: string
}) {
  return (
    <figure className={`tone-light flex flex-col overflow-hidden rounded-3xl bg-paper text-fg shadow-sheet ring-1 ring-line ${className}`}>
      <div aria-hidden="true" className="flex h-9 items-center gap-3 border-b border-line px-4">
        <span className="h-1.5 w-8 rounded-full bg-line" />
        <span className="min-w-0 truncate text-xs text-fg-3">app.studioharel.id</span>
      </div>
      {slot.src ? (
        <img
          src={slot.src}
          alt={slot.alt}
          width={slot.width}
          height={slot.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          className="block h-auto w-full"
        />
      ) : (
        <div className={`m-3 grid aspect-[16/10] place-items-center ${fill ? 'lg:aspect-auto lg:flex-1' : ''} rounded-2xl border-2 border-dashed border-control/60 bg-tint p-4 text-center`}>
          <div>
            <p className="font-display text-lg font-bold sm:text-xl">{slot.title}</p>
            <p className="mt-1 text-sm text-fg-2">Screenshot aplikasi menyusul</p>
            <p className="mt-3 text-xs break-words text-fg-3">[{slot.placeholder}]</p>
          </div>
        </div>
      )}
      <figcaption className="sr-only">{slot.src ? slot.title : `${slot.title}: screenshot belum tersedia`}</figcaption>
    </figure>
  )
}
