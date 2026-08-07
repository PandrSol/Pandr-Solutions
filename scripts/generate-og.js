import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')

const W = 1200
const H = 630
const LIME = '#C4FF3D'
const BG = '#000000'

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="15%" cy="30%" r="45%">
      <stop offset="0%" stop-color="${LIME}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${LIME}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="90%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#5B7CFF" stop-opacity="0.20" />
      <stop offset="100%" stop-color="#5B7CFF" stop-opacity="0" />
    </radialGradient>
    <style>
      .display { font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif; font-weight: 600; letter-spacing: -0.03em; }
      .eyebrow { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; }
      .body    { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-weight: 400; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}" />
  <rect width="${W}" height="${H}" fill="url(#glow1)" />
  <rect width="${W}" height="${H}" fill="url(#glow2)" />

  <!-- eyebrow -->
  <text x="72" y="130" class="eyebrow" fill="${LIME}" font-size="20">
    Digital Marketing Studio · Vizag, India
  </text>

  <!-- headline -->
  <text x="72" y="245" class="display" fill="#FFFFFF" font-size="88">
    Growth for <tspan fill="${LIME}">local</tspan>
  </text>
  <text x="72" y="345" class="display" fill="#FFFFFF" font-size="88">
    businesses.
  </text>

  <!-- subline -->
  <text x="72" y="425" class="body" fill="#A1A1A1" font-size="26">
    Local SEO. Paid ads. Social. Websites.
  </text>
  <text x="72" y="463" class="body" fill="#A1A1A1" font-size="26">
    Serving the US, UAE and India.
  </text>

  <!-- brand mark -->
  <g transform="translate(72, 528)">
    <!-- Lime P mark -->
    <g transform="scale(1.1)">
      <path d="M 5 0 L 5 60 L 20 60 L 20 40 L 34 40
               C 46 40 55 32 55 20
               C 55 8 46 0 34 0 Z
               M 20 12 L 34 12 C 39 12 42 15 42 20
               C 42 25 39 28 34 28 L 20 28 Z"
            fill="${LIME}" />
    </g>
    <text x="82" y="42" class="display" fill="#FFFFFF" font-size="42">PANDR</text>
    <text x="82" y="64" class="eyebrow" fill="#FFFFFF" font-size="12">SOLUTIONS</text>
  </g>

  <!-- corner decorations -->
  <rect x="1088" y="72" width="40" height="1" fill="${LIME}" opacity="0.6" />
  <text x="${W - 72}" y="90" class="eyebrow" fill="#A1A1A1" font-size="14" text-anchor="end">
    pandrsol.com
  </text>
</svg>
`

const outPath = path.join(publicDir, 'og-image.jpg')

await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath)

console.log(`✓ OG image written to ${outPath}`)
