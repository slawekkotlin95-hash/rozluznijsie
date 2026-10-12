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
const VERCEL = 'vercel.json'
const TYPY = ['p', 'h2', 'h3', 'lista', 'ramka', 'zdjecie']
/** Sługi z `zespol` w src/config.ts. */
const AUTORZY = ['nicole-stokowska', 'kamil-jedrzejewski']

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
  const tekst = (pole, max) => (wejscie[pole] ? { [pole]: String(wejscie[pole]).trim().slice(0, max) } : {})

  return {
    slug: zrobSlug(wejscie.slug || tytul),
    tytul,
    lead: String(wejscie.lead || '').trim().slice(0, 400),
    ...tekst('metaTytul', 200),
    ...tekst('metaOpis', 300),
    ...tekst('fraza', 100),
    ...(wejscie.noindex ? { noindex: true } : {}),
    ...(AUTORZY.includes(wejscie.autor) ? { autor: wejscie.autor } : {}),
    data: /^\d{4}-\d{2}-\d{2}$/.test(wejscie.data) ? wejscie.data : new Date().toISOString().slice(0, 10),
    ...(poprzedni ? { aktualizacja: new Date().toISOString().slice(0, 10) } : {}),
    minuty: policzMinuty(czyste),
    miniatura: String(wejscie.miniatura || poprzedni?.miniatura || '1746635357709-scaled.jpg'),
    status: wejscie.status === 'szkic' ? 'szkic' : 'opublikowany',
    bloki: czyste,
  }
}

/**
 * Zmiana adresu opublikowanego wpisu dopisuje przekierowanie 301 do vercel.json,
 * żeby stary link z Google i z udostępnień dalej prowadził do treści.
 * Istniejące przekierowania na stary adres przepinamy od razu na nowy, bez łańcuchów.
 */
async function przekierujAdres(stary, nowy, email) {
  const { dane, sha } = await pobierzJson(VERCEL)
  const z = `/blog/${stary}`
  const na = `/blog/${nowy}`
  const redirects = (dane.redirects || [])
    .filter((r) => r.source !== na && r.source !== z)
    .map((r) => (r.destination === z ? { ...r, destination: na } : r))
  redirects.push({ source: z, destination: na, permanent: true })
  await zapiszPlik(VERCEL, JSON.stringify({ ...dane, redirects }, null, 2) + '\n', `Panel: przekierowanie ${z} → ${na}`, sha, email)
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

      const opublikowany = poprzedni && (poprzedni.status ?? 'opublikowany') === 'opublikowany'
      if (opublikowany && poprzedni.slug !== wpis.slug) await przekierujAdres(poprzedni.slug, wpis.slug, sesja.email)

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
