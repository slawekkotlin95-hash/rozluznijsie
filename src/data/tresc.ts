import zrodlo from './zrodlo.json'
import { dopiski } from './dopiski'

/**
 * Treść zaciągnięta ze starej strony na WordPressie. Trzymamy ją w jednym
 * pliku, żeby podstrony były szablonami, a nie kopiami tego samego układu.
 */
export interface Blok {
  tag: string
  tekst: string
}

interface StronaZrodlowa {
  url: string
  slug: string
  title: string
  opis: string
  h1: string
  bloki: Blok[]
  zdjecia: string[]
}

/** Śmieci z bannera cookies, stopki i formularza, które wchodzą w każdy zrzut. */
const SMIECI = [
  /^Cenimy prywatność/i,
  /^Używamy plików cookie/i,
  /^Brak plików cookie/i,
  /^(Akceptuj|Odrzuć|Dostosuj|Zapisz)/i,
  /^Funkcjonalne$|^Statystyki$|^Marketing$|^Preferencje$|^Zawsze aktywne$/i,
  /^ul\. Piątkowska 94/i,
  /^Masaż z dojazdem: Ogrody/i,
  /^Polityka prywatności \| Regulamin/i,
  /^NIP:/i,
  /^Zapoznałem się i akceptuje/i,
  /^Zobacz szczegóły$|^Czytaj dalej$|^Wyświetl preferencje$/i,
  /^Zarezerwuj online$|^Zadzwoń$|^Umów wizytę$/i,
]

/** Drobne poprawki językowe wskazane przez klienta. */
const poprawki: [RegExp, string][] = [[/technikiem masażystką/gi, 'technikiem masażystą'], [/technik masażystka/gi, 'technik masażysta']]

const popraw = (t: string) => poprawki.reduce((s, [re, na]) => s.replace(re, na), t)

const czysty = (b: Blok) => !SMIECI.some((r) => r.test(b.tekst)) && b.tekst.length > 1

/**
 * Elementor zagnieżdża listy w akapitach, więc ten sam tekst wpada raz jako <p>
 * i raz jako <li>. Zostawiamy pierwsze wystąpienie, resztę wycinamy.
 */
function bezPowtorzen(bloki: Blok[]) {
  const widziane = new Set<string>()
  return bloki.filter((b) => {
    const klucz = b.tekst.toLowerCase().replace(/[\s.,;:]+/g, ' ').trim()
    if (widziane.has(klucz)) return false
    widziane.add(klucz)
    return true
  })
}

const strony = (zrodlo as StronaZrodlowa[]).map((s) => ({
  ...s,
  bloki: bezPowtorzen(s.bloki.filter(czysty)).map((b) => ({ ...b, tekst: popraw(b.tekst) })),
}))

/** Zwraca treść po starym slugu, np. 'masaz-relaksacyjny-poznan'. */
export function tresc(staryslug: string) {
  const s = strony.find((x) => x.slug === staryslug)
  if (!s) throw new Error(`Brak treści źródłowej dla: ${staryslug}`)
  return s
}

/** Akapity bez nagłówków — do krótkich wstępów. */
export function akapity(staryslug: string, ile?: number) {
  const p = tresc(staryslug).bloki.filter((b) => b.tag === 'p')
  return ile ? p.slice(0, ile) : p
}

/**
 * Dzieli treść na sekcje po nagłówkach h2/h3. Pierwsza sekcja bez tytułu
 * to wstęp, każda kolejna dostaje nagłówek ze starej strony.
 */
export function sekcje(staryslug: string) {
  const wynik: { tytul?: string; bloki: Blok[] }[] = [{ bloki: [] }]

  for (const b of tresc(staryslug).bloki) {
    if (b.tag === 'h2' || b.tag === 'h3') wynik.push({ tytul: b.tekst, bloki: [] })
    else wynik[wynik.length - 1].bloki.push(b)
  }

  // Sekcje, które na WordPressie miały sam nagłówek, uzupełniamy tekstem od klienta.
  const doDopisania = dopiski[staryslug]
  if (doDopisania) {
    for (const [poczatek, akapity] of Object.entries(doDopisania)) {
      const cel = wynik.find((s) => s.tytul?.startsWith(poczatek))
      if (cel) cel.bloki.push(...akapity.map((tekst) => ({ tag: 'p', tekst })))
    }
  }

  return wynik.filter((s) => s.tytul || s.bloki.length)
}

/**
 * Szacowany czas czytania w minutach, liczony z rzeczywistej treści.
 * 200 słów na minutę to typowe tempo czytania po polsku.
 */
export function minutyCzytania(staryslug: string) {
  const slowa = tresc(staryslug)
    .bloki.map((b) => b.tekst)
    .join(' ')
    .trim()
    .split(/\s+/).length

  return Math.max(1, Math.round(slowa / 200))
}
