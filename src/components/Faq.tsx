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
      className="py-3.5 font-semibold text-accent underline decoration-2 underline-offset-4"
    >
      {children}
    </a>
  )
}

export function Faq() {
  const items: { q: string; a: ReactNode }[] = [
    {
      q: 'Apakah data pembeli saya aman?',
      a: 'Nama, alamat, nomor HP, username, dan nomor resi pembeli tidak diambil, tidak dikirim, dan tidak disimpan. File dibaca di browser kamu, dan file aslinya tidak dikirim ke server. Yang disimpan: nomor pesanan, produk dan variasi, qty, status, waktu pesanan, subtotal, angka penghasilan, data iklan per produk, serta HPP dan biaya yang kamu isi sendiri. Emailmu untuk login juga tercatat. Tiap seller memakai database sendiri, dan datamu hanya bisa dilihat akunmu dan admin HitungCuan.',
    },
    {
      q: 'Apakah harus punya laptop?',
      a: 'Melihat hasil bisa dari HP atau iPad. Upload file paling nyaman di laptop, karena ketiga file diunduh dari Seller Centre.',
    },
    { q: 'Bisa untuk Tokopedia atau TikTok Shop?', a: 'Saat ini hanya Shopee.' },
    {
      q: 'Saya tidak paham spreadsheet atau istilah ROAS. Apakah bisa?',
      a: 'Bisa. Tiap angka punya penjelasan pendek di sebelahnya, dan ada kamus istilah di aplikasi. Kamu tidak perlu membuat rumus apa pun.',
    },
    {
      q: 'Bagaimana cara bayar? Ada refund?',
      a: 'Untuk saat ini pembayaran lewat chat admin di WhatsApp. Tidak ada refund, jadi manfaatkan uji coba gratis 30 hari untuk memastikan HitungCuan cocok dengan tokomu.',
    },
    {
      q: 'Bagaimana kalau berhenti berlangganan?',
      a: 'Setelah langganan habis, admin menonaktifkan akunmu, jadi kamu tidak bisa masuk. Datamu tetap tersimpan, dan akunmu aktif lagi kalau kamu memperpanjang lewat admin. Kalau sudah 3 bulan tidak berlangganan, datamu dihapus. Mau dihapus lebih cepat? Hubungi admin lewat WhatsApp.',
    },
    {
      q: 'Bagaimana kalau tokonya lebih dari satu?',
      a: (
        <>
          Satu akun untuk 1 toko. Kalau punya lebih dari satu toko,{' '}
          <WaLink message={multiStoreMessage}>tanyakan ke admin lewat WhatsApp</WaLink>.
        </>
      ),
    },
    {
      q: 'Kalau Shopee mengganti format file?',
      a: 'Aplikasi menolak file dengan pesan yang jelas, bukan diam-diam salah hitung. Format diperbarui oleh pengelola, dan sudah termasuk dalam harga langganan.',
    },
    {
      q: 'Persen admin tokonya berapa?',
      a: 'Berbeda tiap kategori dan bisa berubah. Kamu isi sekali dari Seller Centre, jadi tidak ada tarif bawaan yang bisa salah.',
    },
    {
      q: 'Barang retur dihitung rugi?',
      a: 'Bawaannya barang retur kembali ke stok. Bisa diatur per toko kalau returmu biasanya rusak.',
    },
    {
      q: 'Salah upload file, bagaimana?',
      a: 'Hubungi admin lewat WhatsApp, nanti dihapus.',
    },
  ]

  return (
    <Section tone="paper" id="faq" labelledby="faq-judul">
      <H2 id="faq-judul">Pertanyaan yang sering muncul</H2>
      <div className="mt-10 max-w-3xl border-t border-rule">
        {items.map((it) => (
          <details key={it.q} name="faq" className="border-b border-rule">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-lg font-bold">
              {it.q}
              <ChevronIcon className="chev size-6 shrink-0 text-accent" />
            </summary>
            <p className="max-w-[62ch] pb-5 leading-relaxed text-fg-2">{it.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
