import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'
import { writeFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')
const logoPath = path.join(publicDir, 'pandr-logo.jpg')

// Logo is 800x192. The P mark occupies roughly the leftmost ~180px, with
// small vertical padding. A ~180x180 square starting at x=8 captures it
// tightly and centered vertically.
const CROP = { left: 4, top: 4, width: 210, height: 184 }

async function makeIcon(size, outName) {
  await sharp(logoPath)
    .extract(CROP)
    .resize(size, size, { fit: 'contain', background: '#000000' })
    .png()
    .toFile(path.join(publicDir, outName))
  console.log(`✓ ${outName} (${size}x${size})`)
}

await makeIcon(32,  'favicon-32.png')
await makeIcon(180, 'apple-touch-icon.png')
await makeIcon(192, 'favicon-192.png')
await makeIcon(512, 'favicon-512.png')

// SVG favicon — embed the 256px PNG as a data URI so browsers can scale it
const svgSource = await sharp(logoPath)
  .extract(CROP)
  .resize(256, 256, { fit: 'contain', background: '#000000' })
  .png()
  .toBuffer()

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <image href="data:image/png;base64,${svgSource.toString('base64')}" width="256" height="256"/>
</svg>`

writeFileSync(path.join(publicDir, 'favicon.svg'), svg)
console.log('✓ favicon.svg')
