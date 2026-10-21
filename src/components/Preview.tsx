import { PREVIEW_SCREENS } from '../content'
import { ScreenFrame } from './Screen'
import { H2, Section } from './ui'

/*
 * Preview aplikasi: satu bingkai besar dan dua kecil (brief). Selama screenshot belum ada, bingkai menampilkan
 * placeholder bertanda, bukan tiruan antarmuka. Ganti lewat src/content.ts (PREVIEW_SCREENS).
 */
export function Preview() {
  const [main, ...rest] = PREVIEW_SCREENS
  return (
    <Section tone="paper" id="preview" labelledby="preview-judul">
      <H2 id="preview-judul">Sekilas di dalam aplikasi</H2>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <Shot slot={main} fill />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
          {rest.map((s) => (
            <Shot key={s.title} slot={s} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function Shot({ slot, fill = false }: { slot: (typeof PREVIEW_SCREENS)[number]; fill?: boolean }) {
  return (
    <div className="flex flex-col">
      <ScreenFrame slot={slot} fill={fill} className={fill ? 'flex-1' : ''} />
      <p className="mt-3 font-semibold">{slot.title}</p>
    </div>
  )
}
