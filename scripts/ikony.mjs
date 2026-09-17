/**
 * Generuje favicon i miniaturkę do social mediów z materiałów, które już są
 * w projekcie: białego logo i zdjęcia gabinetu. Odpalać po zmianie logo:
 *   node scripts/ikony.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const katalog = dirname(fileURLToPath(import.meta.url))
const assets = join(katalog, '..', 'src', 'assets')
const publiczne = join(katalog, '..', 'public')

const LOGO = join(assets, 'output-onlinepngtools.png')
const TLO_OG = join(assets, '1746635357709-scaled.jpg')
const ZIELEN = { r: 27, g: 77, b: 62 }

/** Jednolita płachta koloru, do tła ikony i do przyciemnienia zdjęcia. */
const plachta = (width, height, alpha = 1) => ({
  create: { width, height, channels: 4, background: { ...ZIELEN, alpha } },
})

/**
 * Favikona to samo białe logo na przezroczystym tle. Bez kolorowej płytki pod
 * spodem: przy 16 px ciemna zieleń czytała się jak czarna obwódka wokół znaku.
 */
async function ikona(rozmiar, nazwa) {
  // Logo ma szeroki przezroczysty margines. W favikonie 16 px każdy piksel się
  // liczy, więc najpierw przycinamy pustkę, dopiero potem skalujemy.
  const przezroczyste = { r: 0, g: 0, b: 0, alpha: 0 }
  const margines = Math.round(rozmiar * 0.02)

  await sharp(LOGO)
    .trim({ threshold: 1 })
    .resize(rozmiar - margines * 2, rozmiar - margines * 2, { fit: 'contain', background: przezroczyste })
    .extend({ top: margines, bottom: margines, left: margines, right: margines, background: przezroczyste })
    .png()
    .toFile(join(publiczne, nazwa))

  console.log('✓', nazwa, `${rozmiar}x${rozmiar}`)
}

async function miniaturka() {
  const [szer, wys] = [1200, 630]

  const zdjecie = await sharp(TLO_OG).resize(szer, wys, { fit: 'cover', position: 'centre' }).toBuffer()
  const przyciemnienie = await sharp(plachta(szer, wys, 0.62)).png().toBuffer()
  const logo = await sharp(LOGO).resize(380, 380, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer()

  await sharp(zdjecie)
    .composite([
      { input: przyciemnienie, blend: 'over' },
      { input: logo, gravity: 'centre' },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(publiczne, 'og.jpg'))

  console.log('✓ og.jpg', `${szer}x${wys}`)
}

await ikona(512, 'favicon.png')
await ikona(180, 'apple-touch-icon.png')
await miniaturka()
