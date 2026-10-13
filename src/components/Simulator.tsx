import { useRef, useState, type ReactNode } from 'react'
import { hitung, VERDICT_LABEL, XTRA, PROSES, TARGET, DEFAULT_ADMIN, type Verdict } from '../lib/adsMath'
import { dec, num, rp } from '../lib/format'
import { useAnimatedNumber } from '../lib/hooks'
import { simulatorMessage } from '../lib/whatsapp'
import { trackOnce } from '../lib/track'
import { ChevronIcon, Cta, H2, MinusIcon, PlusIcon, Section, Sticker, vars } from './ui'

const PRESETS = [
  { id: 'bagus', label: 'ROAS kelihatan bagus', hpp: 30000, harga: 45000, roas: 6 },
  { id: 'bocor', label: 'Iklan yang bocor', hpp: 30000, harga: 45000, roas: 5 },
  { id: 'naik', label: 'Harga dinaikkan', hpp: 30000, harga: 59000, roas: 6 },
] as const

const parseMoney = (s: string) => Number(s.replace(/\D/g, '')) || 0
const parseDec = (s: string) => Number(s.replace(',', '.'))
const roasLabel = (r: number) => {
  const c = Math.round(r * 100) / 100
  return Math.abs(c * 10 - Math.round(c * 10)) < 1e-9 ? dec(c, 1) : dec(c, 2)
}

/** Angka yang berjalan 250 ms saat nilainya berubah (bukan loop). */
function Anim({ value, format }: { value: number; format: (n: number) => string }) {
  return <>{format(useAnimatedNumber(value, { duration: 250 }))}</>
}

export function Simulator() {
  const [hpp, setHpp] = useState<number>(PRESETS[0].hpp)
  const [harga, setHarga] = useState<number>(PRESETS[0].harga)
  const [roasText, setRoasText] = useState('6,0')
  const [adminText, setAdminText] = useState(dec(DEFAULT_ADMIN * 100))
  const [nota, setNota] = useState(false)

  // ROAS dan admin boleh sedang diketik kosong/tidak valid: pakai nilai valid terakhir.
  const lastRoas = useRef(6)
  const lastAdmin = useRef(DEFAULT_ADMIN)
  const r = parseDec(roasText)
  if (Number.isFinite(r) && r > 0) lastRoas.current = Math.min(r, 99)
  const a = parseDec(adminText)
  if (Number.isFinite(a) && a >= 0 && a < 60) lastAdmin.current = a / 100
  const roas = lastRoas.current
  const admin = lastAdmin.current

  const used = () => trackOnce('simulator_used')
  const res = harga > 0 ? hitung({ hpp, harga, roas, admin }) : null
  const activePreset = PRESETS.find((p) => p.hpp === hpp && p.harga === harga && Math.abs(p.roas - roas) < 1e-9)

  function applyPreset(p: (typeof PRESETS)[number]) {
    used()
    setHpp(p.hpp)
    setHarga(p.harga)
    setRoasText(dec(p.roas, 1))
  }

  return (
    <Section id="simulator" labelledby="simulator-judul">
      <H2 id="simulator-judul">Iklan kamu rugi atau untung?</H2>
      <p className="mt-4 max-w-2xl text-lg text-on-field-muted">
        Isi tiga angka produkmu. Hitungannya memakai rumus yang sama dengan aplikasi, dijalankan di browser ini: tidak
        ada yang dikirim atau disimpan. Belum perlu chat.
      </p>

      <div className="on-paper mt-10 grid gap-10 rounded-3xl bg-paper p-5 text-ink shadow-[0_6px_0_0_#12145c] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        {/* ----- Input ----- */}
        <div>
          <p className="text-sm font-semibold text-ink/70">Coba langsung</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={activePreset?.id === p.id}
                onClick={() => applyPreset(p)}
                className={`min-h-11 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                  activePreset?.id === p.id
                    ? 'border-btn bg-btn text-paper'
                    : 'border-ink/25 text-ink hover:border-btn'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-5">
            <MoneyField
              id="sim-hpp"
              label="Modal per unit (HPP)"
              value={hpp}
              onChange={(v) => {
                used()
                setHpp(v)
              }}
            />
            <MoneyField
              id="sim-harga"
              label="Harga jual"
              value={harga}
              onChange={(v) => {
                used()
                setHarga(v)
              }}
            />
            <div>
              <label htmlFor="sim-roas" className="font-semibold">
                ROAS di laporan Shopee
              </label>
              <div className="mt-1.5 flex items-center gap-4">
                <input
                  id="sim-roas"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={roasText}
                  onChange={(e) => {
                    used()
                    setRoasText(e.target.value.replace(/[^\d.,]/g, '').slice(0, 5))
                  }}
                  onBlur={() => setRoasText(dec(roas, 1))}
                  className="min-h-12 w-24 rounded-xl border-2 border-ink/25 bg-paper px-3 text-lg font-semibold tabular-nums focus:border-btn"
                />
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={0.1}
                  value={Math.min(15, Math.max(1, roas))}
                  aria-label="Geser ROAS"
                  onChange={(e) => {
                    used()
                    setRoasText(dec(Number(e.target.value), 1))
                  }}
                  className="min-w-0 flex-1"
                />
              </div>
              <p className="mt-1 text-sm text-ink/70">ROAS = omzet ÷ biaya iklan.</p>
            </div>
          </div>

          <details className="mt-5 border-t border-ink/15 pt-4">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold">
              Atur potongan Shopee
              <ChevronIcon className="chev size-5 shrink-0" />
            </summary>
            <div className="mt-2">
              <label htmlFor="sim-admin" className="text-sm font-semibold">
                Persen admin (%)
              </label>
              <input
                id="sim-admin"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={adminText}
                onChange={(e) => {
                  used()
                  setAdminText(e.target.value.replace(/[^\d.,]/g, '').slice(0, 5))
                }}
                onBlur={() => setAdminText(dec(admin * 100))}
                className="mt-1 block min-h-12 w-28 rounded-xl border-2 border-ink/25 bg-paper px-3 text-lg font-semibold tabular-nums focus:border-btn"
              />
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Contoh: admin {dec(DEFAULT_ADMIN * 100)}%, di aplikasi kamu isi sesuai kategori tokomu. Persen admin
                berbeda tiap kategori dan bisa berubah, jadi bukan tarif resmi Shopee.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Potongan lain tetap: Gratis Ongkir XTRA {XTRA * 100}%, biaya proses {rp(PROSES)}, packaging Rp0, target
                untung {TARGET * 100}% setelah iklan (bawaan, bisa diubah per toko).
              </p>
            </div>
          </details>

          <details className="mt-3 border-t border-ink/15 pt-4">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold">
              Istilah singkat
              <ChevronIcon className="chev size-5 shrink-0" />
            </summary>
            <dl className="mt-2 grid gap-2 text-sm leading-relaxed text-ink/80">
              <Term t="HPP">harga modal per barang.</Term>
              <Term t="ROAS">omzet ÷ biaya iklan. ROAS 10 = iklan Rp1.000 menghasilkan omzet Rp10.000.</Term>
              <Term t="Takedown">matikan iklan produk itu.</Term>
              <Term t="Hero">produk dengan iklan paling menghasilkan.</Term>
              <Term t="Balik modal">titik iklan tidak untung dan tidak rugi.</Term>
            </dl>
          </details>
        </div>

        {/* ----- Hasil ----- */}
        <div className="lg:border-l lg:border-ink/15 lg:pl-12">
          {res ? <Result res={res} roas={roas} hpp={hpp} harga={harga} nota={nota} setNota={setNota} admin={admin} /> : (
            <p className="text-lg text-ink/75">Isi harga jual untuk melihat hasilnya.</p>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-on-field-muted">
        Angka awal hanya contoh. Ganti dengan angka produkmu sendiri.
      </p>
    </Section>
  )
}

function Term({ t, children }: { t: string; children: ReactNode }) {
  return (
    <div>
      <dt className="inline font-bold">{t}</dt> <dd className="inline">= {children}</dd>
    </div>
  )
}

function MoneyField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
}) {
  const step = (d: number) => onChange(Math.max(0, value + d))
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="flex min-h-12 min-w-0 flex-1 items-center rounded-xl border-2 border-ink/25 bg-paper px-3 focus-within:border-btn">
          <span className="text-ink/60">Rp</span>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={value ? num(value) : ''}
            placeholder="0"
            onChange={(e) => onChange(Math.min(parseMoney(e.target.value), 99_999_999))}
            className="min-w-0 flex-1 bg-transparent px-2 text-lg font-semibold tabular-nums outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => step(-1000)}
          aria-label={`Kurangi ${label} Rp1.000`}
          className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink/25 hover:border-btn"
        >
          <MinusIcon />
        </button>
        <button
          type="button"
          onClick={() => step(1000)}
          aria-label={`Tambah ${label} Rp1.000`}
          className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink/25 hover:border-btn"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}

const VERDICT_TEXT_COLOR: Record<Verdict, string> = {
  takedown: 'text-loss',
  kecil: 'text-ink',
  aman: 'text-gain',
}

function Result({
  res,
  roas,
  hpp,
  harga,
  admin,
  nota,
  setNota,
}: {
  res: ReturnType<typeof hitung>
  roas: number
  hpp: number
  harga: number
  admin: number
  nota: boolean
  setNota: (v: boolean) => void
}) {
  const { verdict, setelahIklan, untung, balikModal, target } = res
  const rounded = Math.round(setelahIklan)
  const sentencePrefix =
    verdict === 'takedown' ? 'Iklan ini rugi' : verdict === 'kecil' ? 'Iklan ini untung tipis' : 'Iklan ini aman: untung'

  const summary = `${sentencePrefix} ${rp(Math.abs(rounded))} per order. Putusan: ${VERDICT_LABEL[verdict]}.`

  return (
    <div>
      <p role="status" className="sr-only">
        {summary}
      </p>

      <div aria-hidden="true">
        {/* key = verdict, jadi stiker "pop" hanya saat putusan berganti, bukan tiap ketikan */}
        <Sticker key={verdict} kind={verdict} delay={0} className="text-base">
          {VERDICT_LABEL[verdict]}
        </Sticker>
        <p
          className={`mt-5 font-display text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-4xl ${VERDICT_TEXT_COLOR[verdict]}`}
        >
          {sentencePrefix} <Anim value={Math.abs(rounded)} format={rp} /> per order.
        </p>
      </div>

      <dl className="mt-6 grid divide-y divide-ink/15 border-y border-ink/15">
        <Row label="Untung per order sebelum iklan">
          <Anim value={untung} format={rp} />
        </Row>
        <Row label={balikModal === null ? 'Iklan balik modal' : 'Iklan baru balik modal di ROAS'}>
          {balikModal === null ? (
            'tidak bisa, tiap order sudah rugi sebelum iklan'
          ) : (
            <Anim value={balikModal} format={(n) => dec(n)} />
          )}
        </Row>
        <Row label={target === null ? 'Target ROAS untung 5%' : 'Isi target ROAS di Shopee'}>
          {target === null ? 'tidak mungkin, untung per barang terlalu tipis' : <Anim value={target} format={(n) => dec(n)} />}
        </Row>
      </dl>

      <button
        type="button"
        aria-expanded={nota}
        onClick={() => setNota(!nota)}
        className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-btn underline decoration-2 underline-offset-4"
      >
        {nota ? 'Sembunyikan hitungannya' : 'Lihat hitungannya'}
        <ChevronIcon className={`size-5 transition-transform ${nota ? 'rotate-180' : ''}`} />
      </button>

      {nota ? <Nota hpp={hpp} harga={harga} roas={roas} admin={admin} res={res} /> : null}

      <div className="mt-6">
        <Cta
          lokasi="simulator"
          variant="blue"
          className="w-full sm:w-auto"
          messageFor={(source) =>
            simulatorMessage(
              { hpp: num(hpp), harga: num(harga), roas: roasLabel(roas), verdict: VERDICT_LABEL[verdict] },
              source,
            )
          }
        >
          Minta uji coba untuk semua produkmu
        </Cta>
        <p className="mt-3 text-sm text-ink/70">
          Membuka WhatsApp dengan hasil simulasimu sudah terisi di pesan. Angkamu hanya terkirim kalau kamu menekan kirim.
        </p>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-ink/80">{label}</dt>
      <dd className="text-right font-display text-lg font-extrabold tabular-nums">{children}</dd>
    </div>
  )
}

/** Nota yang "tercetak" per baris, 150 ms per baris. */
function Nota({
  hpp,
  harga,
  roas,
  admin,
  res,
}: {
  hpp: number
  harga: number
  roas: number
  admin: number
  res: ReturnType<typeof hitung>
}) {
  const lines: { label: string; value: number; strong?: boolean }[] = [
    { label: 'Harga jual', value: harga },
    { label: `Admin ${dec(admin * 100)}%`, value: -admin * harga },
    { label: `Gratis Ongkir XTRA ${XTRA * 100}%`, value: -XTRA * harga },
    { label: 'Biaya proses', value: -PROSES },
    { label: 'Uang cair dari Shopee', value: res.penghasilan, strong: true },
    { label: 'Modal (HPP)', value: -hpp },
    { label: 'Untung sebelum iklan', value: res.untung, strong: true },
    { label: `Biaya iklan (harga ÷ ROAS ${roasLabel(roas)})`, value: -res.biayaIklan },
    { label: 'Untung setelah iklan', value: res.setelahIklan, strong: true },
  ]
  return (
    <div className="mt-2 border-2 border-dashed border-ink/25 p-4" role="table" aria-label="Rincian hitungan per order">
      {lines.map((l, i) => (
        <div
          key={l.label}
          role="row"
          className={`print-row flex justify-between gap-4 py-1 tabular-nums ${l.strong ? 'font-bold' : 'text-ink/80'}`}
          style={vars({ '--i': i })}
        >
          <span role="cell">{l.label}</span>
          <span role="cell" className={l.value < 0 && l.strong ? 'text-loss' : ''}>
            {rp(l.value)}
          </span>
        </div>
      ))}
      <p className="print-row mt-2 text-xs text-ink/65" style={vars({ '--i': lines.length })}>
        Per order, dibulatkan ke rupiah.
      </p>
    </div>
  )
}
