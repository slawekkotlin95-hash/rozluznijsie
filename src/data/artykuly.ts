/**
 * Artykuły pisane od zera, w odróżnieniu od wpisów przeniesionych ze starego
 * WordPressa (te lecą przez `zrodlo.json`).
 *
 * Same dane leżą w `artykuly.json`, bo to ten plik zapisuje panel w /admin.
 * Tutaj zostaje wyłącznie typowanie i filtr statusów: szkice i wpisy z datą
 * w przyszłości nie trafiają na stronę, choć w panelu są widoczne.
 *
 * W polach tekstowych wolno używać `<strong>` i `<a href>` — nic więcej.
 */
import dane from './artykuly.json'

export type Blok =
  | { typ: 'p'; tekst: string }
  | { typ: 'h2'; tekst: string }
  | { typ: 'h3'; tekst: string }
  | { typ: 'lista'; punkty: string[] }
  | { typ: 'ramka'; tytul: string; tekst: string }
  | { typ: 'zdjecie'; klucz: string; alt: string; podpis?: string }

export type Status = 'opublikowany' | 'szkic'

export interface Artykul {
  slug: string
  tytul: string
  /** Lead pod tytułem, służy też za meta description. */
  lead: string
  /** Tytuł w zakładce przeglądarki; bez niego leci sam tytuł wpisu. */
  metaTytul?: string
  /** Opis w Google; bez niego leci lead. */
  metaOpis?: string
  /** Fraza, pod którą piszemy wpis. Służy tylko do podpowiedzi w panelu. */
  fraza?: string
  /** Wpis widoczny na stronie, ale ukryty przed Google i mapą strony. */
  noindex?: boolean
  /** Slug osoby z `zespol` w config.ts; brak = podpisuje gabinet. */
  autor?: string
  data: string
  /** Data ostatniej zmiany, ustawiana przez panel przy zapisie. */
  aktualizacja?: string
  minuty: number
  /** Nazwa pliku z src/assets (albo klucz z `zdjeciaArtykulow`). Leci też jako obrazek do udostępnień. */
  miniatura: string
  /** Brak pola = wpis opublikowany, tak były zapisane pierwsze artykuły. */
  status?: Status
  bloki: Blok[]
}

const wszystkie = dane as Artykul[]

/** Data w przyszłości = publikacja zaplanowana, więc wpis jeszcze nie wychodzi. */
const juzOpublikowany = (a: Artykul) =>
  (a.status ?? 'opublikowany') === 'opublikowany' && a.data <= new Date().toISOString().slice(0, 10)

/** Wszystko, łącznie ze szkicami. Do użytku panelu i narzędzi. */
export const artykulyWszystkie = wszystkie

/** To, co widzi czytelnik strony. */
export const artykuly = wszystkie.filter(juzOpublikowany)
