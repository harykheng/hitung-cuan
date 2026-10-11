import { useRef, useState, type FormEvent } from 'react'
import { OMZET_OPTIONS } from '../config'
import { buildSignupMessage, waLink, type SignupData } from '../lib/whatsapp'
import { Container } from './ui'

type Field = 'nama' | 'toko' | 'omzet' | 'iklan'
type Errors = Partial<Record<Field, string>>

const ERROR_TEXT: Record<Field, string> = {
  nama: 'Nama wajib diisi.',
  toko: 'Nama toko Shopee wajib diisi.',
  omzet: 'Pilih kisaran omzet per bulan.',
  iklan: 'Pilih Ya atau Tidak.',
}

const FIELD_ORDER: Field[] = ['nama', 'toko', 'omzet', 'iklan']

const inputClass =
  'mt-1.5 block min-h-12 w-full rounded-xl border-2 border-ink/20 bg-paper px-4 py-2.5 text-base text-ink transition focus:border-field aria-[invalid=true]:border-loss'

export function SignupForm({ source }: { source: string }) {
  const [values, setValues] = useState({ nama: '', toko: '', omzet: '', iklan: '' })
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    for (const field of FIELD_ORDER) {
      if (!values[field].trim()) next[field] = ERROR_TEXT[field]
    }
    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    const firstInvalid = FIELD_ORDER.find((f) => next[f])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const data: SignupData = {
      nama: values.nama.trim(),
      toko: values.toko.trim(),
      omzet: values.omzet,
      iklan: values.iklan === 'Ya' ? 'Ya' : 'Tidak',
    }
    const url = waLink(buildSignupMessage(data, source))
    const opened = window.open(url, '_blank')
    if (opened) opened.opener = null
    else window.location.href = url
  }

  return (
    <section id="daftar" aria-labelledby="daftar-judul" className="dark-surface scroll-mt-4 bg-field py-16 text-paper sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 id="daftar-judul" className="font-display text-4xl leading-tight font-extrabold sm:text-5xl">
            Daftar coba <span className="text-lime">gratis</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-paper/85">Coba gratis 30 hari. Tanpa kartu kredit. Tanpa install.</p>
        </div>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="rounded-2xl bg-paper p-5 text-ink shadow-[0_6px_0_0_var(--color-field-deep)] sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="nama" className="font-bold">
                Nama
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                autoComplete="name"
                maxLength={60}
                value={values.nama}
                onChange={(e) => update('nama', e.target.value)}
                aria-invalid={errors.nama ? true : undefined}
                aria-describedby={errors.nama ? 'nama-error' : undefined}
                required
                className={inputClass}
              />
              <FieldError id="nama-error" message={errors.nama} />
            </div>

            <div>
              <label htmlFor="toko" className="font-bold">
                Nama toko Shopee
              </label>
              <input
                id="toko"
                name="toko"
                type="text"
                autoComplete="organization"
                maxLength={60}
                value={values.toko}
                onChange={(e) => update('toko', e.target.value)}
                aria-invalid={errors.toko ? true : undefined}
                aria-describedby={errors.toko ? 'toko-error' : undefined}
                required
                className={inputClass}
              />
              <FieldError id="toko-error" message={errors.toko} />
            </div>

            <div>
              <label htmlFor="omzet" className="font-bold">
                Kisaran omzet per bulan
              </label>
              <select
                id="omzet"
                name="omzet"
                value={values.omzet}
                onChange={(e) => update('omzet', e.target.value)}
                aria-invalid={errors.omzet ? true : undefined}
                aria-describedby={errors.omzet ? 'omzet-error' : undefined}
                required
                className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%20fill='none'%20stroke='%2316173d'%20stroke-width='2'%3E%3Cpath%20d='m5%208%205%205%205-5'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[position:right_1rem_center] bg-no-repeat pr-11`}
              >
                <option value="" disabled>
                  Pilih kisaran
                </option>
                {OMZET_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <FieldError id="omzet-error" message={errors.omzet} />
            </div>

            <fieldset aria-describedby={errors.iklan ? 'iklan-error' : undefined}>
              <legend className="font-bold">Pakai iklan Shopee?</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-3">
                {(['Ya', 'Tidak'] as const).map((opt) => (
                  <label
                    key={opt}
                    className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 font-bold transition has-checked:border-field has-checked:bg-field has-checked:text-paper has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-field ${errors.iklan ? 'border-loss' : 'border-ink/20'}`}
                  >
                    <input
                      type="radio"
                      name="iklan"
                      value={opt}
                      checked={values.iklan === opt}
                      onChange={(e) => update('iklan', e.target.value)}
                      aria-invalid={errors.iklan ? true : undefined}
                      required
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
              <FieldError id="iklan-error" message={errors.iklan} />
            </fieldset>
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-lime px-6 py-3 text-lg font-bold text-ink shadow-[0_3px_0_0_var(--color-ink)] transition hover:bg-[#cdee3c] active:translate-y-px"
          >
            <ChatIcon />
            Daftar lewat WhatsApp
          </button>
          <p className="mt-3 text-center text-sm text-ink/75">Kami balas dalam 1x24 jam.</p>
          <p className="mt-1 text-center text-xs text-ink/65">Tidak ada data yang disimpan di halaman ini.</p>
        </form>
      </Container>
    </section>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm font-bold text-loss">
      {message}
    </p>
  )
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M4 19.5 5.3 15.6A8 8 0 1 1 8.4 18.7L4 19.5Z"
        strokeLinejoin="round"
      />
      <path d="M9 10.5h6M9 13.5h4" strokeLinecap="round" />
    </svg>
  )
}
