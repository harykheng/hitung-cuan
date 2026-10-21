import { CHAPTERS, COLS, ORDER_ROWS, PRIVATE_W, PRODUCT_ROWS, STATUS_LABEL, type Status } from './content'
import { Contoh, Wrap, vars } from './ui'

/*
 * ---------- Momen khas landing 3: "Saring" ----------
 * Lembar export contoh yang tertahan di layar selama lima bab dibaca. Satu penggerak (saring-driver.ts) menulis empat
 * angka 0..1 (--p1..--p4) di elemen .sheet, dan SEMUA visual lembar diturunkan dari angka itu di CSS (landing3.css):
 *   p1  kolom data pembeli menyempit dan diarsir ("Tidak diambil")
 *   p2  kolom dari laporan lain masuk dari kanan (Potongan Shopee, Iklan, Modal)
 *   p3  baris per pesanan diganti rangkuman per produk; kolom No. Pesanan disembunyikan; kolom Untung muncul
 *   p4  lembar memudar dan kursor sel membesar jadi satu jawaban
 * Penggerak juga menghitung --cam (geser kamera, hanya kalau lembar lebih lebar dari layar, mis. di HP) dan posisi
 * kursor sel. Kolom Nama Produk dibekukan (seperti "freeze panes") supaya nama produk selalu terlihat.
 *
 * Aksesibilitas: lembar hanya gambaran (aria-hidden). Isi yang dibaca ada di daftar bab di sebelahnya.
 * Tanpa JS, lembar diam di keadaan rangkuman per produk (lihat .sheet di landing3.css).
 */

const LETTER = (i: number) => String.fromCharCode(65 + i)

/* Posisi dasar tiap kolom (satuan u) dan berapa ia bergeser saat kolom di kirinya menyempit (a) atau hilang (c). */
type Geo = { b: number; a: number; c: number }
const GEO: Geo[] = []
{
  let b = 0
  let a = 0
  let c = 0
  for (const col of COLS) {
    GEO.push({ b, a, c })
    b += col.w
    if (col.kind === 'private') a += col.w - PRIVATE_W
    if (col.kind === 'order') c += col.w
  }
}
const FIRST_PRIVATE = COLS.findIndex((c) => c.kind === 'private')
const PRIVATE_COUNT = COLS.filter((c) => c.kind === 'private').length

const DOTS = '••••••'

/** Untung positif hijau, rugi merah (gain/loss). Tanda + dan − tetap tertulis, jadi tidak hanya warna. */
const sign = (v?: string) => (v?.startsWith('−') ? 'is-neg' : v?.startsWith('+') ? 'is-pos' : '')

function StatusChip({ s }: { s: Status }) {
  return (
    <span className={`sh-chip sh-chip-${s}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {s === 'aman' && <path d="m5 12.5 4.5 4.5L19 7" />}
        {s === 'rugi' && <path d="M6 6l12 12M18 6 6 18" />}
        {s === 'tipis' && (
          <>
            <path d="M12 4 3.5 19h17L12 4Z" />
            <path d="M12 10v4.5M12 17v.01" />
          </>
        )}
      </svg>
      {STATUS_LABEL[s]}
    </span>
  )
}

function Column({ i }: { i: number }) {
  const col = COLS[i]
  const g = GEO[i]
  const extraIndex = COLS.slice(0, i).filter((c) => c.kind === 'extra').length
  return (
    <div
      className="sh-col"
      data-kind={col.kind}
      data-key={col.key}
      style={vars({ '--b': g.b, '--a': g.a, '--c': g.c, '--w': col.w, '--k': 1 - PRIVATE_W / col.w, '--e': extraIndex })}
    >
      <div className="sh-in">
        <span className="sh-letter">{LETTER(i)}</span>
        <span className="sh-head">
          <span className="sh-head-label">{col.label}</span>
          {col.source && <span className="sh-src">{col.source}</span>}
        </span>
        {ORDER_ROWS.map((row, r) => (
          <span key={`o${r}`} className={`sh-cell sh-o ${col.num ? 'is-num' : ''}`} style={vars({ '--r': r })}>
            {col.kind === 'private' ? DOTS : (row[col.key] ?? '')}
          </span>
        ))}
        {PRODUCT_ROWS.map((row, r) => (
          <span
            key={`p${r}`}
            className={`sh-cell sh-p ${col.num ? 'is-num' : ''} ${row.strong ? 'is-strong' : ''} ${col.kind === 'result' ? sign(row.cells[col.key]) : ''}`}
            style={vars({ '--r': r })}
          >
            {row.cells[col.key] ?? ''}
            {col.kind === 'result' && row.status && <StatusChip s={row.status} />}
          </span>
        ))}
      </div>
      {col.kind === 'private' && <span className="sh-hatch" />}
    </div>
  )
}

export function Saring() {
  const fp = GEO[FIRST_PRIVATE]
  return (
    <section id="saring" aria-labelledby="saring-judul" className="saring">
      <Wrap className="saring-grid">
        <div className="saring-head">
          <h2 id="saring-judul" className="h2" data-split>
            Dari file mentah sampai satu jawaban.
          </h2>
          <p className="saring-lead">Begini kira-kira HitungCuan membaca export tokomu.</p>
        </div>
        <div className="stage-wrap">
          <div className="stage" data-stage data-step="3" aria-hidden="true">
            <div className="stage-top">
              <span className="stage-name">Lembar contoh, toko rekaan</span>
              <Contoh />
            </div>

            <div className="sheet" data-sheet>
              <span className="sh-probe" />
              <div className="sh-gutter">
                <span className="sh-corner" />
                <span className="sh-rownum is-head">1</span>
                {Array.from({ length: 6 }, (_, r) => (
                  <span key={r} className="sh-rownum" style={vars({ '--r': r })}>
                    {r + 2}
                  </span>
                ))}
              </div>
              {COLS.map((_, i) => (
                <Column key={COLS[i].key} i={i} />
              ))}
              <span
                className="sh-band"
                style={vars({ '--b': fp.b, '--c': fp.c, '--w': PRIVATE_COUNT * PRIVATE_W })}
              >
                Tidak diambil
              </span>
              <span className="sh-cursor" data-cursor>
                <span className="sh-handle" />
              </span>
              <div className="sh-answer">
                <span className="sh-answer-label">Untung bersih toko contoh, Agustus 2026</span>
                <span className="sh-answer-num">Rp3 juta</span>
                <span className="sh-answer-meta">
                  <span className="sh-final">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7" />
                    </svg>
                    Angka final
                  </span>
                  <span>dari omzet Rp20 juta</span>
                </span>
              </div>
            </div>

            <div className="sh-tabs">
              <span className="sh-tab" data-tab="pesanan">Pesanan</span>
              <span className="sh-tab" data-tab="extra">Penghasilan</span>
              <span className="sh-tab" data-tab="extra">Iklan</span>
              <span className="sh-tab" data-tab="extra">HPP</span>
              <span className="sh-tab" data-tab="rekap">Rekap</span>
            </div>
          </div>
        </div>

        <ol className="chapters">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} className="chapter" data-chapter={i}>
              <span className="chapter-n">
                {i + 1}/{CHAPTERS.length}
              </span>
              <h3 className="chapter-title">{c.title}</h3>
              <p className="chapter-body">{c.body}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  )
}
