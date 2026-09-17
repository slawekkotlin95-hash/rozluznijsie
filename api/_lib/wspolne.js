/**
 * Wspólna warstwa panelu /admin: sesje, hasła i zapis treści do repozytorium.
 *
 * Katalog zaczyna się od podkreślenia, więc Vercel nie wystawia go jako
 * endpointu — to biblioteka, nie trasa.
 *
 * Zmienne środowiskowe:
 *   ADMIN_EMAIL     – login do panelu
 *   ADMIN_HASLO     – hasło w formacie `scrypt$sól$hash` (nigdy jawne)
 *   SESJA_SEKRET    – klucz do podpisywania ciasteczka sesji
 *   GITHUB_TOKEN    – token z prawem zapisu do repozytorium strony
 *   GITHUB_REPO     – `wlasciciel/nazwa`
 *   GITHUB_BRANCH   – gałąź, domyślnie `main`
 */
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const CIASTKO = 'rozluznijsie_admin'
const GODZINA = 60 * 60

/* ----------------------------- hasła ---------------------------------- */

/** Zapis hasła: `scrypt$sól$hash`. Sam hash nigdy nie wraca do przeglądarki. */
export function zahashujHaslo(haslo) {
  const sol = randomBytes(16).toString('hex')
  const hash = scryptSync(haslo, sol, 64).toString('hex')
  return `scrypt$${sol}$${hash}`
}

export function sprawdzHaslo(haslo, zapis) {
  if (!zapis || !zapis.startsWith('scrypt$')) return false
  const [, sol, hash] = zapis.split('$')
  const podane = scryptSync(haslo, sol, 64)
  const zapisane = Buffer.from(hash, 'hex')
  // Porównanie odporne na pomiar czasu, żeby nie dało się zgadywać znak po znaku.
  return podane.length === zapisane.length && timingSafeEqual(podane, zapisane)
}

/* ----------------------------- sesje ---------------------------------- */

const podpisz = (dane, sekret) => createHmac('sha256', sekret).update(dane).digest('base64url')

export function utworzSesje(email, godzin) {
  const sekret = process.env.SESJA_SEKRET
  const tresc = Buffer.from(
    JSON.stringify({ email, wygasa: Date.now() + godzin * GODZINA * 1000 })
  ).toString('base64url')
  return `${tresc}.${podpisz(tresc, sekret)}`
}

export function odczytajSesje(req) {
  const sekret = process.env.SESJA_SEKRET
  if (!sekret) return null

  const ciastka = Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k]) => k)
  )
  const token = ciastka[CIASTKO]
  if (!token || !token.includes('.')) return null

  const [tresc, podpis] = token.split('.')
  const oczekiwany = podpisz(tresc, sekret)
  if (podpis.length !== oczekiwany.length) return null
  if (!timingSafeEqual(Buffer.from(podpis), Buffer.from(oczekiwany))) return null

  try {
    const dane = JSON.parse(Buffer.from(tresc, 'base64url').toString())
    if (!dane.wygasa || dane.wygasa < Date.now()) return null
    return dane
  } catch {
    return null
  }
}

export function ustawCiastko(res, wartosc, sekund) {
  const czesci = [
    `${CIASTKO}=${wartosc}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${sekund}`,
  ]
  res.setHeader('Set-Cookie', czesci.join('; '))
}

export const wyczyscCiastko = (res) => ustawCiastko(res, '', 0)

/**
 * Bramka do endpointów panelu. Zwraca sesję albo kończy odpowiedź 401 —
 * uprawnienia sprawdzamy po stronie serwera, nie przez chowanie przycisków.
 */
export function wymagajSesji(req, res) {
  const sesja = odczytajSesje(req)
  if (!sesja) {
    res.status(401).json({ ok: false, blad: 'Sesja wygasła. Zaloguj się ponownie.' })
    return null
  }
  return sesja
}

/* --------------------------- repozytorium ------------------------------ */

const API = 'https://api.github.com'

const naglowki = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'rozluznijsie-cms',
})

const repo = () => process.env.GITHUB_REPO
const galaz = () => process.env.GITHUB_BRANCH || 'main'

/** Zwraca `{ tresc, sha }`; sha jest potrzebne przy nadpisaniu pliku. */
export async function pobierzPlik(sciezka) {
  const odp = await fetch(`${API}/repos/${repo()}/contents/${sciezka}?ref=${galaz()}`, {
    headers: naglowki(),
  })
  if (odp.status === 404) return { tresc: null, sha: null }
  if (!odp.ok) throw new Error(`GitHub ${odp.status} przy odczycie ${sciezka}`)

  const dane = await odp.json()
  return { tresc: Buffer.from(dane.content, 'base64').toString('utf8'), sha: dane.sha }
}

export async function pobierzJson(sciezka) {
  const { tresc, sha } = await pobierzPlik(sciezka)
  return { dane: tresc ? JSON.parse(tresc) : null, sha }
}

/** Zapis pliku = commit. Bez `sha` GitHub odrzuci nadpisanie istniejącego. */
export async function zapiszPlik(sciezka, tresc, komunikat, sha, autor) {
  const odp = await fetch(`${API}/repos/${repo()}/contents/${sciezka}`, {
    method: 'PUT',
    headers: { ...naglowki(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: komunikat,
      content: Buffer.isBuffer(tresc) ? tresc.toString('base64') : Buffer.from(tresc).toString('base64'),
      branch: galaz(),
      ...(sha ? { sha } : {}),
      ...(autor ? { committer: { name: 'Panel rozluznijsie.pl', email: autor } } : {}),
    }),
  })

  if (!odp.ok) {
    const tekst = await odp.text()
    console.error('GitHub odrzucił zapis:', odp.status, tekst)
    throw new Error(`GitHub ${odp.status} przy zapisie ${sciezka}`)
  }
  return odp.json()
}

export async function usunPlik(sciezka, sha, komunikat) {
  const odp = await fetch(`${API}/repos/${repo()}/contents/${sciezka}`, {
    method: 'DELETE',
    headers: { ...naglowki(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: komunikat, sha, branch: galaz() }),
  })
  if (!odp.ok) throw new Error(`GitHub ${odp.status} przy usuwaniu ${sciezka}`)
}

export async function listaPlikow(katalog) {
  const odp = await fetch(`${API}/repos/${repo()}/contents/${katalog}?ref=${galaz()}`, {
    headers: naglowki(),
  })
  if (!odp.ok) throw new Error(`GitHub ${odp.status} przy listowaniu ${katalog}`)
  return odp.json()
}

/** Historia zmian pliku — to jest nasze wersjonowanie treści. */
export async function historiaPliku(sciezka, ile = 20) {
  const odp = await fetch(
    `${API}/repos/${repo()}/commits?path=${encodeURIComponent(sciezka)}&sha=${galaz()}&per_page=${ile}`,
    { headers: naglowki() }
  )
  if (!odp.ok) throw new Error(`GitHub ${odp.status} przy historii ${sciezka}`)
  return odp.json()
}

/* ---------------------------- narzędzia -------------------------------- */

/** „Jak się ubrać na masaż” -> „jak-sie-ubrac-na-masaz”. */
export function zrobSlug(tekst) {
  const znaki = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' }
  return String(tekst)
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (z) => znaki[z])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Czas czytania liczony z treści, żeby nikt nie musiał go wpisywać ręcznie. */
export function policzMinuty(bloki) {
  const slowa = bloki
    .map((b) => (b.typ === 'lista' ? b.punkty.join(' ') : `${b.tekst || ''} ${b.tytul || ''}`))
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(slowa / 200))
}

/** Wpuszczamy tylko `<strong>` i `<a href>`; reszta znaczników leci. */
export function oczyscHtml(tekst) {
  return String(tekst)
    .replace(/<(?!\/?(?:strong|a)\b)[^>]*>/gi, '')
    .replace(/<a\b([^>]*)>/gi, (calosc, atrybuty) => {
      const href = (atrybuty.match(/href\s*=\s*"([^"]*)"/i) || [])[1] || ''
      // javascript: i data: nie mają czego szukać w treści artykułu.
      if (!/^(https?:\/\/|\/|mailto:|tel:)/i.test(href)) return '<a>'
      const nowe = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${nowe}>`
    })
}

export const odpowiedzBledem = (res, kod, komunikat) => res.status(kod).json({ ok: false, blad: komunikat })
