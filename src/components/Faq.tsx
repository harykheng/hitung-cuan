import type { ReactNode } from 'react'
import { useSource } from '../lib/source'
import { trackCta } from '../lib/track'
import { generalMessage, waLink } from '../lib/whatsapp'
import { ChevronIcon, H2, Section } from './ui'

function WaLink({ children }: { children: ReactNode }) {
  const source = useSource()
  return (
    <a
      href={waLink(generalMessage(source))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta('faq')}
      className="py-3.5 font-semibold text-accent underline decoration-2 underline-offset-4"
    >
      {children}
    </a>
  )
}

/*
 * Pertanyaan dari brief landing 2, ditambah dua yang spesifik produk (HP/laptop, marketplace lain).
 * Tidak menyebut harga, uji coba, atau janji operasional baru. Klaim privasi mengikuti Privacy.tsx.
 */
export function Faq() {
  const items: { q: string; a: ReactNode }[] = [
    {
      q: 'HitungCuan menghitung apa?',
      a: 'Untung bersih per bulan dan per produk, untung atau rugi tiap iklan (ROAS nyata dibanding target ROAS), serta simulasi harga jual dan target ROAS. Semuanya dari data yang kamu unggah dan isi sendiri.',
    },
    {
      q: 'File apa yang perlu disiapkan?',
      a: 'Export pesanan Shopee (.xlsx, status Semua), laporan penghasilan Excel "Sudah Dilepas" (PDF bulanan masih bisa untuk laporan lama), dan file data iklan (.csv) kalau kamu beriklan. HPP dan biaya diisi langsung di aplikasi.',
    },
    {
      q: 'Apakah file asli saya diunggah?',
      a: 'Tidak. File dibaca di browser kamu dan file aslinya tidak diunggah ke server. Yang disimpan adalah hasil olahannya untuk akun tokomu, supaya rekap bisa dibuka lagi. Data pribadi pembeli seperti nama, alamat, dan nomor telepon tidak diambil dan tidak disimpan.',
    },
    {
      q: 'Apakah saya bisa langsung daftar dan membayar di website?',
      a: (
        <>
          Tidak. Akun dan akses toko dikelola oleh pengelola HitungCuan. Kalau tertarik,{' '}
          <WaLink>tanyakan aksesnya lewat WhatsApp</WaLink>.
        </>
      ),
    },
    {
      q: 'Kenapa hasil bulan saya belum lengkap?',
      a: 'Biasanya karena laporan penghasilan bulan itu belum diunggah, ada uang cair yang belum cocok dengan pesanannya, HPP sebagian produk belum terisi, atau biaya bulan itu belum disimpan. Aplikasi menyebut mana yang kurang.',
    },
    {
      q: 'Apakah HitungCuan menjamin toko pasti untung?',
      a: 'Tidak. HitungCuan membantu membaca angka tokomu supaya keputusan soal harga dan iklan punya dasar. Hasil usaha tetap bergantung pada banyak hal di luar aplikasi.',
    },
    {
      q: 'Bisa dipakai dari HP?',
      a: 'Melihat hasil bisa dari HP atau iPad. Mengunggah file paling nyaman lewat laptop, karena file diunduh dari Seller Centre.',
    },
    { q: 'Bisa untuk Tokopedia atau TikTok Shop?', a: 'Saat ini hanya Shopee.' },
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
