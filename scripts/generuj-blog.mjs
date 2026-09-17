/** Generator podstron bloga, kontaktu i 404. Uruchamiany raz. */
import fs from 'fs'
import path from 'path'

const T = '`' // backtick, żeby nie walczyć z ucieczkami w szablonach
const pliki = {}

pliki['src/pages/blog/index.astro'] = `---
import Layout from '../../layouts/Layout.astro'
import Naglowek2 from '../../components/Naglowek2.astro'
import Cta from '../../components/Cta.astro'
import { wpisy } from '../../data/strony'
import { zdjecia } from '../../data/zdjecia'
---

<Layout
  tytul="Blog o masażu i napięciach ciała | Rozluźnij Się, Poznań"
  opis="Baza wiedzy gabinetu Rozluźnij Się: ból pleców i karku, praca siedząca, regeneracja po treningu, sen i stres. Konkretnie, bez marketingowej waty."
>
  <Naglowek2
    etykieta="Baza wiedzy"
    tytul="Blog"
    opis="Piszemy o tym, o co pytacie na wizytach. Bez obiecywania cudów i bez straszenia."
    zdjecie={zdjecia.spokoj}
  />

  <section class="sekcja sekcja-biala">
    <div class="kontener">
      <div class="wpisy">
        {wpisy.map((w) => (
          <a class="wpis" href={${T}/blog/\${w.slug}${T}}>
            <h3>{w.tytul}</h3>
            <p>{w.lead}</p>
            <span>Czytaj →</span>
          </a>
        ))}
      </div>

      <div class="proza tresc-waska" style="margin-top:44px">
        <p>
          Szukasz konkretnej dolegliwości? Zajrzyj do <a href="/alfabet-dolegliwosci">alfabetu dolegliwości</a>.
          Masz pytanie o samą wizytę? Odpowiedzi zebraliśmy w <a href="/faq">najczęstszych pytaniach</a>.
        </p>
      </div>
    </div>
  </section>

  <Cta />
</Layout>
`

pliki['src/pages/blog/[wpis].astro'] = `---
import StronaTresci from '../../components/StronaTresci.astro'
import { wpisy } from '../../data/strony'
import { zdjecia } from '../../data/zdjecia'

export function getStaticPaths() {
  return wpisy.map((w) => ({ params: { wpis: w.slug }, props: { wpis: w } }))
}

const { wpis } = Astro.props

// Tła rotujemy po liście, żeby wpisy nie wyglądały identycznie.
const tla = [zdjecia.spokoj, zdjecia.spokoj2, zdjecia.spokoj3, zdjecia.gabinet2, zdjecia.gabinet3]
const tlo = tla[wpisy.findIndex((w) => w.slug === wpis.slug) % tla.length]
---

<StronaTresci
  tytul={${T}\${wpis.tytul} | Rozluźnij Się, masaż Poznań${T}}
  opis={wpis.lead}
  etykieta="Blog"
  naglowek={wpis.tytul}
  lead={wpis.lead}
  zdjecie={tlo}
  zrodlo={wpis.zrodlo}
/>
`

pliki['src/pages/kontakt.astro'] = `---
import Layout from '../layouts/Layout.astro'
import Naglowek2 from '../components/Naglowek2.astro'
import Tresc from '../components/Tresc.astro'
import { firma } from '../config'
import { sekcje } from '../data/tresc'
import { zdjecia } from '../data/zdjecia'
---

<Layout
  tytul="Kontakt | Rozluźnij Się, gabinet masażu Poznań"
  opis="Kontakt do gabinetu Rozluźnij Się: ul. Piątkowska 94 wejście C w Poznaniu, tel. 572 317 407, rozluznijsiepoznan@gmail.com. Rezerwacja przez Booksy."
>
  <Naglowek2
    etykieta="Kontakt"
    tytul="Masz pytania?"
    opis="Najszybciej zarezerwujesz termin przez Booksy. Możesz też zadzwonić albo napisać maila."
    zdjecie={zdjecia.budynek}
  />

  <section class="sekcja sekcja-biala">
    <div class="kontener">
      <div class="dwie-kolumny">
        <div class="proza">
          <h2 class="tytul-tresci">Dane kontaktowe</h2>
          <p>
            <strong>Adres gabinetu</strong><br />
            {firma.ulica}<br />
            {firma.kod} {firma.miasto}
          </p>
          <p>
            <strong>Telefon</strong><br />
            <a href={firma.telefonHref}>{firma.telefon}</a>
          </p>
          <p>
            <strong>E-mail</strong><br />
            <a href={firma.emailHref}>{firma.email}</a>
          </p>
          <p>NIP {firma.nip}</p>
          <p style="display:flex;gap:12px;flex-wrap:wrap">
            <a class="btn btn-glowny" href={firma.booksy} target="_blank" rel="noopener noreferrer">Zarezerwuj online</a>
            <a class="btn btn-obrys" href={firma.telefonHref}>Zadzwoń</a>
          </p>
        </div>

        <div><Tresc sekcje={sekcje('kontakt')} /></div>
      </div>
    </div>
  </section>

  <section class="sekcja sekcja-jasna">
    <div class="kontener">
      <p class="etykieta">Dojazd</p>
      <h2 class="tytul-sekcji">Gdzie nas znaleźć</h2>
      <div class="mapa">
        <iframe
          src="https://www.google.com/maps?q=ul.%20Pi%C4%85tkowska%2094,%2060-650%20Pozna%C5%84&output=embed"
          title="Mapa dojazdu do gabinetu Rozluźnij Się"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</Layout>
`

pliki['src/pages/404.astro'] = `---
import Layout from '../layouts/Layout.astro'
import Naglowek2 from '../components/Naglowek2.astro'
import { zdjecia } from '../data/zdjecia'
---

<Layout tytul="Nie ma takiej strony | Rozluźnij Się" opis="Pod tym adresem nic nie ma. Przejdź do oferty masaży, cennika albo kontaktu.">
  <Naglowek2
    etykieta="Błąd 404"
    tytul="Tej strony tu nie ma"
    opis="Adres mógł się zmienić przy przebudowie serwisu. Poniżej najczęściej odwiedzane miejsca."
    zdjecie={zdjecia.spokoj3}
  />

  <section class="sekcja sekcja-biala">
    <div class="kontener">
      <div class="wpisy">
        <a class="wpis" href="/masaze"><h3>Masaże</h3><p>Wszystkie zabiegi, które wykonujemy.</p><span>Zobacz →</span></a>
        <a class="wpis" href="/cennik"><h3>Cennik</h3><p>Ceny pojedyncze i pakiety.</p><span>Zobacz →</span></a>
        <a class="wpis" href="/dojazd"><h3>Masaż z dojazdem</h3><p>Przyjeżdżamy z własnym stołem.</p><span>Zobacz →</span></a>
        <a class="wpis" href="/kontakt"><h3>Kontakt</h3><p>Telefon, adres i mapa dojazdu.</p><span>Zobacz →</span></a>
      </div>
    </div>
  </section>
</Layout>
`

for (const [sciezka, tresc] of Object.entries(pliki)) {
  fs.mkdirSync(path.dirname(sciezka), { recursive: true })
  fs.writeFileSync(sciezka, tresc, 'utf8')
  console.log('zapisano', sciezka)
}
