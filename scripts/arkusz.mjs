import sharp from 'sharp'
import fs from 'fs'
const OUT = 'C:/Users/slawe/AppData/Local/Temp/claude/C--Users-slawe/51d44a76-8230-48ec-a564-bf136f814739/scratchpad/rz'
const pliki = fs.readdirSync('src/assets').filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
const W = 230, H = 175, COLS = 8
const tiles = []
for (const [i, f] of pliki.entries()) {
  const left = (i % COLS) * W, top = Math.floor(i / COLS) * H
  tiles.push({ input: await sharp(`src/assets/${f}`).rotate().resize(W, H, { fit: 'cover' }).jpeg({ quality: 74 }).toBuffer(), left, top })
  tiles.push({
    input: Buffer.from(`<svg width="${W}" height="26"><rect width="42" height="22" x="2" y="2" rx="5" fill="#1B4D3E"/><text x="23" y="18" font-family="sans-serif" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">${i + 1}</text></svg>`),
    left, top,
  })
}
await sharp({ create: { width: COLS * W, height: Math.ceil(pliki.length / COLS) * H, channels: 3, background: '#111' } })
  .composite(tiles).jpeg({ quality: 78 }).toFile(`${OUT}/arkusz.jpg`)
fs.writeFileSync(`${OUT}/pliki.txt`, pliki.map((f, i) => `${i + 1} ${f}`).join('\n'), 'utf8')
console.log('ok', pliki.length)
