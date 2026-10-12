/** Nowy adres -> stary slug na WordPressie, z którego bierzemy treść. */
export const zrodloTresci: Record<string, string> = {
  '/masaze': 'masaze',
  '/masaze/klasyczny-poznan': 'masaz-klasyczny-poznan',
  '/masaze/kobido-poznan': 'masaz-kobido-poznan',
  '/masaze/sportowy-poznan': 'masaz-sportowy-poznan',
  '/masaze/tkanek-glebokich-poznan': 'masaz-tkanek-glebokich-poznan',
  '/masaze/banka-chinska-poznan': 'masaz-banka-chinska-poznan',
  '/masaze/nog-poznan': 'masaz-nog-poznan',
  '/masaze/glowy-i-barki-poznan': 'masaz-glowy-i-obreczy-barkowej-poznan',
  '/masaze/antycellulitowy-poznan': 'masaz-antycellulitowy-poznan',
  '/masaze/dloni-poznan': 'masaz-dloni-poznan-stacjonarnie-z-dojazdem',
  '/cennik-masazu-poznan': 'cennik',
  '/vouchery': 'vouchery',
  '/vouchery/podarunkowy': 'voucher-podarunkowy-na-masaz-poznan',
  '/pierwsza-wizyta': 'pierwsza-wizyta',
  '/dojazd': 'masaz-z-dojazdem-poznan',
  '/dojazd/ogrody-poznan': 'masaz-z-dojazdem-ogrody-poznan',
  '/dojazd/grunwald-poznan': 'masaz-z-dojazdem-grunwald-poznan',
  '/dojazd/jezyce-poznan': 'masaz-z-dojazdem-jezyce-poznan',
  '/dojazd/winogrady-poznan': 'masaz-z-dojazdem-winogrady-poznan',
  '/dojazd/winiary-poznan': 'masaz-z-dojazdem-winiary-poznan',
  '/dojazd/podolany-poznan': 'masaz-z-dojazdem-podolany-poznan',
  '/dojazd/solacz-poznan': 'masaz-z-dojazdem-solacz-poznan',
  '/dojazd/piatkowo-poznan': 'masaz-poznan-piatkowo',
  '/dojazd/dla-seniora-poznan': 'masaz-dla-seniora-poznan-dojazd',
  '/dojazd/w-twoim-domu-poznan': 'masaz-z-dojazdem-relaks-w-twoim-domu-poznan',
  '/dla-firm': 'masaz-dla-firm-poznan',
  '/dla-firm/masaz-biurowy-poznan': 'masaz-biurowy-poznan',
  '/o-nas': 'o-nas',
  '/o-nas/nicole-stokowska': 'nicole-stokowska',
  '/o-nas/kamil-jedrzejewski': 'kamil-jedrzejewski',
  '/faq': 'najczestsze-pytania',
  '/alfabet-dolegliwosci': 'alfabet-dolegliwosci',
  '/kontakt': 'kontakt',
  '/polityka-prywatnosci': 'polityka-prywatnosci',
  '/regulamin': 'regulamin-salonu',
  '/masaz-poznan': 'masaz-poznan',
}

export interface Wpis {
  slug: string
  zrodlo: string
  tytul: string
  lead: string
  /** Data publikacji w ISO. Patrz komentarz nad listą wpisów. */
  data: string
  /** Wpis pisany ręcznie, ma własną podstronę i nie leci przez `[wpis].astro`. */
  wlasny?: boolean
  /** Czas czytania dla wpisów bez treści w zrodlo.json. Reszta liczy się sama. */
  minuty?: number
}

/**
 * Blog. Wszystkie wpisy, także te przeniesione z WordPressa, leżą w
 * `artykuly.json` i edytuje się je w panelu /admin. Tutaj zostaje tylko
 * Kobido Up, które ma własną, bogatszą podstronę.
 */
import { artykuly } from './artykuly'

/** Artykuły pisane od zera wchodzą na listę wpisów na tych samych prawach. */
const wpisyZArtykulow: Wpis[] = artykuly.map((a) => ({
  slug: a.slug,
  zrodlo: '',
  wlasny: true,
  minuty: a.minuty,
  data: a.data,
  tytul: a.tytul,
  lead: a.lead,
}))

export const wpisy: Wpis[] = [
  ...wpisyZArtykulow,
  { slug: 'masaz-kobido-up-poznan', zrodlo: '', wlasny: true, minuty: 26, data: '2026-08-20', tytul: 'Masaż Kobido Up Poznań: na czym polega i jakie daje efekty', lead: 'Japoński lifting twarzy krok po kroku: przebieg zabiegu, techniki, efekty, przeciwwskazania i cena.' },
]

/** Wpisy od najnowszego. Kolejność w tablicy nie ma wtedy znaczenia. */
export const wpisyOdNajnowszych = [...wpisy].sort((a, b) => b.data.localeCompare(a.data))

const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']

/** 2025-10-13 -> „13 października 2025". Bez toLocaleDateString, bo ICU bywa okrojone. */
export function dataPolska(iso: string) {
  const [rok, miesiac, dzien] = iso.split('-')
  return `${Number(dzien)} ${MIESIACE[Number(miesiac) - 1]} ${rok}`
}
