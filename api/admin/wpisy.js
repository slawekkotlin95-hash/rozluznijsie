/**
 * CRUD wpisów blogowych. Źródłem prawdy jest `src/data/artykuly.json`
 * w repozytorium, więc każdy zapis to commit, a historia commitów jest
 * jednocześnie historią zmian treści.
 *
 *   GET    /api/admin/wpisy            → lista wszystkich (ze szkicami)
 *   GET    /api/admin/wpisy?slug=x     → jeden wpis
 *   POST   /api/admin/wpisy            → nowy wpis
 *   PUT    /api/admin/wpisy            → zapis istniejącego
 *   DELETE /api/admin/wpisy?slug=x     → usunięcie
 */
import {
  odpowiedzBledem,
  oczyscHtml,
  pobierzJson,
  policzMinuty,
  wymagajSesji,
  zapiszPlik,
  zrobSlug,
} from '../_lib/wspolne.js'

const PLIK = 'src/data/artykuly.json'
const TYPY = ['p', 'h2', 'h3', 'lista', 'ramka', 'zdjecie']

/** Przepuszczamy wyłącznie znane pola i znane typy bloków. */
function oczyscWpis(wejscie, poprzedni) {
  const bloki = Array.isArray(wejscie.bloki) ? wejscie.bloki : []

  const czyste = bloki
    .filter((b) => TYPY.includes(b.typ))
    .map((b) => {
      if (b.typ === 'lista') {
        return { typ: 'lista', punkty: (b.punkty || []).map(oczyscHtml).filter(Boolean) }
      }
      if (b.typ === 'ramka') {
        return { typ: 'ramka', tytul: oczyscHtml(b.tytul || ''), tekst: oczyscHtml(b.tekst || '') }
      }
      if (b.typ === 'zdjecie') {
        return {
          typ: 'zdjecie',
          klucz: String(b.klucz || ''),
          alt: String(b.alt || '').slice(0, 300),
          ...(b.podpis ? { podpis: String(b.podpis).slice(0, 300) } : {}),
        }
      }
      return { typ: b.typ, tekst: oczyscHtml(b.tekst || '') }
    })
    .filter((b) => (b.typ === 'lista' ? b.punkty.length : b.typ === 'zdjecie' ? b.klucz : b.tekst))

  const tytul = String(wejscie.tytul || '').trim().slice(0, 160)

  return {
    slug: zrobSlug(wejscie.slug || tytul),
    tytul,
    lead: String(wejscie.lead || '').trim().slice(0, 400),
    ...(wejscie.metaTytul ? { metaTytul: String(wejscie.metaTytul).trim().slice(0, 200) } : {}),
    data: /^\d{4}-\d{2}-\d{2}$/.test(wejscie.data) ? wejscie.data : new Date().toISOString().slice(0, 10),
    minuty: policzMinuty(czyste),
    miniatura: String(wejscie.miniatura || poprzedni?.miniatura || 'gabinet'),
    status: wejscie.status === 'szkic' ? 'szkic' : 'opublikowany',
    bloki: czyste,
  }
}

export default async function handler(req, res) {
  const sesja = wymagajSesji(req, res)
  if (!sesja) return

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    console.error('Brak GITHUB_TOKEN albo GITHUB_REPO')
    return odpowiedzBledem(res, 500, 'Panel nie ma dostępu do repozytorium treści.')
  }

  try {
    const { dane: wpisy, sha } = await pobierzJson(PLIK)
    const lista = Array.isArray(wpisy) ? wpisy : []
    const slug = (req.query?.slug || '').toString()

    if (req.method === 'GET') {
      if (slug) {
        const wpis = lista.find((w) => w.slug === slug)
        return wpis ? res.status(200).json({ ok: true, wpis }) : odpowiedzBledem(res, 404, 'Nie ma takiego wpisu.')
      }
      // Lista bez treści bloków: panel nie potrzebuje ich do tabeli.
      return res.status(200).json({
        ok: true,
        wpisy: lista.map(({ bloki, ...reszta }) => ({ ...reszta, blokow: bloki.length })),
      })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

    if (req.method === 'POST' || req.method === 'PUT') {
      const poprzedni = lista.find((w) => w.slug === (body.slugPierwotny || body.slug))
      const wpis = oczyscWpis(body, poprzedni)

      if (!wpis.tytul) return odpowiedzBledem(res, 400, 'Wpis musi mieć tytuł.')
      if (!wpis.slug) return odpowiedzBledem(res, 400, 'Nie udało się zbudować adresu wpisu.')

      const kolizja = lista.find((w) => w.slug === wpis.slug && w !== poprzedni)
      if (kolizja) return odpowiedzBledem(res, 409, `Adres /blog/${wpis.slug} jest już zajęty.`)

      const nowa = poprzedni
        ? lista.map((w) => (w === poprzedni ? wpis : w))
        : [wpis, ...lista]

      await zapiszPlik(
        PLIK,
        JSON.stringify(nowa, null, 2) + '\n',
        `Panel: ${poprzedni ? 'zapis' : 'nowy wpis'} „${wpis.tytul}”`,
        sha,
        sesja.email
      )
      return res.status(200).json({ ok: true, wpis })
    }

    if (req.method === 'DELETE') {
      const wpis = lista.find((w) => w.slug === slug)
      if (!wpis) return odpowiedzBledem(res, 404, 'Nie ma takiego wpisu.')

      await zapiszPlik(
        PLIK,
        JSON.stringify(lista.filter((w) => w !== wpis), null, 2) + '\n',
        `Panel: usunięcie wpisu „${wpis.tytul}”`,
        sha,
        sesja.email
      )
      return res.status(200).json({ ok: true })
    }

    return odpowiedzBledem(res, 405, 'Nieobsługiwana metoda.')
  } catch (e) {
    console.error('Błąd operacji na wpisach:', e)
    return odpowiedzBledem(res, 502, 'Nie udało się zapisać zmian. Spróbuj ponownie.')
  }
}
