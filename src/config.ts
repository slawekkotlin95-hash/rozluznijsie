/** Dane gabinetu i nawigacja. Zmieniać tutaj, nie w komponentach. */
export const firma = {
  nazwa: 'Rozluźnij Się',
  pelnaNazwa: 'Rozluźnij Się, gabinet masażu w Poznaniu',
  nip: '6070095931',
  telefon: '572 317 407',
  telefonHref: 'tel:+48572317407',
  email: 'rozluznijsiepoznan@gmail.com',
  emailHref: 'mailto:rozluznijsiepoznan@gmail.com',
  ulica: 'ul. Piątkowska 94, wejście C',
  kod: '60-650',
  miasto: 'Poznań',
  booksy:
    'https://booksy.com/pl-pl/298201_rozluznij-sie-gabinet-masazu_masaz_15608_poznan',
  facebook: 'https://www.facebook.com/rozluznijsiepoznan',
  instagram: 'https://www.instagram.com/rozluznijsie',
  google: 'https://maps.app.goo.gl/Yov6yckWWSuJsBw47',
  messenger: 'https://m.me/rozluznijsiepoznan',
  mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.68538906488!2d16.9164255!3d52.430498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4704452d72cef235%3A0x39eb83c3c8f2419f!2zUm96bHXFum5paiBzacSZIC0gTWFzYcW8IFBpxIV0a293byAtIEdhYmluZXQgbWFzYcW8dSBQb3puYcWE!5e0!3m2!1spl!2spl!4v1787069666232!5m2!1spl!2spl',
}

/** Cennik przepisany jeden do jednego z akordeonu na starej stronie.
 *  `kadr` to object-position zdjęcia w hero danej podstrony. */
export const masaze = [
  {
    slug: 'relaksacyjny-poznan',
    nazwa: 'Masaż relaksacyjny',
    alt: 'Masażystka wykonuje masaż relaksacyjny pleców w gabinecie Rozluźnij Się w Poznaniu',
    opis: 'Delikatna praca całego ciała. Wycisza układ nerwowy i <strong>poprawia jakość snu</strong>.',
    kadr: '50% 35%',
    ceny: ['1 h: 160 zł', 'Pakiet 4 masaży: 4 x 140 zł', '1 h 30 min: 210 zł', 'Pakiet 4 masaży: 4 x 190 zł'],
  },
  {
    slug: 'klasyczny-poznan',
    nazwa: 'Masaż klasyczny',
    alt: 'Masaż klasyczny pleców wykonywany przedramieniem w gabinecie na Piątkowie',
    opis: 'Klasyka gabinetu. Rozluźnia <strong>napięcia mięśniowe</strong> i poprawia krążenie.',
    kadr: '50% 50%',
    ceny: ['1 h: 160 zł', 'Pakiet 4 masaży: 4 x 140 zł', '1 h 30 min: 210 zł', 'Pakiet 4 masaży: 4 x 190 zł'],
  },
  {
    slug: 'kobido-poznan',
    nazwa: 'Masaż Kobido',
    plakietka: 'Najpopularniejsze',
    alt: 'Masaż twarzy Kobido, dłonie masażystki na skroniach klientki',
    opis: 'Japoński lifting twarzy. Pracuje na mięśniach, nie tylko na skórze.',
    kadr: '50% 45%',
    ceny: ['1 h: 160 zł', 'Pakiet 3 masaży: 3 x 140 zł', '1 h z kinesiotapingiem: 170 zł', 'Pakiet 3 masaży: 3 x 150 zł'],
  },
  {
    slug: 'sportowy-poznan',
    nazwa: 'Masaż sportowy',
    alt: 'Masaż sportowy pleców, praca przedramieniem na napiętych mięśniach',
    opis: 'Dla osób trenujących. <strong>Przyspiesza regenerację</strong> i zmniejsza ryzyko kontuzji.',
    kadr: '50% 50%',
    ceny: ['1 h: 170 zł', 'Pakiet 4 masaży: 4 x 150 zł', '1 h 30 min z rozciąganiem: 220 zł', 'Pakiet 4 masaży: 4 x 200 zł'],
  },
  {
    slug: 'tkanek-glebokich-poznan',
    nazwa: 'Masaż tkanek głębokich',
    alt: 'Masaż tkanek głębokich, punktowa praca kciukiem na plecach',
    opis: 'Mocna, precyzyjna praca na <strong>przewlekłych napięciach</strong> i zrostach.',
    kadr: '50% 50%',
    ceny: ['1 h: 170 zł', 'Pakiet 4 masaży: 4 x 150 zł'],
  },
  {
    slug: 'banka-chinska-poznan',
    nazwa: 'Masaż bańką chińską',
    alt: 'Masaż bańką chińską, silikonowa bańka na udzie klientki',
    opis: 'Podciśnienie zamiast nacisku. Poprawia krążenie i <strong>ujędrnia skórę</strong>.',
    kadr: '50% 55%',
    ceny: ['45 min, nogi: 140 zł', 'Pakiet 4 masaży: 4 x 120 zł', '1 h, nogi i plecy: 160 zł', 'Pakiet 4 masaży: 4 x 140 zł'],
  },
  {
    slug: 'nog-poznan',
    nazwa: 'Masaż nóg z elementami refleksologii',
    alt: 'Masaż nóg z elementami refleksologii, dłonie masażystki na łydce',
    opis: 'Zmęczone nogi i stopy, z elementami refleksologii. <strong>Ulga po całym dniu na nogach</strong>.',
    kadr: '50% 45%',
    ceny: ['45 min: 140 zł', 'Pakiet 4 masaży: 4 x 120 zł'],
  },
  {
    slug: 'glowy-i-barki-poznan',
    nazwa: 'Masaż głowy i obręczy barkowej',
    alt: 'Masaż głowy i obręczy barkowej, dłonie masażystki na karku klienta',
    opis: 'Kark, barki i głowa. Pomaga przy <strong>napięciowych bólach głowy</strong>.',
    kadr: '50% 40%',
    ceny: ['45 min: 140 zł', 'Pakiet 4 masaży: 4 x 120 zł'],
  },
  {
    slug: 'antycellulitowy-poznan',
    nazwa: 'Masaż antycellulitowy',
    alt: 'Masaż antycellulitowy bańką, praca na udzie i pośladku',
    opis: 'Intensywna praca na udach i pośladkach. Wspiera <strong>ujędrnianie skóry</strong>.',
    kadr: '50% 55%',
    ceny: ['1 h: 170 zł', 'Pakiet 4 masaży: 4 x 150 zł'],
  },
]

/**
 * Adres podstrony zabiegu. Wszystkie siedzą pod /masaze/<slug>, poza masażem
 * relaksacyjnym, który ma własną, ręcznie pisaną podstronę pod starym adresem.
 */
export const sciezkaMasazu = (slug: string) =>
  slug === 'relaksacyjny-poznan' ? '/masaz-relaksacyjny-poznan' : `/masaze/${slug}`

export const dzielnice = [
  { slug: 'ogrody-poznan', nazwa: 'Ogrody' },
  { slug: 'grunwald-poznan', nazwa: 'Grunwald' },
  { slug: 'jezyce-poznan', nazwa: 'Jeżyce' },
  { slug: 'winogrady-poznan', nazwa: 'Winogrady' },
  { slug: 'winiary-poznan', nazwa: 'Winiary' },
  { slug: 'podolany-poznan', nazwa: 'Podolany' },
  { slug: 'solacz-poznan', nazwa: 'Sołacz' },
  { slug: 'piatkowo-poznan', nazwa: 'Piątkowo' },
]

export const zespol = [
  { slug: 'nicole-stokowska', imie: 'Nicole Stokowska' },
  { slug: 'kamil-jedrzejewski', imie: 'Kamil Jędrzejewski' },
]

export const menu = [
  { nazwa: 'Strona główna', href: '/' },
  { nazwa: 'O nas', href: '/o-nas', pod: zespol.map((o) => ({ nazwa: o.imie, href: `/o-nas/${o.slug}` })) },
  { nazwa: 'Masaże', href: '/masaze', pod: masaze.map((m) => ({ nazwa: m.nazwa.replace('Masaż ', ''), href: sciezkaMasazu(m.slug) })) },
  { nazwa: 'Cennik', href: '/cennik-masazu-poznan' },
  { nazwa: 'Vouchery', href: '/vouchery' },
  { nazwa: 'Pierwsza wizyta', href: '/pierwsza-wizyta' },
  { nazwa: 'Masaż z dojazdem', href: '/dojazd', pod: dzielnice.map((d) => ({ nazwa: d.nazwa, href: `/dojazd/${d.slug}` })) },
  { nazwa: 'Masaż biurowy', href: '/dla-firm/masaz-biurowy-poznan' },
  {
    nazwa: 'Blog',
    href: '/blog',
    pod: [
      { nazwa: 'Najczęstsze pytania', href: '/faq' },
      { nazwa: 'Alfabet dolegliwości', href: '/alfabet-dolegliwosci' },
    ],
  },
  { nazwa: 'Kontakt', href: '/kontakt' },
]

/** Godziny otwarcia. Kolejność od poniedziałku, bo tak czyta je człowiek. */
export const godziny = [
  { dzien: 'Poniedziałek', od: '08:00', do: '20:00', schema: 'Monday' },
  { dzien: 'Wtorek', od: '08:00', do: '20:00', schema: 'Tuesday' },
  { dzien: 'Środa', od: '08:00', do: '20:00', schema: 'Wednesday' },
  { dzien: 'Czwartek', od: '08:00', do: '20:00', schema: 'Thursday' },
  { dzien: 'Piątek', od: '08:00', do: '20:00', schema: 'Friday' },
  { dzien: 'Sobota', od: '08:00', do: '15:00', schema: 'Saturday' },
  { dzien: 'Niedziela', od: '08:00', do: '14:00', schema: 'Sunday' },
]

/** Do czego pomaga dany masaż — dymki na kartach, każdy w innym kolorze. */
export const wskazania: Record<string, { tekst: string; kolor: string }> = {
  relaksacyjny: { tekst: 'Stres i problemy ze snem', kolor: 'fiolet' },
  klasyczny: { tekst: 'Sztywny kark i barki', kolor: 'zielony' },
  kobido: { tekst: 'Napięcie twarzy i lifting', kolor: 'rozowy' },
  sportowy: { tekst: 'Regeneracja po treningu', kolor: 'niebieski' },
  'tkanek-glebokich': { tekst: 'Przewlekłe napięcia i zrosty', kolor: 'terakota' },
  'banka-chinska': { tekst: 'Krążenie i jędrność skóry', kolor: 'rozowy' },
  nog: { tekst: 'Ciężkie i zmęczone nogi', kolor: 'niebieski' },
  'glowy-i-barki': { tekst: 'Bóle głowy od komputera', kolor: 'zielony' },
  antycellulitowy: { tekst: 'Cellulit i drenaż', kolor: 'terakota' },
}
