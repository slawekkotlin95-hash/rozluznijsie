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
 * Blog. Tytuły skrócone, bo stare były dopisane frazą „masaż Poznań".
 *
 * Daty: WordPress nie oddał metadanych przy zrzucie, więc kolejność odtworzona
 * jest z archiwum starej „Bazy wiedzy" (leciało od najnowszego), a miesiące
 * z katalogów `wp-content/uploads/ROK/MIESIĄC` wyróżnionych obrazków.
 * Dni są przybliżone. Jeśli klient poda prawdziwe daty, podmienić tutaj.
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
  { slug: 'ergonomia-pracy', zrodlo: 'ergonomia-pracy-masaz-poznan', data: '2025-12-08', tytul: 'Ergonomia pracy przy biurku', lead: 'Ustawienie monitora, krzesła i przerwy, które faktycznie coś zmieniają.' },
  { slug: 'napiecie-jesienia', zrodlo: 'dlaczego-nasze-cialo-napina-sie-jesienia-masaz-poznan', data: '2025-10-13', tytul: 'Dlaczego ciało napina się jesienią', lead: 'Mniej światła, mniej ruchu i więcej zimna. Ciało reaguje na to bardzo konkretnie.' },
  { slug: 'tkanki-glebokie-dla-kogo', zrodlo: 'masaz-tkanek-glebokich-dla-kogo-poznan', data: '2025-09-15', tytul: 'Masaż tkanek głębokich dla kogo', lead: 'Mocna praca, która nie każdemu jest potrzebna. Sprawdź, czy to zabieg dla Ciebie.' },
  { slug: 'masaz-a-sen', zrodlo: 'masaz-a-sen-poznan-winiary', data: '2025-08-25', tytul: 'Masaż a sen', lead: 'Dlaczego po dobrym masażie zasypia się szybciej i śpi głębiej.' },
  { slug: 'stres-a-bol', zrodlo: 'wplyw-stresu-na-bol-a-rola-masazu-poznan', data: '2025-08-11', tytul: 'Wpływ stresu na ból', lead: 'Napięcie psychiczne zamienia się w napięcie mięśniowe. To działa w obie strony.' },
  { slug: 'przeciazenia-treningowe', zrodlo: 'przeciazenia-aktywnosc-fizyczna-masaz-poznan', data: '2025-07-28', tytul: 'Przeciążenia po treningu', lead: 'Regeneracja to część planu treningowego, nie nagroda za jego wykonanie.' },
  { slug: 'bol-miedzy-lopatkami', zrodlo: 'bol-miedzy-lopatkami-masaz-poznan', data: '2025-07-14', tytul: 'Ból między łopatkami', lead: 'Klasyczna dolegliwość osób pracujących przy komputerze.' },
  { slug: 'bol-glowy-i-szyi', zrodlo: 'bol-glowy-i-szyi-masaz-poznan', data: '2025-07-07', tytul: 'Ból głowy i szyi', lead: 'Napięciowe bóle głowy najczęściej zaczynają się w karku i barkach.' },
  { slug: 'jak-wybrac-masaz', zrodlo: 'na-co-zwrocic-uwage-przy-wyborze-masazu', data: '2025-06-23', tytul: 'Na co zwrócić uwagę przy wyborze masażu', lead: 'Czym różni się masaż relaksacyjny od tkanek głębokich i po czym poznać, że trafiłeś do dobrego gabinetu.' },
  { slug: 'ile-kosztuje-masaz', zrodlo: 'ile-kosztuje-masaz-w-poznaniu', data: '2025-06-09', tytul: 'Ile kosztuje masaż w Poznaniu', lead: 'Co składa się na cenę zabiegu i dlaczego najtańsza oferta rzadko bywa najlepsza.' },
  { slug: 'praca-siedzaca', zrodlo: 'negatywne-skutki-pracy-siedzacej-masaz-poznan', data: '2025-05-26', tytul: 'Co robi z ciałem praca siedząca', lead: 'Osiem godzin przy biurku odkłada się w konkretnych partiach mięśni.' },
  { slug: 'kobido-up', zrodlo: 'masaz-kobido-up-dlaczego-tak-popularny', data: '2025-05-19', tytul: 'Kobido UP i dlaczego stało się tak popularne', lead: 'Japoński masaż twarzy, który działa na mięśnie, a nie tylko na skórę.' },
  { slug: 'bol-dolnego-odcinka-plecow', zrodlo: 'bol-dolnego-odcinka-plecow', data: '2025-05-12', tytul: 'Ból dolnego odcinka pleców', lead: 'Skąd się bierze, kiedy pomaga masaż, a kiedy trzeba iść do lekarza.' },
]

/** Wpisy od najnowszego. Kolejność w tablicy nie ma wtedy znaczenia. */
export const wpisyOdNajnowszych = [...wpisy].sort((a, b) => b.data.localeCompare(a.data))

const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']

/** 2025-10-13 -> „13 października 2025". Bez toLocaleDateString, bo ICU bywa okrojone. */
export function dataPolska(iso: string) {
  const [rok, miesiac, dzien] = iso.split('-')
  return `${Number(dzien)} ${MIESIACE[Number(miesiac) - 1]} ${rok}`
}
