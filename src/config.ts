/**
 * Nomor WhatsApp admin (format internasional tanpa "+", spasi, atau tanda hubung).
 * Sama dengan VITE_SUPPORT_WA di aplikasi. Build memberi peringatan selama masih placeholder.
 */
export const WA_NUMBER = '6281292567788'

/** Kode sumber default kalau URL tidak punya ?src= */
export const DEFAULT_SOURCE = 'WEB'

export const STUDIO_URL = 'https://studioharel.id'
export const APP_URL = 'https://app.studioharel.id'

/** Harga dan uji coba, harus sama dengan yang benar-benar ditagih admin. */
export const PRICE_MONTHLY = 69000
export const PRICE_YEARLY = 599000
export const TRIAL_DAYS = 7

/**
 * Batas uji coba yang diputuskan pemilik (29 Okt 2026): data 1 bulan dan 10 kali simulasi harga. Aplikasi
 * (shopee-profit-calc) BELUM membatasinya. Selama `enforced` false, landing tidak menyebut batas ini; ubah ke true hanya
 * setelah aplikasi benar-benar membatasi, lalu tambahkan juga baris batasnya di /syarat/ (bagian "Uji coba gratis").
 */
export const TRIAL_LIMITS = { months: 1, simulations: 10, enforced: false }

/**
 * Halaman pembayaran resmi di Lynk.id (dari pemilik, 26 Okt 2026). Ditulis lengkap di halaman supaya seller bisa
 * mencocokkan tautan yang dikirim admin. Selalu https.
 */
export const LYNK_URL = 'https://lynk.id/harykheng/1ode0g688rmv'
export const LYNK_LABEL = 'lynk.id/harykheng/1ode0g688rmv'

/** Janji waktu balas. Tulis hanya yang bisa ditepati. */
export const REPLY_PROMISE = 'Admin membalas maksimal 1×24 jam'
