/**
 * Opinie przepisane z wizytówki Google i z Booksy (stan na wrzesień 2026).
 * Treść zostaje dokładnie taka, jak wystawili ją klienci: bez poprawiania
 * literówek i bez skracania. `urwana` oznacza opinię, która w źródle była
 * zwinięta pod „Więcej" — pokazujemy tyle, ile widać, i linkujemy do reszty.
 *
 * Dopisanie nowej opinii to jeden obiekt w tej tablicy, slider sam ją weźmie.
 */
export interface Opinia {
  autor?: string
  zrodlo: 'google' | 'booksy'
  ocena: number
  tekst: string
  urwana?: boolean
}

export const opinie: Opinia[] = [
  {
    zrodlo: 'booksy',
    ocena: 5,
    tekst: 'Serdecznie polecam!!! Świetny konkretny masaż ❤️',
  },
  {
    autor: 'Martwy Kotek',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Świetne masaże, przystępne ceny, miła atmosfera… same plusy! Polecam gorąco 🔥',
  },
  {
    zrodlo: 'booksy',
    ocena: 5,
    tekst: 'Po masażu Kobido wyszłam naprawdę zachwycona! ❤️ Pani wykonująca masaż była niezwykle zaangażowana, uważna i profesjonalna. Cały zabieg był wykonany z ogromną …',
    urwana: true,
  },
  {
    autor: 'Małgorzata',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Z ręką na sercu polecam pana Kamila i jego gabinet masażu! Od lat jestem stałą klientką. Wstępny wywiad tego, co boli przed masażem i wybór masażu bardzo sobie chwalę, jak i cały profesjonalny masaż w przystępnej cenie, w uroczym wnętrzu.',
  },
  {
    zrodlo: 'booksy',
    ocena: 5,
    tekst: 'bardzo dobry masaż',
  },
  {
    autor: 'Daria Handze',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Świetne miejsce, zdecydowanie do polecenia. Pan Kamil po wstępnym wywiadzie, skupił się na problematycznych miejscach i już w trakcie masażu poczułam ulgę. Po zabiegu otrzymałam zestaw ćwiczeń do wykonywania, żeby dolegliwości bólowe nie wróciły.',
  },
  {
    autor: 'Anastasia Luhanskaya',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Jestem bardzo zadowolona z wizyty. Masaż był świetny, a atmosfera bardzo przyjemna i relaksująca. Pan Kamil jest profesjonalny, życzliwy i sprawia, że można …',
    urwana: true,
  },
  {
    autor: 'Koleta Dorosiewicz',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Bardzo przyjemny masaż kobido. Polecam udać sie do tego miejsca :)',
  },
  {
    zrodlo: 'booksy',
    ocena: 5,
    tekst: 'Bardzo polecam',
  },
  {
    autor: 'Anna Lasoń',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Bardzo polecam! Było rozluźniająco i miło, a o to przecież chodzi ;)',
  },
  {
    autor: 'Marek Wawrzyniak',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Polecam Pana Kamila. Skorzystałem z masażu tkanek głębokich i poczułem wyraźna ulgę, zwłaszcza w okolicach karku. Szczególnie polecam osobom, które na co dzień dużo siedzą przy biurku.',
  },
  {
    autor: 'Łukasz B',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'W końcu ulga dla moich barków. Dziekuje',
  },
  {
    autor: 'Natalia Przybył',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Bardzo polecam gabinet masażu. Dogodna lokalizacja, ceny również, profesjonalne zaopiekowanie klientem, miły klimat, korzystam regularnie :).',
  },
  {
    autor: 'Ola Z',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Byłam na masażu klasycznym i polecam!',
  },
  {
    autor: 'Michał Pelec',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Pełen profesjonalizm i bardzo miła atmosfera. Trafiłem z bólem pleców i oprócz skutecznego masażu dostałem również wskazówki oraz ćwiczenia do domu. Super podejście do klienta i realna chęć pomocy. Polecam każdemu, kto szuka fachowej pomocy! 👍💪',
  },
  {
    autor: 'P. Ch.',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Byłam jakiś czas temu na masaż twarzy. Bardzo miłe miejsce. Zaangażowana masażystka. Przyjemny wystrój i muzyka. Dobrze dobrana oferta. Duże zainteresowanie …',
    urwana: true,
  },
  {
    autor: 'Olga Jarmonik',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Świetny masaż, absolutnie profesjonalne podejście. A w zestawie ćwiczenia do domu- czyli kompleksowe podejście do problemu pacjenta. Polecam!',
  },
  {
    autor: 'Maria Dziadosz',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Zdecydowanie się rozluzniłam! Pan Kamil idealnie dostosował intensywność masażu do moich potrzeb. Będę wracać! :)',
  },
  {
    autor: 'Małgorzata Piechowiak',
    zrodlo: 'google',
    ocena: 5,
    tekst: 'Wraz z mężem korzystaliśmy z masażu u Pana Kamila. Profesjonalnie. Przyjazna atmosfera. Napewno wrócimy.',
  },
]
