/**
 * Miasta, do których dojeżdżamy z masażem biurowym na zamówienie firm.
 * Baza zostaje w Poznaniu, więc każda podstrona wychodzi od trasy z Poznania.
 *
 * Każde miasto ma własne fakty: trasę, orientacyjny dystans i dzielnice
 * biurowe. Dzięki temu podstrony różnią się treścią, a nie samą nazwą miasta.
 * Kolejność w tablicy wyznacza kolejność na liście miast.
 */
export interface Miasto {
  slug: string
  nazwa: string
  /** „we Wrocławiu", „w Warszawie" — miejscownik z przyimkiem. */
  wMiescie: string
  /** „do Wrocławia" — dopełniacz z przyimkiem. */
  doMiasta: string
  /** Orientacyjny dystans z gabinetu na Piątkowie. */
  km: number
  /** Ile mniej więcej zajmuje nam dojazd. */
  czas: string
  /** Główna trasa, którą jedziemy. */
  trasa: string
  /** Dzielnice i miejsca, gdzie skupiają się biura. */
  biura: string
  /** Zdanie o lokalnej specyfice, żeby strona nie była kalką. */
  akcent: string
}

export const miasta: Miasto[] = [
  {
    slug: 'wroclaw',
    nazwa: 'Wrocław',
    wMiescie: 'we Wrocławiu',
    doMiasta: 'do Wrocławia',
    km: 180,
    czas: 'około dwóch godzin',
    trasa: 'drogą S5',
    biura: 'Business Garden i biurowce wzdłuż Legnickiej, Sky Tower na Krzykach oraz kompleksy przy Powstańców Śląskich',
    akcent:
      'Wrocław jest dla nas najbliższym dużym rynkiem biurowym poza Wielkopolską, więc jednodniowy dzień zdrowia da się tu zrobić bez noclegu i bez podbijania kosztów dojazdu.',
  },
  {
    slug: 'warszawa',
    nazwa: 'Warszawa',
    wMiescie: 'w Warszawie',
    doMiasta: 'do Warszawy',
    km: 310,
    czas: 'około trzech godzin',
    trasa: 'autostradą A2',
    biura: 'Wola wokół ronda Daszyńskiego, Służewiec i Domaniewska, a także wieżowce w ścisłym centrum',
    akcent:
      'Warszawskie zespoły najczęściej zamawiają masaż na cały dzień dla kilkudziesięciu osób, bo przy takiej skali dojazd rozkłada się na wiele stanowisk i przestaje mieć znaczenie w budżecie.',
  },
  {
    slug: 'lodz',
    nazwa: 'Łódź',
    wMiescie: 'w Łodzi',
    doMiasta: 'do Łodzi',
    km: 220,
    czas: 'około dwóch i pół godziny',
    trasa: 'autostradą A2',
    biura: 'Nowe Centrum Łodzi, biurowce przy Ogrodowej i Manufakturze oraz okolice Piotrkowskiej',
    akcent:
      'W Łodzi pracujemy głównie z zespołami z centrów usług wspólnych, gdzie ludzie spędzają przy monitorze cały dzień, a napięcie zbiera się w karku i między łopatkami.',
  },
  {
    slug: 'bydgoszcz',
    nazwa: 'Bydgoszcz',
    wMiescie: 'w Bydgoszczy',
    doMiasta: 'do Bydgoszczy',
    km: 140,
    czas: 'niecałe dwie godziny',
    trasa: 'drogą S5',
    biura: 'centrum wzdłuż Gdańskiej, Bydgoski Park Przemysłowo-Technologiczny i biura na Fordonie',
    akcent:
      'Bydgoszcz leży na tyle blisko, że zdążymy dojechać na poranną sesję i wrócić tego samego dnia, więc sprawdza się tu też model cykliczny: stały dzień masażu co dwa tygodnie.',
  },
  {
    slug: 'torun',
    nazwa: 'Toruń',
    wMiescie: 'w Toruniu',
    doMiasta: 'do Torunia',
    km: 160,
    czas: 'około dwóch godzin',
    trasa: 'drogą S5 i A1',
    biura: 'biura w centrum, okolice Szosy Chełmińskiej oraz firmy z parków technologicznych na obrzeżach',
    akcent:
      'Toruń często łączymy w jednej trasie z Bydgoszczą, więc jeśli macie tu dwa oddziały albo znacie zaprzyjaźnioną firmę, warto zamówić dwa dni pod rząd.',
  },
  {
    slug: 'szczecin',
    nazwa: 'Szczecin',
    wMiescie: 'w Szczecinie',
    doMiasta: 'do Szczecina',
    km: 260,
    czas: 'około trzech godzin',
    trasa: 'drogą S3',
    biura: 'biurowce w centrum, okolice alei Wyzwolenia i firmy z terenów portowych',
    akcent:
      'Do Szczecina jedziemy najczęściej na większe wydarzenia: dni otwarte, konferencje i pikniki firmowe, gdzie strefa masażu stoi obok innych atrakcji przez kilka godzin.',
  },
  {
    slug: 'zielona-gora',
    nazwa: 'Zielona Góra',
    wMiescie: 'w Zielonej Górze',
    doMiasta: 'do Zielonej Góry',
    km: 140,
    czas: 'niecałe dwie godziny',
    trasa: 'drogą S3',
    biura: 'Lubuski Park Przemysłowy, biura w centrum i firmy produkcyjne z okolic',
    akcent:
      'W Zielonej Górze pracujemy nie tylko z biurami: przy halach produkcyjnych masaż na krześle robi robotę dla ludzi, którzy cały dzień stoją albo powtarzają ten sam ruch.',
  },
  {
    slug: 'gdansk',
    nazwa: 'Gdańsk',
    wMiescie: 'w Gdańsku',
    doMiasta: 'do Gdańska',
    km: 300,
    czas: 'około trzech godzin',
    trasa: 'drogą S5 i A1',
    biura: 'Olivia Centre i biurowce w Oliwie, Wrzeszcz oraz firmy z okolic portu',
    akcent:
      'Trójmiejskie firmy zamawiają masaż biurowy najczęściej przy okazji integracji albo dnia zdrowia, dlatego do Gdańska jedziemy zwykle na dwa stanowiska naraz.',
  },
]

export const miastoPoSlugu = (slug: string) => miasta.find((m) => m.slug === slug)
