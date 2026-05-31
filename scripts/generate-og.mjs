/* Generator gambar Open Graph (1200x630) untuk Atelir Store.
   Render SVG bermerk -> public/og.png memakai sharp.
   Jalankan ulang dengan: npm run og  (butuh devDependency `sharp`). */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og.png')

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="86%" cy="14%" r="62%">
      <stop offset="0%" stop-color="#c0431c" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#c0431c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#F4EFE6"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="32" y="32" width="1136" height="566" rx="24" fill="none" stroke="#14110d" stroke-opacity="0.12" stroke-width="2"/>

  <!-- Baris brand -->
  <g transform="translate(80, 84)">
    <g stroke="#14110d" stroke-width="2" fill="none">
      <circle cx="22" cy="22" r="20"/>
      <path d="M22 2 V42"/>
      <path d="M2 22 H42"/>
    </g>
    <circle cx="22" cy="22" r="7" fill="#14110d"/>
    <text x="64" y="33" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="34" font-weight="700" fill="#14110d">Atelir</text>
    <text x="170" y="33" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="4" fill="#6b6357">STORE</text>
  </g>

  <!-- Headline -->
  <text x="80" y="312" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" fill="#14110d">Website <tspan font-style="italic" fill="#c0431c">premium</tspan>,</text>
  <text x="80" y="394" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" fill="#14110d">dirancang, bukan ditempel.</text>

  <!-- Sub -->
  <text x="82" y="456" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#3a342b">Jasa pembuatan website profesional dengan harga jujur.</text>

  <!-- Baris bawah -->
  <text x="80" y="556" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="2" fill="#6b6357">WEBSITE &#183; CHATBOT &#183; AI MODELLING &#8212; KONSULTASI GRATIS VIA WHATSAPP</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('OG image written to', out)
