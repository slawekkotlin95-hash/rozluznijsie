/**
 * Mapa starych adresów z WordPressa na nowe, uporządkowane w katalogi.
 * Klucz to ścieżka na starej stronie, wartość to nowa. Z tego generujemy
 * zarówno strukturę serwisu, jak i przekierowania 301 w vercel.json.
 */
export const mapaAdresow: Record<string, string> = {
  // strony
  '/o-nas/': '/o-nas',
  '/nicole-stokowska/': '/o-nas/nicole-stokowska',
  '/kamil-jedrzejewski/': '/o-nas/kamil-jedrzejewski',
  '/masaze/': '/masaze',
  '/masaze/relaksacyjny-poznan/': '/masaz-relaksacyjny-poznan',
  '/masaz-klasyczny-poznan/': '/masaze/klasyczny-poznan',
  '/masaz-kobido-poznan/': '/masaze/kobido-poznan',
  '/masaz-sportowy-poznan/': '/masaze/sportowy-poznan',
  '/masaz-tkanek-glebokich-poznan/': '/masaze/tkanek-glebokich-poznan',
  '/masaz-banka-chinska-poznan/': '/masaze/banka-chinska-poznan',
  '/masaz-nog-poznan/': '/masaze/nog-poznan',
  '/masaz-glowy-i-obreczy-barkowej-poznan/': '/masaze/glowy-i-barki-poznan',
  '/masaz-antycellulitowy-poznan/': '/masaze/antycellulitowy-poznan',
  '/masaz-dloni-poznan-stacjonarnie-z-dojazdem/': '/masaze/dloni-poznan',
  '/cennik/': '/cennik-masazu-poznan',
  '/vouchery/': '/vouchery',
  '/voucher-podarunkowy-na-masaz-poznan/': '/vouchery/podarunkowy',
  '/pierwsza-wizyta/': '/pierwsza-wizyta',
  '/masaz-z-dojazdem-poznan/': '/dojazd',
  '/masaz-dla-firm-poznan/': '/dla-firm',
  '/masaz-biurowy-poznan/': '/dla-firm/masaz-biurowy-poznan',
  '/baza-wiedzy/': '/blog',
  '/najczestsze-pytania/': '/faq',
  '/alfabet-dolegliwosci/': '/alfabet-dolegliwosci',
  '/kontakt/': '/kontakt',
  '/polityka-prywatnosci/': '/polityka-prywatnosci',
  '/regulamin-salonu/': '/regulamin',
  '/masaz-poznan/': '/masaz-poznan',

  // dzielnice — na WordPressie były wpisami, tutaj są podstronami dojazdu
  '/masaz-z-dojazdem-ogrody-poznan/': '/dojazd/ogrody-poznan',
  '/masaz-z-dojazdem-grunwald-poznan/': '/dojazd/grunwald-poznan',
  '/masaz-z-dojazdem-jezyce-poznan/': '/dojazd/jezyce-poznan',
  '/masaz-z-dojazdem-winogrady-poznan/': '/dojazd/winogrady-poznan',
  '/masaz-z-dojazdem-winiary-poznan/': '/dojazd/winiary-poznan',
  '/masaz-z-dojazdem-podolany-poznan/': '/dojazd/podolany-poznan',
  '/masaz-z-dojazdem-solacz-poznan/': '/dojazd/solacz-poznan',
  '/masaz-poznan-piatkowo/': '/dojazd/piatkowo-poznan',
  '/masaz-dla-seniora-poznan-dojazd/': '/dojazd/dla-seniora-poznan',
  '/masaz-z-dojazdem-relaks-w-twoim-domu-poznan/': '/dojazd/w-twoim-domu-poznan',

  // blog
  '/na-co-zwrocic-uwage-przy-wyborze-masazu/': '/blog/jak-wybrac-masaz',
  '/ile-kosztuje-masaz-w-poznaniu/': '/blog/ile-kosztuje-masaz',
  '/masaz-kobido-up-dlaczego-tak-popularny/': '/blog/kobido-up',
  '/bol-dolnego-odcinka-plecow/': '/blog/bol-dolnego-odcinka-plecow',
  '/bol-glowy-i-szyi-masaz-poznan/': '/blog/bol-glowy-i-szyi',
  '/bol-miedzy-lopatkami-masaz-poznan/': '/blog/bol-miedzy-lopatkami',
  '/negatywne-skutki-pracy-siedzacej-masaz-poznan/': '/blog/praca-siedzaca',
  '/masaz-a-sen-poznan-winiary/': '/blog/masaz-a-sen',
  '/wplyw-stresu-na-bol-a-rola-masazu-poznan/': '/blog/stres-a-bol',
  '/przeciazenia-aktywnosc-fizyczna-masaz-poznan/': '/blog/przeciazenia-treningowe',
  '/masaz-tkanek-glebokich-dla-kogo-poznan/': '/blog/tkanki-glebokie-dla-kogo',
  '/dlaczego-nasze-cialo-napina-sie-jesienia-masaz-poznan/': '/blog/napiecie-jesienia',
  '/ergonomia-pracy-masaz-poznan/': '/blog/ergonomia-pracy',
}

/** Adresy, których nie przenosimy, ale które istniały i muszą gdzieś trafić. */
export const przekierowaniaDodatkowe: Record<string, string> = {
  '/category/blog/': '/blog',
  '/category/dzielnica/': '/dojazd',
  '/author/kamil/': '/o-nas/kamil-jedrzejewski',
}
