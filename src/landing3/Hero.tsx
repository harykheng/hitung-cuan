import { InAppWaHelp } from '../components/ui'
import { TRIAL_DAYS } from '../config'
import { HERO_SCREEN } from './content'
import { ArrowDown, Cta, Shot, Wrap } from './ui'

const LETTERS = 'ABCDEFGHIJKL'.split('')

/*
 * Konsep landing 3 "Saring" (DESIGN.md): halaman ini adalah lembar kerja. Hero = sel-sel kosong dengan huruf kolom,
 * bilah rumus, dan judul yang duduk di atas lembar. Kursor sel (kotak kuning bertepi indigo dengan pegangan isi di pojok)
 * berangkat dari "omzet" lalu pindah ke "untung bersih" saat halaman terbuka (motion.ts). Tanpa JS dan di reduced
 * motion, kursor langsung diam di "untung bersih". Judul tidak disembunyikan sama sekali (LCP = teks judul).
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="judul-utama" className="hero">
      <Wrap className="hero-grid">
        <div className="sheet-cols" aria-hidden="true">
          {LETTERS.map((l) => (
            <span key={l} className="sheet-col">
              <span className="sheet-letter">{l}</span>
            </span>
          ))}
        </div>

        <div className="formula" aria-hidden="true">
          <span className="formula-name">Untung bersih</span>
          <span className="formula-fx">fx</span>
          <span className="formula-text">
            <span className="formula-type">= omzet − potongan Shopee − modal − iklan − biaya lain</span>
            <span className="formula-caret" />
          </span>
        </div>

        <h1 id="judul-utama" className="hero-title" data-hero-title>
          <span className="hero-line">
            Jangan cuma lihat <span className="cell-word" data-cell="from">omzet</span>.
          </span>{' '}
          <span className="hero-line">
            Cari tahu <span className="sel cell-word" data-cell="to">untung bersih</span>
          </span>{' '}
          <span className="hero-line">
            toko <span className="nowrap">Shopee-mu.</span>
          </span>
        </h1>

        <p className="hero-sub">
          Unggah file export dari Seller Centre. HitungCuan merangkumnya jadi untung bersih per bulan dan per produk,
          mengecek iklan per produk, dan membantu menyimulasikan harga jual sebelum kamu mengubahnya.
        </p>

        <div className="hero-act">
          <div className="hero-ctas">
            <Cta lokasi="hero" />
            <a href="#cara-kerja" className="link-down">
              Lihat cara kerjanya <ArrowDown className="link-down-icon" />
            </a>
          </div>
          <InAppWaHelp lokasi="hero" className="hero-inapp" />
          <p className="hero-trust">
            <span className="hero-trust-main">File export dibaca di browser; file asli tidak diunggah.</span>
            <span className="hero-trust-sub">
              Uji coba gratis {TRIAL_DAYS} hari, akun dibuat oleh pengelola lewat WhatsApp. Bukan produk resmi Shopee.
            </span>
          </p>
        </div>

        <div className="hero-shot">
          <p className="hero-shot-label">Preview aplikasi</p>
          <Shot slot={HERO_SCREEN} priority />
        </div>
      </Wrap>
    </section>
  )
}
