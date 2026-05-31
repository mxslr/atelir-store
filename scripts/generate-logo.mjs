/* Generator logo Atelir (1200x1200) memakai sharp.
   Menghasilkan dua varian:
     - public/logo.png       : latar gelap (cocok untuk foto profil / avatar)
     - public/logo-light.png : latar krem (cocok untuk dokumen / latar terang)
   Jalankan ulang dengan: npm run logo  (butuh devDependency `sharp`). */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Palet brand
const INK = '#14110d'
const CREAM = '#F4EFE6'
const ACCENT = '#c0431c'
const MUTED_ON_DARK = '#9a9082'
const MUTED_ON_LIGHT = '#6b6357'

/* Membangun SVG logo persegi 1200x1200.
   bg       : warna latar
   fg       : warna mark dan wordmark
   muted    : warna label STORE
   withGlow  : sapuan aksen halus di sudut */
function buildSvg({ bg, fg, muted }) {
  return `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="82%" cy="16%" r="68%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="58%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Latar -->
  <rect width="1200" height="1200" fill="${bg}"/>
  <rect width="1200" height="1200" fill="url(#glow)"/>

  <!-- Bingkai halus selaras dengan gaya kartu OG -->
  <rect x="48" y="48" width="1104" height="1104" rx="56" fill="none" stroke="${fg}" stroke-opacity="0.12" stroke-width="3"/>

  <!-- Mark: lingkaran + crosshair + titik aksen di tengah -->
  <g transform="translate(600, 470)">
    <g stroke="${fg}" stroke-width="14" fill="none" stroke-linecap="round">
      <circle cx="0" cy="0" r="170"/>
      <path d="M0 -210 V210"/>
      <path d="M-210 0 H210"/>
    </g>
    <circle cx="0" cy="0" r="58" fill="${ACCENT}"/>
  </g>

  <!-- Wordmark -->
  <text x="600" y="860" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="170" font-weight="700" fill="${fg}">Atelir</text>

  <!-- Label -->
  <text x="600" y="952" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" letter-spacing="20" fill="${muted}">STORE</text>
</svg>`
}

const variants = [
  { file: 'logo.png', bg: INK, fg: CREAM, muted: MUTED_ON_DARK },
  { file: 'logo-light.png', bg: CREAM, fg: INK, muted: MUTED_ON_LIGHT }
]

for (const v of variants) {
  const out = join(__dirname, '..', 'public', v.file)
  await sharp(Buffer.from(buildSvg(v))).png().toFile(out)
  console.log('Logo ditulis ke', out)
}
