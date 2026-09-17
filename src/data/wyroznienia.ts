/**
 * Automatyczne wyróżnienia w przeniesionej treści. Stara strona miała gołe
 * akapity bez pogrubień i bez linkowania wewnętrznego, a przepisywanie
 * pięćdziesięciu podstron ręcznie mijałoby się z celem.
 *
 * Zasada: każda fraza łapie się **raz na stronę**, żeby nie zrobić choinki.
 * Frazy z `href` stają się linkiem, reszta samym pogrubieniem.
 */
export interface Wyroznienie {
  /** Warianty odmiany, bo polski. Dopasowanie bez rozróżniania wielkości liter. */
  frazy: string[]
  href?: string
}

export const wyroznienia: Wyroznienie[] = [
  { frazy: ['masażu relaksacyjnym', 'masaż relaksacyjny', 'masażu relaksacyjnego'], href: '/masaz-relaksacyjny-poznan' },
  { frazy: ['masażu klasycznego', 'masaż klasyczny', 'masażem klasycznym'], href: '/masaze/klasyczny-poznan' },
  { frazy: ['masaż tkanek głębokich', 'masażu tkanek głębokich'], href: '/masaze/tkanek-glebokich-poznan' },
  { frazy: ['masaż sportowy', 'masażu sportowego'], href: '/masaze/sportowy-poznan' },
  { frazy: ['Kobido UP', 'masaż Kobido', 'Kobido'], href: '/masaze/kobido-poznan' },
  { frazy: ['bańką chińską', 'bańka chińska'], href: '/masaze/banka-chinska-poznan' },
  { frazy: ['masaż antycellulitowy', 'masażu antycellulitowego'], href: '/masaze/antycellulitowy-poznan' },
  { frazy: ['masaż głowy', 'obręczy barkowej'], href: '/masaze/glowy-i-barki-poznan' },
  { frazy: ['refleksologii'], href: '/masaze/nog-poznan' },
  { frazy: ['masaż z dojazdem', 'masażu z dojazdem', 'z dojazdem do klienta'], href: '/dojazd' },
  { frazy: ['masaż biurowy', 'masażu biurowego'], href: '/dla-firm/masaz-biurowy-poznan' },
  { frazy: ['dla firm'], href: '/dla-firm' },
  { frazy: ['voucher', 'vouchery', 'karta podarunkowa'], href: '/vouchery' },
  { frazy: ['cennik', 'cenniku'], href: '/cennik-masazu-poznan' },
  { frazy: ['pierwsza wizyta', 'pierwszej wizyty', 'pierwszy raz'], href: '/pierwsza-wizyta' },
  { frazy: ['na Piątkowie', 'Piątkowo'], href: '/dojazd/piatkowo-poznan' },

  // Same pogrubienia, bez linków
  { frazy: ['bez pośpiechu'] },
  { frazy: ['indywidualne podejście', 'indywidualnie'] },
  { frazy: ['bezpieczną przestrzeń', 'bezpiecznie'] },
  { frazy: ['napięcia mięśniowe', 'napięć mięśniowych', 'napięcie mięśniowe'] },
  { frazy: ['regularność'] },
  { frazy: ['ból pleców', 'bólu pleców'] },
  { frazy: ['praca siedząca', 'pracy siedzącej'] },
]

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Zwraca HTML akapitu z pogrubieniami i linkami. `uzyte` to zbiór dzielony
 * przez całą stronę, żeby ta sama fraza nie powtarzała się w kółko.
 */
export function wyroznij(tekst: string, uzyte: Set<string>, biezacy = ''): string {
  let html = tekst
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  for (const [i, w] of wyroznienia.entries()) {
    const klucz = String(i)
    if (uzyte.has(klucz)) continue

    for (const fraza of w.frazy) {
      const re = new RegExp(`(?<![\\p{L}])(${escape(fraza)})(?![\\p{L}])`, 'iu')
      if (!re.test(html)) continue

      // Link do strony, na której właśnie jesteśmy, nie ma sensu — zostaje samo pogrubienie.
      const doSiebie = w.href && w.href.replace(/\/$/, '') === biezacy.replace(/\/$/, '')
      html = html.replace(re, (m) =>
        w.href && !doSiebie ? `<a href="${w.href}"><strong>${m}</strong></a>` : `<strong>${m}</strong>`
      )
      uzyte.add(klucz)
      break
    }
  }

  return html
}
