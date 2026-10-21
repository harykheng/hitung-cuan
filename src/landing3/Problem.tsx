import { Wrap } from './ui'

/*
 * Masalah, susunan "pernyataan": judul besar di kolom kiri, lalu satu paragraf besar yang dimulai dari garis kolom 4.
 * File yang tersebar ditulis sebagai token sel (huruf mono) di dalam kalimat, karena itulah masalahnya: angkanya ada di
 * beberapa file berbeda. Nada tidak menyalahkan seller.
 */
const File = ({ children }: { children: string }) => <span className="file-token">{children}</span>

export function Problem() {
  return (
    <section aria-labelledby="masalah-judul" className="problem">
      <Wrap className="problem-grid">
        <h2 id="masalah-judul" className="h2 problem-title" data-split>
          Omzet ramai belum tentu uangnya benar-benar jadi untung.
        </h2>
        <p className="problem-text">
          Uang yang cair sudah dipotong Shopee, dan rinciannya ada di <File>Penghasilan .xlsx</File>. Pesanannya di{' '}
          <File>Pesanan .xlsx</File>, biaya iklan di <File>Iklan .csv</File>, dan modal barang di catatanmu sendiri.
          Retur dan packaging juga belum dikurangi. Wajar kalau rekap manual sering tidak cocok dengan saldo.
        </p>
      </Wrap>
    </section>
  )
}
