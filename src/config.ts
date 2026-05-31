/* =========================================================================
   KONFIGURASI UTAMA. Semua angka dan teks penting yang harus mudah diganti
   pemilik ada di file ini. Tidak perlu menyentuh logika.
   ========================================================================= */

// GANTI dengan nomor WhatsApp studio. Format internasional tanpa tanda +.
export const WA_NUMBER = '62812818813'

// GANTI dengan nama studio
export const STUDIO_NAME = 'Atelir'
export const STUDIO_TAGLINE = 'Studio kode bukan template'

// =====================================================
// HARGA PROYEK DASAR (IDR). Turun signifikan agar lebih
// bersaing dengan pasar UMKM Indonesia.
// =====================================================
export const BASE_PRICES: Record<string, Record<string, number>> = {
  web: {
    tugas_kuliah: 350000,
    portfolio: 250000,
    company_profile: 1200000,
    redesign: 1500000,
    toko_online: 2800000,
    interaktif: 4200000,
    web_app: 7500000
  },
  chatbot: {
    whatsapp: 900000,
    ai_data: 2500000,
    widget: 1400000
  },
  ai: {
    prediksi: 3500000,
    cv: 5500000,
    deploy: 1800000
  }
}

// =====================================================
// LABEL JENIS PROYEK
// =====================================================
export const PROJECT_LABELS: Record<string, Record<string, string>> = {
  web: {
    tugas_kuliah: 'Website Tugas Kuliah',
    portfolio: 'Website Portfolio',
    company_profile: 'Company Profile',
    redesign: 'Redesign Website',
    toko_online: 'Toko Online',
    interaktif: 'Website Interaktif',
    web_app: 'Web App Custom'
  },
  chatbot: {
    whatsapp: 'Chatbot WhatsApp',
    ai_data: 'Chatbot AI Berbasis Data',
    widget: 'Integrasi Widget Website'
  },
  ai: {
    prediksi: 'Model Prediksi',
    cv: 'Computer Vision',
    deploy: 'Deploy Model ke Web'
  }
}

export const PROJECT_DESC: Record<string, Record<string, string>> = {
  web: {
    tugas_kuliah: 'Berbasis Laravel, ringan, cocok untuk submission tugas kuliah dan portofolio mahasiswa.',
    portfolio: 'Personal portfolio untuk freelancer, desainer, atau profesional. Cepat dirilis, tampilan rapi.',
    company_profile: 'Halaman bisnis yang elegan dengan struktur SEO friendly dan konten yang rapi.',
    redesign: 'Perombakan total tampilan website lama menjadi modern dan responsif.',
    toko_online: 'Etalase produk lengkap dengan keranjang, checkout, dan integrasi pembayaran.',
    interaktif: 'Penuh animasi scroll, elemen 3D, dan transisi sinematik yang menarik.',
    web_app: 'Sistem internal, dashboard analitik, atau aplikasi web lengkap sesuai kebutuhan.'
  },
  chatbot: {
    whatsapp: 'Otomatisasi balasan WhatsApp untuk customer service dan order.',
    ai_data: 'Chatbot pintar yang menjawab dari basis data atau dokumen perusahaan kamu.',
    widget: 'Widget chat terpasang langsung di website dengan koneksi ke admin.'
  },
  ai: {
    prediksi: 'Model klasifikasi atau prediksi numerik untuk kebutuhan bisnis kamu.',
    cv: 'Pengenalan objek, wajah, atau dokumen dari gambar dan video.',
    deploy: 'Membungkus model ML menjadi API atau interface web yang siap pakai.'
  }
}

// =====================================================
// TEKNOLOGI
// Biaya berbasis %tase agar proporsional dengan tier proyek.
// Next.js menambah sekitar 30 % dari harga dasar.
// =====================================================
export const TECH_OPTIONS = [
  { id: 'laravel', name: 'Laravel / PHP', desc: 'Cepat, hemat, cocok untuk kebanyakan kebutuhan.', costPct: 0 },
  { id: 'nextjs', name: 'Next.js / React', desc: 'Tampilan dinamis, animasi modern, performa premium.', costPct: 0.3 }
]

// =====================================================
// HALAMAN
// =====================================================
// Jumlah halaman dasar per jenis proyek. Halaman di atas batas ini
// akan ditambah biaya PER_PAGE_COST. Fallback ke BASE_PAGES bila id
// proyek tidak terdaftar.
export const BASE_PAGES = 5
export const BASE_PAGES_BY_PROJECT: Record<string, number> = {
  tugas_kuliah: 3,
  portfolio: 1,
  company_profile: 5,
  redesign: 5,
  toko_online: 8,
  interaktif: 6,
  web_app: 10
}
export const PER_PAGE_COST = 150000

// =====================================================
// ADDONS / TAMBAHAN. Dipisah per kategori karena kebutuhan
// website, chatbot, dan AI modelling berbeda.
// =====================================================
export type Addon = { id: string; name: string; desc: string; cost: number }

export const ADDONS: Record<string, Addon[]> = {
  web: [
    { id: 'animasi', name: 'Animasi Scroll', desc: 'Reveal, parallax, transisi sinematik.', cost: 500000 },
    { id: 'threed', name: 'Elemen 3D', desc: 'Hero 3D interaktif lewat WebGL.', cost: 1500000 },
    { id: 'seo', name: 'Optimasi SEO', desc: 'Schema, meta, sitemap, page speed.', cost: 400000 },
    { id: 'cms', name: 'Panel Admin / CMS', desc: 'Edit konten sendiri tanpa coding.', cost: 1100000 },
    { id: 'multilang', name: 'Multi Bahasa', desc: 'ID dan EN, mudah diperluas.', cost: 700000 },
    { id: 'maintenance', name: 'Maintenance 3 Bulan', desc: 'Patch, monitoring, dan dukungan.', cost: 300000 }
  ],
  chatbot: [
    { id: 'multichannel', name: 'Multi Channel', desc: 'WhatsApp plus Web Widget plus Telegram.', cost: 1200000 },
    { id: 'cs_handoff', name: 'Handoff ke CS Manusia', desc: 'Bot mengalihkan percakapan kompleks ke admin.', cost: 700000 },
    { id: 'logs', name: 'Dashboard Log Percakapan', desc: 'Pantau pertanyaan masuk dan kinerja bot.', cost: 900000 },
    { id: 'knowledge', name: 'Training dari Dokumen', desc: 'Bot belajar dari PDF, sheet, atau database internal.', cost: 1400000 },
    { id: 'broadcast', name: 'Broadcast Pesan', desc: 'Kirim pesan masal terjadwal ke daftar kontak.', cost: 800000 },
    { id: 'maintenance_chat', name: 'Maintenance 3 Bulan', desc: 'Tuning prompt, koreksi jawaban, dukungan.', cost: 400000 }
  ],
  ai: [
    { id: 'finetune', name: 'Fine Tuning Custom Dataset', desc: 'Latih model dengan data spesifik perusahaan.', cost: 2500000 },
    { id: 'api_endpoint', name: 'REST API Production', desc: 'Endpoint siap pakai dengan autentikasi.', cost: 1800000 },
    { id: 'dashboard_ai', name: 'Dashboard Monitoring Model', desc: 'Pantau akurasi, drift, dan request volume.', cost: 1500000 },
    { id: 'data_pipeline', name: 'Data Pipeline Otomatis', desc: 'Pengumpulan dan preprocessing data terjadwal.', cost: 2000000 },
    { id: 'docs_ai', name: 'Dokumentasi Teknis', desc: 'README, arsitektur, dan handoff lengkap.', cost: 600000 },
    { id: 'maintenance_ai', name: 'Maintenance 3 Bulan', desc: 'Retraining berkala dan bug fix.', cost: 600000 }
  ]
}

// =====================================================
// KECEPATAN PENGERJAAN
// Biaya dihitung sebagai %tase dari harga dasar agar
// proporsional. Website tugas kuliah 300rb cuma bayar 45rb
// untuk kilat, bukan 2 juta.
// =====================================================
export const SPEED_OPTIONS = [
  { id: 'normal', name: 'Normal', desc: 'Sesuai jadwal standar.', costPct: 0, mult: 1.0 },
  { id: 'fast', name: 'Dipercepat', desc: 'Sekitar 30 % lebih cepat.', costPct: 0.15, mult: 0.7 },
  { id: 'kilat', name: 'Kilat', desc: 'Prioritas penuh, sekitar 55 % lebih cepat.', costPct: 0.4, mult: 0.45 }
]

// =====================================================
// ESTIMASI HARI PER JENIS PROYEK
// =====================================================
export const BASE_DAYS: Record<string, number> = {
  tugas_kuliah: 2,
  portfolio: 2,
  company_profile: 5,
  redesign: 6,
  toko_online: 10,
  interaktif: 12,
  web_app: 18,
  whatsapp: 3,
  ai_data: 7,
  widget: 4,
  prediksi: 10,
  cv: 14,
  deploy: 5
}

export const PER_EXTRA_PAGE_DAYS = 0.8
export const ADDON_DAYS: Record<string, Record<string, number>> = {
  web: { animasi: 1, threed: 3, seo: 1, cms: 2, multilang: 1, maintenance: 0 },
  chatbot: { multichannel: 3, cs_handoff: 2, logs: 2, knowledge: 4, broadcast: 2, maintenance_chat: 0 },
  ai: { finetune: 6, api_endpoint: 3, dashboard_ai: 3, data_pipeline: 5, docs_ai: 1, maintenance_ai: 0 }
}

// =====================================================
// PAKET SIAP PAKAI. 4 TIER: Basic, Diamond, Premier, Enterprise.
// Setiap paket punya speedyAddOn callout dan daftar fitur panjang.
// =====================================================
export type PackageTier = {
  id: string
  number: string
  name: string
  subtitle: string
  price: number | null // null = custom quote
  priceLabel: string
  workTime: string
  speedyAddOn: { title: string; desc: string } | null
  features: string[]
  highlightFeaturesPrefix?: string // contoh: "Semua Fitur Yang Ada di Premier, PLUS:"
  popular: boolean
  cta: string
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'landing',
    number: '01',
    name: 'Landing Page',
    subtitle: 'Satu halaman penuh untuk launch event, promo, atau personal site.',
    price: 500000,
    priceLabel: 'Rp 500.000',
    workTime: '2 - 3 hari kerja',
    speedyAddOn: {
      title: 'Add-On Tersedia Instan',
      desc: 'Butuh selesai 1 hari? Tambah biaya kilat di konfigurator.'
    },
    features: [
      '1 halaman full custom',
      '1 putaran revisi',
      'Tampilan responsif di tablet dan smartphone',
      'SEO basic dan favicon',
      'Tombol WhatsApp atau Email langsung',
      'Gratis domain .my.id plus hosting (1 tahun)',
      'Garansi minor 7 hari'
    ],
    popular: false,
    cta: 'Pilih Paket Ini'
  },
  {
    id: 'basic',
    number: '02',
    name: 'Basic',
    subtitle: 'Buat UMKM dan personal brand yang baru mulai melangkah ke digital.',
    price: 1750000,
    priceLabel: 'Rp 1.750.000',
    workTime: '4 - 6 hari kerja',
    speedyAddOn: {
      title: 'Add-On Tersedia Instan',
      desc: 'Butuh waktu pengerjaan super cepat? Selesai dalam 2 - 3 hari.'
    },
    features: [
      'Hingga 3 halaman',
      '2 putaran revisi',
      'Tampilan responsif di tablet dan smartphone',
      'SEO dasar',
      'Integrasi WhatsApp atau Email',
      'Dokumentasi panduan penggunaan',
      'Gratis domain .web.id atau .my.id plus server selama 1 tahun',
      'Garansi revisi minor 14 hari'
    ],
    popular: false,
    cta: 'Pilih Paket Ini'
  },
  {
    id: 'diamond',
    number: '03',
    name: 'Diamond',
    subtitle: 'Pilihan paling populer buat bisnis yang serius berkembang.',
    price: 4500000,
    priceLabel: 'Rp 4.500.000',
    workTime: '4 - 6 hari kerja',
    speedyAddOn: {
      title: 'Add-On Tersedia Instan',
      desc: 'Butuh waktu pengerjaan super cepat? Selesai dalam 2 - 3 hari.'
    },
    features: [
      'Hingga 8 halaman plus 1 homepage full custom',
      '5 putaran revisi',
      'Tampilan responsif di tablet dan smartphone',
      'SEO lanjutan (Open Graph dan Sitemap dinamis)',
      'Integrasi WhatsApp atau Email',
      'Dokumentasi panduan penggunaan',
      'Gratis domain .com / .id / .co.id plus server selama 1 tahun',
      'Garansi dukungan 1 bulan setelah peluncuran',
      'Custom ilustrasi dan animasi',
      'CMS basic (kelola konten mandiri tanpa coding)',
      'Marketing analytics (GA4, GTM, Meta Pixel)',
      'Optimasi performa web (Google Lighthouse 90 plus)',
      'Hosting server premium dan keamanan lanjutan (SSL, rate limiting, DDoS protection)',
      'SSL keamanan grade A'
    ],
    popular: true,
    cta: 'Pilih Paket Ini'
  },
  {
    id: 'enterprise',
    number: '04',
    name: 'Enterprise',
    subtitle: 'Ekosistem digital skala besar yang dirancang khusus untuk menjawab alur bisnis yang kompleks.',
    price: null,
    priceLabel: 'Custom Quote',
    workTime: 'Sesuai scope',
    speedyAddOn: null,
    highlightFeaturesPrefix: 'Semua fitur yang ada di Diamond, plus:',
    features: [
      'Aplikasi web berskala besar',
      'Integrasi AI dan Machine Learning',
      'Integrasi pembayaran (payment gateway)',
      'Integrasi sistem internal dan eksternal (ERP, CRM, HRIS)',
      'API custom dan microservice architecture',
      'Dedicated project manager dan tim teknis khusus',
      'SLA dan maintenance kontrak tahunan',
      'Compliance dan security audit',
      'On site atau online training'
    ],
    popular: false,
    cta: 'Diskusikan Kebutuhan'
  }
]

// =====================================================
// PORTFOLIO
// =====================================================
/* PORTFOLIO. Setiap entri punya:
   - image: URL thumbnail (jpg/png/webp) untuk kartu di grid. Boleh import
     dari /public atau pakai URL eksternal. Bila dikosongkan, mock browser
     CSS otomatis dipakai sebagai fallback.
   - video: URL video demo (mp4) yang autoplay di modal. Fallback berupa
     splash CSS bila kosong.
   - accent: warna aksen kartu (hex), dipakai di thumbnail mock dan splash. */
export const PORTFOLIO = [
  {
    id: 'p1',
    title: 'REKA',
    type: 'Internal Tool',
    tech: 'PHP, Laravel, MySQL, dompdf',
    accent: '#c0431c',
    image: 'https://res.cloudinary.com/dphlz9br4/image/upload/v1780222168/ditmawa-1_pbvgms.png', // GANTI dengan URL gambar thumbnail
    video: 'https://res.cloudinary.com/dphlz9br4/video/upload/q_auto/f_auto/v1780225247/demo-ditmawa_bjrhgb.mp4', // GANTI dengan URL video demo asli
    description: 'Tool internal direktorat kemahasiswaan Telkom University untuk 50+ organisasi mahasiswa membuat Proposal Kegiatan dan LPJ otomatis, memangkas proses manual yang tadinya makan waktu 2 jam lebih per dokumen.'
  },
  {
    id: 'p2',
    title: 'PILAR',
    type: 'Web App',
    tech: 'Next.js',
    accent: '#2f4a36',
    image: 'https://res.cloudinary.com/dphlz9br4/image/upload/q_auto/f_auto/v1780230141/Screenshot_2026-05-31_192159_bijovw.png',
    video: 'https://res.cloudinary.com/dphlz9br4/video/upload/q_auto/f_auto/v1780229966/demo-pilar_bwgrzo.mp4',
    description: 'Platform aksi bersih pantai yang menghubungkan penyelenggara kegiatan dengan warga yang ingin mendaftar jadi relawan.'
  },
  {
    id: 'p3',
    title: 'Web Porto',
    type: 'Web Portfolio',
    tech: 'Next.js, Tailwind, Framer Motion',
    accent: '#8d2e10',
    image: 'https://res.cloudinary.com/dphlz9br4/image/upload/q_auto/f_auto/v1780231939/Screenshot_2026-05-31_195158_yybexm.png',
    video: 'https://res.cloudinary.com/dphlz9br4/video/upload/q_auto/f_auto/v1780232030/demo-webporto_dsxncn.mp4',
    description: 'Website portofolio pribadi dengan animasi halus dan transisi sinematik.'
  },
  {
    id: 'p4',
    title: 'GAP',
    type: 'AI Platform',
    tech: 'TypeScript, Node.js, RAG, LangChain',
    accent: '#234359',
    image: 'https://res.cloudinary.com/dphlz9br4/image/upload/q_auto/f_auto/v1780234520/Screenshot_2026-05-31_203504_lyvtcj.png',
    video: 'https://res.cloudinary.com/dphlz9br4/video/upload/q_auto/f_auto/v1780234562/demo-gap_yefmki.mp4',
    description: 'Platform intelijen API yang otomatis mendeteksi route, request body, dan ketidakcocokan kontrak backend ke frontend langsung dari source code, memakai RAG dan regex tanpa anotasi.'
  }
]

// =====================================================
// FAQ
// =====================================================
export const FAQS = [
  {
    q: 'Apakah hasilnya benar-benar tidak pakai template?',
    a: 'Iya, setiap proyek dirancang dari kanvas kosong. Wireframe, layout, ilustrasi, dan animasi disusun spesifik untuk brand kamu, bukan dari pasaran template seperti Themeforest.'
  },
  {
    q: 'Bagaimana kalau saya sudah punya gambaran tapi belum jelas?',
    a: 'Justru lebih bagus. Kami punya sesi konsultasi gratis untuk menyusun moodboard dan brief sebelum eksekusi. Jadi visi kamu makin tajam tanpa perlu jadi ahli desain dulu.'
  },
  {
    q: 'Kenapa harganya jauh lebih murah dari studio besar?',
    a: 'Tim kami ramping dan fokus pada hasil, bukan rapat panjang. Kami juga memakai stack modern yang mempercepat development tanpa mengorbankan kualitas.'
  },
  {
    q: 'Apakah ini hasil kerja AI yang dirilis cepat?',
    a: 'Bukan. AI kami pakai sebagai alat bantu, tapi setiap baris kode, layout, dan animasi ditinjau dan diasah manual oleh developer. Tidak ada hasil generik copy paste.'
  },
  {
    q: 'Bagaimana kalau setelah jadi saya mau ubah konten sendiri?',
    a: 'Pilih addon Panel Admin atau ambil paket Diamond ke atas. Kamu bisa update teks, gambar, dan halaman tanpa coding lewat dashboard kami.'
  },
  {
    q: 'Apakah bisa lanjut untuk maintenance jangka panjang?',
    a: 'Bisa. Tersedia paket maintenance bulanan untuk monitoring, patch keamanan, perubahan minor, dan backup berkala.'
  }
]

// =====================================================
// FORMAT HARGA INDONESIA
// =====================================================
export const formatIDR = (n: number) =>
  'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n))

// Builder pesan WhatsApp
export function buildWaUrl(message: string) {
  const txt = encodeURIComponent(message)
  return `https://wa.me/${WA_NUMBER}?text=${txt}`
}
