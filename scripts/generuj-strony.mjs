/**
 * Jednorazowy generator pozostałych podstron. Trzymam to w skrypcie, bo
 * pisanie kilkunastu plików .astro przez powłokę rozjeżdża się na cudzysłowach.
 * Po wygenerowaniu pliki są zwykłymi komponentami i edytuje się je ręcznie.
 */
import fs from 'fs'
import path from 'path'

const pliki = {}

const stronaProsta = ({ importy = '../components/StronaTresci.astro', zdjeciaImport = '../data/zdjecia', ...p }) => `---
import StronaTresci from '${importy}'
import { zdjecia } from '${zdjeciaImport}'
---

<StronaTresci
  tytul="${p.tytul}"
  opis="${p.opis}"
  etykieta="${p.etykieta}"
  naglowek="${p.naglowek}"${p.lead ? `\n  lead="${p.lead}"` : ''}
  zdjecie={zdjecia.${p.zdjecie}}${p.pozycja ? `\n  pozycja="${p.pozycja}"` : ''}
  zrodlo="${p.zrodlo}"${p.bezCta ? '\n  bezCta' : ''}
/>
`

pliki['src/pages/pierwsza-wizyta.astro'] = stronaProsta({
  tytul: 'Pierwsza wizyta w gabinecie masażu | Rozluźnij Się, Poznań',
  opis: 'Pierwsza wizyta w gabinecie Rozluźnij Się: jak się przygotować, co zabrać, ile trwa zabieg i czego się spodziewać.',
  etykieta: 'Pierwsza wizyta',
  naglowek: 'Pierwszy raz u nas?',
  lead: 'Nic nie musisz przygotowywać. Poniżej odpowiadamy na pytania, które słyszymy najczęściej.',
  zdjecie: 'gabinet3',
  zrodlo: 'pierwsza-wizyta',
})

pliki['src/pages/faq.astro'] = stronaProsta({
  tytul: 'Najczęstsze pytania o masaż | Rozluźnij Się, Poznań',
  opis: 'Odpowiedzi na najczęstsze pytania o masaż: jak często, czy boli, co po zabiegu, przeciwwskazania i przygotowanie do wizyty.',
  etykieta: 'FAQ',
  naglowek: 'Najczęstsze pytania',
  zdjecie: 'spokoj3',
  zrodlo: 'najczestsze-pytania',
})

pliki['src/pages/alfabet-dolegliwosci.astro'] = stronaProsta({
  tytul: 'Alfabet dolegliwości | Rozluźnij Się, masaż Poznań',
  opis: 'Alfabet dolegliwości: ból pleców, karku, głowy i napięcia z pracy siedzącej. Przy czym masaż pomaga, a przy czym nie.',
  etykieta: 'Baza wiedzy',
  naglowek: 'Alfabet dolegliwości',
  lead: 'Z czym najczęściej do nas przychodzicie i co z tym robimy.',
  zdjecie: 'spokoj',
  zrodlo: 'alfabet-dolegliwosci',
})

pliki['src/pages/masaz-poznan.astro'] = stronaProsta({
  tytul: 'Masaż Poznań | Rozluźnij Się, gabinet na Piątkowie',
  opis: 'Masaż w Poznaniu: relaksacyjny, klasyczny, sportowy, tkanek głębokich i Kobido. Gabinet na Piątkowie oraz masaż z dojazdem.',
  etykieta: 'Masaż Poznań',
  naglowek: 'Masaż w Poznaniu',
  zdjecie: 'budynek',
  zrodlo: 'masaz-poznan',
})

pliki['src/pages/polityka-prywatnosci.astro'] = stronaProsta({
  tytul: 'Polityka prywatności | Rozluźnij Się',
  opis: 'Polityka prywatności serwisu rozluznijsie.pl: administrator danych, zakres przetwarzania, pliki cookies i prawa użytkownika.',
  etykieta: 'Dokumenty',
  naglowek: 'Polityka prywatności',
  zdjecie: 'spokoj2',
  zrodlo: 'polityka-prywatnosci',
  bezCta: true,
})

pliki['src/pages/regulamin.astro'] = stronaProsta({
  tytul: 'Regulamin salonu | Rozluźnij Się, Poznań',
  opis: 'Regulamin gabinetu masażu Rozluźnij Się: rezerwacje, odwoływanie wizyt, spóźnienia, vouchery i przeciwwskazania.',
  etykieta: 'Dokumenty',
  naglowek: 'Regulamin salonu',
  zdjecie: 'spokoj2',
  zrodlo: 'regulamin-salonu',
  bezCta: true,
})

pliki['src/pages/vouchery/index.astro'] = `---
import StronaTresci from '../../components/StronaTresci.astro'
import { zdjecia } from '../../data/zdjecia'
---

<StronaTresci
  tytul="Vouchery na masaż, Poznań | Rozluźnij Się"
  opis="Voucher podarunkowy na masaż w Poznaniu. Kwotowy albo na konkretny zabieg, do odbioru w gabinecie na Piątkowie."
  etykieta="Vouchery"
  naglowek="Voucher na masaż"
  lead="Prezent, który nie skończy się w szufladzie. Do wyboru konkretny zabieg albo kwota."
  zdjecie={zdjecia.voucher}
  zrodlo="vouchery"
>
  <p style="margin-top:36px">
    <a class="btn btn-zielony" href="/vouchery/podarunkowy">Więcej o voucherach podarunkowych</a>
  </p>
</StronaTresci>
`

pliki['src/pages/vouchery/podarunkowy.astro'] = `---
import StronaTresci from '../../components/StronaTresci.astro'
import { zdjecia } from '../../data/zdjecia'
---

<StronaTresci
  tytul="Voucher podarunkowy na masaż, Poznań | Rozluźnij Się"
  opis="Voucher podarunkowy na masaż w Poznaniu: jak go kupić, jak długo jest ważny i na jakie zabiegi można go wykorzystać."
  etykieta="Vouchery"
  naglowek="Voucher podarunkowy"
  zdjecie={zdjecia.voucher}
  zrodlo="voucher-podarunkowy-na-masaz-poznan"
/>
`

pliki['src/pages/masaze/dloni.astro'] = `---
import StronaTresci from '../../components/StronaTresci.astro'
import { zdjeciaMasazy } from '../../data/zdjecia'
---

<StronaTresci
  tytul="Masaż dłoni, Poznań | Rozluźnij Się"
  opis="Masaż dłoni i przedramion w Poznaniu, stacjonarnie i z dojazdem. Dla osób pracujących przy klawiaturze i narzędziach."
  etykieta="Masaż"
  naglowek="Masaż dłoni"
  lead="Dla wszystkich, którzy spędzają dzień na klawiaturze, myszce albo narzędziach."
  zdjecie={zdjeciaMasazy.dloni}
  zrodlo="masaz-dloni-poznan-stacjonarnie-z-dojazdem"
/>
`

pliki['src/pages/o-nas/index.astro'] = `---
import { Image } from 'astro:assets'
import StronaTresci from '../../components/StronaTresci.astro'
import { zespol } from '../../config'
import { zdjecia } from '../../data/zdjecia'

const foto: Record<string, ImageMetadata> = {
  'nicole-stokowska': zdjecia.nicole,
  'kamil-jedrzejewski': zdjecia.kamil,
}
---

<StronaTresci
  tytul="O nas | Rozluźnij Się, gabinet masażu w Poznaniu"
  opis="Poznaj gabinet Rozluźnij Się i osoby, które w nim pracują: Nicole Stokowska i Kamil Jędrzejewski. Masaż na Piątkowie w Poznaniu."
  etykieta="O nas"
  naglowek="Kto tu pracuje"
  lead="Dwie osoby, dwa różne podejścia i jeden gabinet, w którym nikt się nie spieszy."
  zdjecie={zdjecia.zespol}
  zrodlo="o-nas"
>
  <div class="karty" style="margin-top:44px">
    {zespol.map((o) => (
      <a class="karta" href={\`/o-nas/\${o.slug}\`}>
        <div class="karta-foto">
          <Image src={foto[o.slug]} alt={o.imie} widths={[380, 640]} width={640} quality={72} sizes="(max-width: 900px) 92vw, 44vw" loading="lazy" />
        </div>
        <div class="karta-tresc">
          <h3 class="karta-tytul">{o.imie}</h3>
          <span class="karta-wiecej">Poznaj mnie →</span>
        </div>
      </a>
    ))}
  </div>
</StronaTresci>
`

pliki['src/pages/o-nas/[osoba].astro'] = `---
import StronaTresci from '../../components/StronaTresci.astro'
import { zespol } from '../../config'
import { zdjecia } from '../../data/zdjecia'

export function getStaticPaths() {
  return zespol.map((o) => ({ params: { osoba: o.slug }, props: { osoba: o } }))
}

const { osoba } = Astro.props
const foto: Record<string, ImageMetadata> = {
  'nicole-stokowska': zdjecia.nicole,
  'kamil-jedrzejewski': zdjecia.kamil,
}
---

<StronaTresci
  tytul={\`\${osoba.imie} | Rozluźnij Się, masaż Poznań\`}
  opis={\`\${osoba.imie} w gabinecie Rozluźnij Się na Piątkowie w Poznaniu. Zakres zabiegów i podejście do pracy.\`}
  etykieta="Zespół"
  naglowek={osoba.imie}
  zdjecie={foto[osoba.slug]}
  pozycja="50% 22%"
  zrodlo={osoba.slug}
/>
`

pliki['src/pages/cennik.astro'] = `---
import Layout from '../layouts/Layout.astro'
import Naglowek2 from '../components/Naglowek2.astro'
import Cta from '../components/Cta.astro'
import { masaze } from '../config'
import { zdjecia } from '../data/zdjecia'
---

<Layout
  tytul="Cennik masaży, Poznań | Rozluźnij Się"
  opis="Cennik gabinetu Rozluźnij Się: masaż relaksacyjny, klasyczny, Kobido, sportowy, tkanek głębokich, bańka chińska i antycellulitowy. Ceny i pakiety."
>
  <Naglowek2
    etykieta="Cennik"
    tytul="Ceny zabiegów"
    opis="Ceny mogą się różnić w zależności od czasu trwania zabiegu, techniki oraz indywidualnych ustaleń. Przy pakietach cena za pojedynczy masaż jest niższa."
    zdjecie={zdjecia.spokoj2}
  />

  <section class="sekcja sekcja-biala">
    <div class="kontener">
      <div class="cennik">
        {masaze.map((m) => (
          <a class="cennik-wiersz" href={\`/masaze/\${m.slug}\`}>
            <span class="cennik-nazwa">{m.nazwa}</span>
            <p class="cennik-ceny">{m.ceny.map((c) => <span>{c}</span>)}</p>
          </a>
        ))}
      </div>

      <div class="proza tresc-waska" style="margin-top:40px">
        <p>
          Pakiet kupujesz raz i wykorzystujesz w dogodnych terminach. To najtańszy sposób
          na regularną pracę z ciałem, a przy napięciach z pracy siedzącej
          <strong> regularność znaczy więcej niż długość pojedynczego zabiegu</strong>.
        </p>
        <p>
          Szukasz prezentu? Sprawdź <a href="/vouchery">vouchery podarunkowe</a>.
          Pierwszy raz u nas? Zajrzyj na <a href="/pierwsza-wizyta">stronę pierwszej wizyty</a>.
        </p>
      </div>
    </div>
  </section>

  <Cta />
</Layout>
`

for (const [sciezka, tresc] of Object.entries(pliki)) {
  fs.mkdirSync(path.dirname(sciezka), { recursive: true })
  fs.writeFileSync(sciezka, tresc, 'utf8')
  console.log('zapisano', sciezka)
}
