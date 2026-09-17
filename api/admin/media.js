/**
 * Biblioteka mediów. Pliki leżą tam, gdzie zawsze leżały, czyli w
 * `src/assets` w repozytorium — dzięki temu Astro nadal optymalizuje je przy
 * buildzie. Opisy (alt, tytuł, podpis) trzymamy osobno w `src/data/media.json`,
 * żeby nie zmieniać nazw plików.
 *
 *   GET    /api/admin/media                → lista plików z opisami
 *   POST   /api/admin/media                → wgranie pliku (base64)
 *   PUT    /api/admin/media                → zapis opisów
 *   DELETE /api/admin/media?plik=nazwa.jpg → usunięcie pliku
 */
import {
  listaPlikow,
  odpowiedzBledem,
  pobierzJson,
  pobierzPlik,
  usunPlik,
  wymagajSesji,
  zapiszPlik,
  zrobSlug,
} from '../_lib/wspolne.js'

const KATALOG = 'src/assets'
const OPISY = 'src/data/media.json'
const LIMIT_MB = 8

const DOZWOLONE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

export default async function handler(req, res) {
  const sesja = wymagajSesji(req, res)
  if (!sesja) return

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return odpowiedzBledem(res, 500, 'Panel nie ma dostępu do repozytorium treści.')
  }

  try {
    if (req.method === 'GET') {
      const [pliki, { dane: opisy }] = await Promise.all([listaPlikow(KATALOG), pobierzJson(OPISY)])
      const meta = opisy || {}

      const obrazy = pliki
        .filter((p) => p.type === 'file' && /\.(jpe?g|png|webp|avif)$/i.test(p.name))
        .map((p) => ({
          plik: p.name,
          rozmiar: p.size,
          typ: p.name.split('.').pop().toLowerCase(),
          ...(meta[p.name] || { alt: '', tytul: '', podpis: '', opis: '' }),
        }))
        .sort((a, b) => a.plik.localeCompare(b.plik))

      return res.status(200).json({ ok: true, media: obrazy })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

    if (req.method === 'POST') {
      const rozszerzenie = DOZWOLONE[body.typMime]
      if (!rozszerzenie) return odpowiedzBledem(res, 415, 'Dozwolone są tylko obrazy JPG, PNG, WebP i AVIF.')

      const bajty = Buffer.from(String(body.dane || ''), 'base64')
      if (!bajty.length) return odpowiedzBledem(res, 400, 'Pusty plik.')
      if (bajty.length > LIMIT_MB * 1024 * 1024) {
        return odpowiedzBledem(res, 413, `Plik jest za duży. Maksimum to ${LIMIT_MB} MB.`)
      }
      if (!rozpoznajObraz(bajty, rozszerzenie)) {
        // Nagłówek pliku musi zgadzać się z deklarowanym typem.
        return odpowiedzBledem(res, 415, 'Plik nie wygląda na obraz w deklarowanym formacie.')
      }

      const baza = zrobSlug((body.nazwa || 'zdjecie').replace(/\.[^.]+$/, '')) || 'zdjecie'
      let nazwa = `${baza}.${rozszerzenie}`
      const { sha: istnieje } = await pobierzPlik(`${KATALOG}/${nazwa}`)
      if (istnieje) nazwa = `${baza}-${Date.now().toString(36)}.${rozszerzenie}`

      await zapiszPlik(`${KATALOG}/${nazwa}`, bajty, `Panel: nowe zdjęcie ${nazwa}`, null, sesja.email)
      return res.status(200).json({ ok: true, plik: nazwa })
    }

    if (req.method === 'PUT') {
      const plik = String(body.plik || '')
      if (!/^[\w.-]+\.(jpe?g|png|webp|avif)$/i.test(plik)) return odpowiedzBledem(res, 400, 'Nieznany plik.')

      const { dane: opisy, sha } = await pobierzJson(OPISY)
      const nowe = { ...(opisy || {}) }
      nowe[plik] = {
        alt: String(body.alt || '').slice(0, 300),
        tytul: String(body.tytul || '').slice(0, 200),
        podpis: String(body.podpis || '').slice(0, 300),
        opis: String(body.opis || '').slice(0, 600),
      }

      await zapiszPlik(OPISY, JSON.stringify(nowe, null, 2) + '\n', `Panel: opis zdjęcia ${plik}`, sha, sesja.email)
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      const plik = String(req.query?.plik || '')
      if (!/^[\w.-]+\.(jpe?g|png|webp|avif)$/i.test(plik)) return odpowiedzBledem(res, 400, 'Nieznany plik.')

      const { sha } = await pobierzPlik(`${KATALOG}/${plik}`)
      if (!sha) return odpowiedzBledem(res, 404, 'Nie ma takiego pliku.')

      await usunPlik(`${KATALOG}/${plik}`, sha, `Panel: usunięcie zdjęcia ${plik}`)
      return res.status(200).json({ ok: true })
    }

    return odpowiedzBledem(res, 405, 'Nieobsługiwana metoda.')
  } catch (e) {
    console.error('Błąd operacji na mediach:', e)
    return odpowiedzBledem(res, 502, 'Nie udało się wykonać operacji na pliku.')
  }
}

/** Sprawdzenie sygnatury pliku, bo typ MIME z przeglądarki to tylko deklaracja. */
function rozpoznajObraz(bajty, rozszerzenie) {
  const hex = bajty.subarray(0, 12).toString('hex')
  if (rozszerzenie === 'jpg') return hex.startsWith('ffd8ff')
  if (rozszerzenie === 'png') return hex.startsWith('89504e470d0a1a0a')
  if (rozszerzenie === 'webp') return hex.startsWith('52494646') && hex.slice(16, 24) === '57454250'
  if (rozszerzenie === 'avif') return bajty.subarray(4, 12).toString('latin1').startsWith('ftyp')
  return false
}
