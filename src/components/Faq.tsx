import type { ReactNode } from 'react'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { multiStoreMessage, waLink } from '../lib/whatsapp'
import { ChevronIcon, H2, Section } from './ui'

function WaLink({ message, children }: { message: (s: string) => string; children: ReactNode }) {
  const source = useSource()
  return (
    <a
      href={waLink(message(source))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta('faq')}
      className="font-semibold text-on-field underline decoration-lime decoration-2 underline-offset-4"
    >
      {children}
    </a>
  )
}

export function Faq() {
  const items: { q: string; a: ReactNode }[] = [
    {
      q: 'Apakah data pembeli saya aman?',
      a: 'Nama, alamat, nomor HP, username, dan nomor resi pembeli tidak pernah dibaca atau disimpan. File dibaca di browser kamu, dan file aslinya tidak dikirim ke server. Yang disimpan hanya nomor pesanan, produk, qty, status, dan angka penghasilan. Data tiap toko terpisah dan hanya bisa dilihat akun toko itu.',
    },
    {
      q: 'Saya tidak paham spreadsheet atau istilah ROAS. Apakah bisa?',
      a: 'Bisa. Tiap angka punya penjelasan pendek di sebelahnya, dan ada kamus istilah di aplikasi. Kamu tidak perlu membuat rumus apa pun.',
    },
    {
      q: 'Apakah harus punya laptop?',
      a: 'Melihat hasil bisa dari HP atau iPad. Upload file paling nyaman di laptop, karena ketiga file diunduh dari Seller Centre.',
    },
    {
      q: 'Bagaimana kalau tokonya lebih dari satu?',
      a: (
        <>
          Toko dipilih sekali di bar atas dan berlaku untuk semua halaman. Satu langganan untuk 1 toko; kalau punya
          lebih dari satu,{' '}
          <WaLink message={multiStoreMessage}>tanyakan ke admin lewat WhatsApp</WaLink>.
        </>
      ),
    },
    {
      q: 'Kalau Shopee mengganti format file?',
      a: 'Aplikasi menolak file dengan pesan yang jelas, bukan diam-diam salah hitung. Format diperbarui oleh pengelola, dan sudah termasuk dalam harga langganan.',
    },
    { q: 'Bisa untuk Tokopedia atau TikTok Shop?', a: 'Saat ini hanya Shopee.' },
    {
      q: 'Bagaimana kalau berhenti berlangganan?',
      a: 'Setelah langganan habis, datamu tetap tersimpan dan hanya bisa dilihat (mode baca saja). Perpanjang lewat admin kapan pun.',
    },
    {
      q: 'Salah upload ke toko lain, bagaimana?',
      a: 'Hubungi admin lewat WhatsApp, nanti dihapus.',
    },
    {
      q: 'Persen admin tokonya berapa?',
      a: 'Berbeda tiap kategori dan bisa berubah. Kamu isi sekali dari Seller Centre, jadi tidak ada tarif bawaan yang bisa salah.',
    },
    {
      q: 'Barang retur dihitung rugi?',
      a: 'Bawaannya barang retur kembali ke stok. Bisa diatur per toko kalau returmu biasanya rusak.',
    },
  ]

  return (
    <Section id="faq" labelledby="faq-judul">
      <H2 id="faq-judul">Pertanyaan yang sering muncul</H2>
      <div className="mt-10 max-w-3xl border-t border-on-field/20">
        {items.map((it) => (
          <details key={it.q} name="faq" className="border-b border-on-field/20">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-display text-lg font-bold">
              {it.q}
              <ChevronIcon className="chev size-6 shrink-0 text-lime" />
            </summary>
            <p className="pb-5 leading-relaxed text-on-field-muted">{it.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
