/**
 * Artykuły pisane od zera, w odróżnieniu od wpisów przeniesionych ze starego
 * WordPressa (te lecą przez `zrodlo.json`). Treść trzymamy w blokach, dzięki
 * czemu jedna podstrona renderuje wszystkie, a pisanie kolejnego wpisu to
 * dopisanie obiektu, nie kopiowanie układu strony.
 *
 * W polach tekstowych wolno używać `<strong>` i `<a href>` — nic więcej.
 */
export type Blok =
  | { typ: 'p'; tekst: string }
  | { typ: 'h2'; tekst: string }
  | { typ: 'h3'; tekst: string }
  | { typ: 'lista'; punkty: string[] }
  | { typ: 'ramka'; tytul: string; tekst: string }
  | { typ: 'zdjecie'; klucz: string; alt: string; podpis?: string }

export interface Artykul {
  slug: string
  tytul: string
  /** Lead pod tytułem, służy też za meta description. */
  lead: string
  /** Tytuł w zakładce przeglądarki; bez niego leci sam tytuł wpisu. */
  metaTytul?: string
  data: string
  minuty: number
  /** Klucz miniatury z `zdjeciaArtykulow`. */
  miniatura: string
  bloki: Blok[]
}

export const artykuly: Artykul[] = [
  {
    slug: 'jak-sie-ubrac-na-masaz',
    tytul: 'Jak się ubrać na masaż',
    metaTytul: 'Jak się ubrać na masaż? Praktyczny poradnik przed wizytą',
    lead: 'Co wziąć ze sobą, ile trzeba z siebie zdjąć i co zostaje na miejscu. Odpowiedzi na pytania, które ludzie zadają nam tuż przed pierwszą wizytą.',
    data: '2026-08-26',
    minuty: 6,
    miniatura: 'gabinetStol',
    bloki: [
      {
        typ: 'p',
        tekst:
          'Najkrótsza odpowiedź: <strong>ubierz się w coś, co łatwo zdjąć i w czym wygodnie wrócisz do domu</strong>. Reszty nie musisz planować. Ręcznik do okrycia i jednorazowa bielizna czekają w gabinecie, a rozbierasz się tylko do granicy, która jest dla Ciebie w porządku.',
      },
      {
        typ: 'p',
        tekst:
          'To pytanie słyszymy częściej niż jakiekolwiek inne. Zwykle pada przez telefon, półgłosem, dzień przed wizytą. Ludzie boją się, że przyjdą w czymś nieodpowiednim albo że nie będą wiedzieli, co zrobić, gdy zamkną się drzwi. Dlatego rozpisujemy to po kolei.',
      },
      {
        typ: 'h2',
        tekst:
          'W czym przyjść',
      },
      {
        typ: 'p',
        tekst:
          'Nie ma stroju „na masaż". Przychodzisz w tym, w czym akurat jesteś, i to wystarczy. Jeśli jednak masz wybór, dwie rzeczy realnie ułatwiają sprawę.',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Rzeczy, które szybko się zdejmuje i zakłada.</strong> Po godzinie na stole nikt nie ma ochoty walczyć z ciasnymi dżinsami i paskiem.',
          '<strong>Coś ciepłego na wierzch.</strong> Po masażu ciało jest rozgrzane i lekko rozleniwione, a wyjście prosto na wiatr potrafi zniweczyć pół efektu.',
          '<strong>Włosy związane albo gumka w kieszeni</strong>, jeśli masz długie. Przy pracy na karku i barkach to drobiazg, który oszczędza szarpania.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'Zdejmij przed zabiegiem zegarek, łańcuszki i pierścionki. Nie dlatego, że przeszkadzają nam w pracy, tylko dlatego, że olej i biżuteria to kiepskie połączenie, a zapinka potrafi się zaczepić.',
      },
      {
        typ: 'zdjecie',
        klucz: 'gabinetStol',
        alt: 'Przygotowany stół do masażu ze świeżym podkładem i złożonym ręcznikiem',
        podpis: 'Stół czeka przygotowany, ręcznik leży na miejscu. Nie musisz niczego przynosić.',
      },
      {
        typ: 'h2',
        tekst:
          'Ile trzeba z siebie zdjąć',
      },
      {
        typ: 'p',
        tekst:
          'To zależy od zabiegu, ale zasada jest jedna: <strong>rozbierasz się tylko tam, gdzie pracujemy</strong>, i tylko na tyle, na ile chcesz.',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Masaż pleców, karku, barków</strong> — góra zostaje zdjęta, spodnie mogą zostać. Wystarczy, że opuścimy je kilka centymetrów, żeby dojść do dolnego odcinka.',
          '<strong>Masaż całego ciała</strong>, jak <a href="/masaz-relaksacyjny-poznan">relaksacyjny</a> czy <a href="/masaze/klasyczny-poznan">klasyczny</a> — zostaje bielizna albo jednorazowa, którą dostajesz na miejscu.',
          '<strong>Masaż nóg</strong> — wystarczy zdjąć spodnie, reszta zostaje.',
          '<strong><a href="/masaze/kobido-poznan">Kobido</a> i masaż głowy</strong> — nie rozbierasz się w ogóle, pracujemy przy odsłoniętej szyi i dekolcie.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'Przez cały zabieg odkryta jest wyłącznie ta część ciała, nad którą akurat pracujemy. Reszta leży pod ręcznikiem. To nie jest kurtuazja, tylko praktyka: odkryte ciało szybko wychładza się, a zmarznięty mięsień gorzej się rozluźnia.',
      },
      {
        typ: 'ramka',
        tytul: 'Z praktyki gabinetu',
        tekst:
          'Najczęstszy błąd to przyjście w ubraniu „na wyjście" prosto z pracy, bo wizyta wypada między jednym a drugim spotkaniem. Pół biedy z koszulą. Gorzej, gdy ktoś siada potem w sztywnej marynarce na rozluźnione właśnie barki i po czterdziestu minutach napięcie wraca. Jeśli możesz, zaplanuj masaż tak, żeby po nim jechać do domu, a nie na kolejne spotkanie.',
      },
      {
        typ: 'h2',
        tekst:
          'Gdzie się przebrać i co z rzeczami',
      },
      {
        typ: 'p',
        tekst:
          'W gabinecie jest osłonięty kąt, w którym się przebierasz, i tyle czasu, ile potrzebujesz. Nikt nie wchodzi, dopóki nie dasz znać. Rzeczy zostają obok, w zasięgu ręki — przyjmujemy jedną osobę naraz, więc nie ma szatni, kolejki ani obcych kurtek na wieszaku.',
      },
      {
        typ: 'p',
        tekst:
          'Więcej o samym przebiegu pierwszej wizyty, krok po kroku, opisaliśmy na <a href="/pierwsza-wizyta">stronie pierwszej wizyty</a>.',
      },
      {
        typ: 'h2',
        tekst:
          'A jeśli masaż jest z dojazdem do domu',
      },
      {
        typ: 'p',
        tekst:
          'Wtedy jest jeszcze prościej, bo jesteś u siebie. Przygotuj <strong>około dwóch metrów kwadratowych wolnej przestrzeni</strong>, żeby dało się rozłożyć stół i obejść go dookoła, oraz ręcznik pod głowę, jeśli masz pod ręką. Stół, podkłady, olej i bieliznę jednorazową przywozimy ze sobą. Szczegóły zebraliśmy na stronie <a href="/dojazd">masażu z dojazdem</a>.',
      },
      {
        typ: 'p',
        tekst:
          'Po zabiegu w domu masz przewagę, której nie da gabinet: nie musisz się ubierać i nigdzie jechać. Wystarczy zostać w tym, w czym Ci wygodnie.',
      },
      {
        typ: 'h2',
        tekst:
          'Czego lepiej nie robić przed wizytą',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Nie przychodź bezpośrednio po dużym posiłku.</strong> Godzina odstępu wystarczy, żeby leżenie na brzuchu było wygodne.',
          '<strong>Nie nakładaj balsamu ani perfum na partie, które masujemy.</strong> Śliska skóra i zapach mieszają się z olejem, a przy pracy na twarzy potrafi to podrażnić.',
          '<strong>Nie planuj po masażu ciężkiego treningu.</strong> Ciało jest po pracy, nawet jeśli nic Cię nie boli.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'I jeszcze jedno: jeśli danego dnia boli Cię coś nietypowego, masz gorączkę albo świeży uraz, <strong>powiedz o tym przed zabiegiem</strong>, a nie w jego trakcie. Czasem zmienimy tylko technikę, a czasem doradzimy przełożenie terminu.',
      },
      {
        typ: 'p',
        tekst:
          'Masz pytanie, którego tu nie ma? Zadzwoń albo napisz przed rezerwacją — odpowiadamy konkretnie i bez namawiania na cokolwiek. Terminy sprawdzisz w kalendarzu online, a jeśli wolisz ustalić wszystko głosem, po prostu zadzwoń.',
      },
    ],
  },

  {
    slug: 'jak-zrobic-masaz-plecow',
    tytul: 'Jak zrobić masaż pleców',
    metaTytul: 'Jak zrobić masaż pleców w domu? Instrukcja krok po kroku',
    lead: 'Prosta instrukcja masażu pleców dla kogoś bliskiego: ułożenie, kolejność ruchów, czego nie dotykać i kiedy lepiej odpuścić.',
    data: '2026-09-04',
    minuty: 9,
    miniatura: 'klasyczny',
    bloki: [
      {
        typ: 'p',
        tekst:
          'Masaż pleców w domu robi się <strong>od dołu ku górze, całymi dłońmi, wzdłuż mięśni po obu stronach kręgosłupa</strong> — nigdy na samym kręgosłupie. Zaczynasz od rozgrzania oliwą przez dwie, trzy minuty, potem przechodzisz do wolniejszych, mocniejszych ruchów, a kończysz tak, jak zacząłeś: spokojnym głaskaniem.',
      },
      {
        typ: 'p',
        tekst:
          'Poniżej rozpisujemy to dokładnie. Uprzedzamy od razu: domowy masaż nie zastąpi pracy z kimś, kto robi to zawodowo, ale na zwykłe spięcie po tygodniu przy biurku potrafi wystarczyć. A dla osoby masowanej liczy się też to, że ktoś poświęcił jej dwadzieścia minut uwagi.',
      },
      {
        typ: 'h2',
        tekst:
          'Co przygotować',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Twarde podłoże.</strong> Materac się ugina i po chwili bolą Cię własne plecy. Lepszy jest koc na dywanie albo stół, jeśli macie odpowiedniej wysokości.',
          '<strong>Olej albo oliwa</strong>: migdałowa, kokosowa, zwykła spożywcza w ostateczności. Balsam wsiąka za szybko i dłoń zaczyna ciągnąć skórę.',
          '<strong>Ręcznik</strong> pod spód i drugi do okrycia nóg, żeby osoba leżąca nie zmarzła.',
          '<strong>Ciepły pokój i wyciszony telefon.</strong> Brzmi banalnie, robi ogromną różnicę.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'Rozgrzej olej w dłoniach, zanim go nałożysz. Zimna oliwa wylana prosto na plecy to najszybszy sposób, żeby ktoś się spiął zamiast rozluźnić.',
      },
      {
        typ: 'h2',
        tekst:
          'Ułożenie',
      },
      {
        typ: 'p',
        tekst:
          'Osoba masowana leży na brzuchu, z rękami wzdłuż ciała albo luźno w bok, głowa oparta na policzku lub na zwiniętym ręczniku. Pod kostki warto podłożyć zrolowany ręcznik — odciąża to dolny odcinek pleców. Ty klękasz z boku albo stajesz nad, tak żeby <strong>pracować ciężarem ciała, a nie samą siłą ramion</strong>. To pierwszy błąd domowych masaży: po pięciu minutach bolą nadgarstki i cała rzecz się kończy.',
      },
      {
        typ: 'zdjecie',
        klucz: 'klasyczny',
        alt: 'Masaż pleców wykonywany całą powierzchnią przedramienia wzdłuż mięśni przykręgosłupowych',
        podpis: 'Praca idzie wzdłuż mięśni po obu stronach kręgosłupa, nigdy po samych kręgach.',
      },
      {
        typ: 'h2',
        tekst:
          'Kolejność ruchów',
      },
      {
        typ: 'h3',
        tekst:
          '1. Rozgrzewka, 2–3 minuty',
      },
      {
        typ: 'p',
        tekst:
          'Całe dłonie płasko na dole pleców, prowadzisz je powoli w górę wzdłuż kręgosłupa, rozchodzisz na barki i wracasz bokami w dół. Rytmicznie, bez pośpiechu, ten sam ruch kilkanaście razy. To nie jest wstęp do właściwej pracy, to jej część: rozgrzana tkanka reaguje zupełnie inaczej niż zimna.',
      },
      {
        typ: 'h3',
        tekst:
          '2. Rozcieranie, 5–8 minut',
      },
      {
        typ: 'p',
        tekst:
          'Kciukami albo kłębami dłoni pracujesz <strong>wzdłuż dwóch pasm mięśni biegnących po bokach kręgosłupa</strong>, drobnymi kolistymi ruchami, od dołu w stronę karku. Kiedy trafisz na miejsce twardsze od reszty, zostań tam dłużej, ale bez wbijania się na siłę. Zwykle to właśnie tam osoba masowana wypuszcza powietrze.',
      },
      {
        typ: 'h3',
        tekst:
          '3. Barki i kark, 5 minut',
      },
      {
        typ: 'p',
        tekst:
          'Najbardziej wdzięczna część, bo tu zbiera się napięcie od monitora i telefonu. Ugniataj mięsień między szyją a barkiem całą dłonią, jakbyś wyrabiał ciasto, po jednej stronie i po drugiej. Dołóż powolne krążenia kciukami u podstawy czaszki — ostrożnie, to okolica wrażliwa.',
      },
      {
        typ: 'h3',
        tekst:
          '4. Wyciszenie, 2 minuty',
      },
      {
        typ: 'p',
        tekst:
          'Wracasz do spokojnego głaskania całych pleców, coraz lżej, aż do ledwie wyczuwalnego dotyku. To sygnał dla układu nerwowego, że koniec. Nie kończ masażu mocnym ruchem i nagłym „gotowe".',
      },
      {
        typ: 'ramka',
        tytul: 'Czego nie dotykać',
        tekst:
          'Nie naciskaj bezpośrednio na kręgosłup ani na łopatki. Omijaj okolice nerek, czyli boki nieco powyżej talii, i nie uciskaj szyi z przodu ani po bokach. Nie próbuj niczego „nastawiać" i nie szarpaj — strzelanie w kręgosłupie to nie jest cel domowego masażu, a próby wymuszenia go potrafią skończyć się urazem.',
      },
      {
        typ: 'h2',
        tekst:
          'Najczęstsze błędy',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Za mocno od pierwszej minuty.</strong> Ciało nie zdążyło się rozgrzać i broni się napięciem.',
          '<strong>Za szybko.</strong> Domowy masaż prawie zawsze jest za szybki. Zwolnij o połowę.',
          '<strong>Praca tylko palcami.</strong> Szybko bolą, a nacisk jest punktowy i nieprzyjemny. Używaj całych dłoni i przedramion.',
          '<strong>Brak rozmowy.</strong> Pytaj „jak mocno?" co kilka minut. To jedyny sposób, żeby trafić w odpowiednią siłę.',
        ],
      },
      {
        typ: 'h2',
        tekst:
          'Kiedy odpuścić i pójść do kogoś',
      },
      {
        typ: 'p',
        tekst:
          'Domowy masaż jest dla zmęczonych, spiętych pleców. <strong>Nie jest dla bólu, który promieniuje do nogi, drętwień, świeżego urazu, gorączki ani dla kogoś po operacji kręgosłupa.</strong> Przy takich objawach pierwszy przystanek to lekarz albo fizjoterapeuta. O granicach bezpieczeństwa piszemy szerzej we wpisie <a href="/blog/czy-masaz-moze-zaszkodzic">czy masaż może zaszkodzić</a>.',
      },
      {
        typ: 'p',
        tekst:
          'Jest też różnica, której domowym sposobem nie przeskoczysz. Osoba z doświadczeniem wyczuwa, <strong>które napięcie jest przyczyną, a które skutkiem</strong>, i często pracuje zupełnie gdzie indziej, niż boli. Jeśli spięte plecy wracają co kilka tygodni, jeden <a href="/masaze/klasyczny-poznan">masaż klasyczny</a> albo <a href="/masaze/tkanek-glebokich-poznan">tkanek głębokich</a> powie Ci o Twoim ciele więcej niż dziesięć domowych prób.',
      },
      {
        typ: 'p',
        tekst:
          'Pracujemy na Piątkowie, a po Poznaniu <a href="/dojazd">dojeżdżamy też do domu</a> — z własnym stołem, więc nie trzeba kombinować z materacem. Jeśli nie wiesz, który zabieg wybrać, napisz albo zadzwoń, dobierzemy go razem.',
      },
    ],
  },

  {
    slug: 'co-to-jest-masaz-kobido',
    tytul: 'Co to jest masaż Kobido',
    metaTytul: 'Co to jest masaż Kobido? Japoński masaż twarzy w pigułce',
    lead: 'Krótkie wyjaśnienie: skąd pochodzi Kobido, czym różni się od zwykłego masażu twarzy, jak przebiega i dla kogo ma sens.',
    data: '2026-09-08',
    minuty: 6,
    miniatura: 'kobido',
    bloki: [
      {
        typ: 'p',
        tekst:
          'Kobido to <strong>japoński masaż twarzy, szyi i dekoltu, który pracuje przede wszystkim na mięśniach</strong>, a nie na samej skórze. Stąd przydomek „japoński lifting": efekt bierze się z rozluźnienia napiętych partii twarzy i pobudzenia krążenia, a nie z wygładzania naskórka kosmetykiem.',
      },
      {
        typ: 'p',
        tekst:
          'Nazwa znaczy mniej więcej „starodawna droga piękna". Technika wywodzi się z Japonii, gdzie przez wieki rozwijała się w obrębie tradycyjnych metod pracy z ciałem. Dziś w gabinetach spotkasz różne jej warianty i różne nazwy handlowe, ale wspólny mianownik zostaje ten sam: dynamiczna praca dłońmi na twarzy połączona z solidnym rozluźnieniem szyi i karku.',
      },
      {
        typ: 'h2',
        tekst:
          'Czym różni się od zwykłego masażu twarzy',
      },
      {
        typ: 'p',
        tekst:
          'Klasyczny masaż twarzy, ten znany z zabiegów kosmetycznych, jest zwykle delikatny i towarzyszy pielęgnacji: oczyszczaniu, maskom, wcieraniu serum. Kobido jest <strong>szybsze, bardziej dynamiczne i sięga głębiej</strong>. Sekwencje ruchów potrafią zaskoczyć tempem, a spora część zabiegu dzieje się poniżej żuchwy.',
      },
      {
        typ: 'p',
        tekst:
          'To właśnie ta część bywa dla ludzi niespodzianką. Napięty kark i barki ciągną rysy w dół i utrudniają odpływ chłonki, więc pracę zaczyna się od szyi i dekoltu. Dopiero rozluźniona szyja pozwala sensownie zająć się twarzą.',
      },
      {
        typ: 'zdjecie',
        klucz: 'kobido',
        alt: 'Masaż twarzy Kobido, dłonie masażystki pracują w okolicy skroni',
        podpis: 'Duża część zabiegu to praca na żuchwie, skroniach i czole, czyli tam, gdzie zbiera się napięcie.',
      },
      {
        typ: 'h2',
        tekst:
          'Jak przebiega zabieg',
      },
      {
        typ: 'p',
        tekst:
          'Zaczyna się od krótkiej rozmowy i oczyszczenia skóry. Potem idą kolejno: rozluźnienie szyi, karku i dekoltu, praca na najbardziej napiętych miejscach twarzy — żuchwa, skronie, czoło, okolica między brwiami — techniki drenujące, dynamiczna faza liftingująca i wyciszenie. U nas zabieg trwa godzinę.',
      },
      {
        typ: 'p',
        tekst:
          'Nie rozbierasz się. Wystarczy odsłonięta szyja i dekolt, więc to jeden z niewielu zabiegów, po którym wracasz do swoich spraw praktycznie od razu. Pełny opis przebiegu, technik i efektów zebraliśmy w osobnym poradniku: <a href="/blog/masaz-kobido-up-poznan">masaż Kobido Up krok po kroku</a>.',
      },
      {
        typ: 'ramka',
        tytul: 'Nie każdy wie, że',
        tekst:
          'Najczęstsza reakcja przy pierwszym Kobido to zdziwienie, że twarz w ogóle może być obolała. Ludzie, którzy zaciskają zęby w nocy albo spędzają dni na spotkaniach, mają żuchwę napiętą jak kark po dniu przy monitorze. Bywa, że pierwsze minuty pracy w tej okolicy są nieprzyjemne, a po nich przychodzi ulga, której nikt się nie spodziewał.',
      },
      {
        typ: 'h2',
        tekst:
          'Dla kogo',
      },
      {
        typ: 'p',
        tekst:
          'Najczęściej przychodzą do nas trzy grupy: osoby, które chcą popracować nad napięciem żuchwy i bruksizmem, osoby, którym rano puchnie twarz, oraz te, które szukają czegoś dla siebie po długim, stresującym okresie. Kobido bywa też uzupełnieniem pielęgnacji — nie zamiast kosmetologii, tylko obok niej.',
      },
      {
        typ: 'p',
        tekst:
          'Nie jest to zabieg dla każdego. <strong>Odpuszczamy przy stanach zapalnych skóry, świeżych zabiegach medycyny estetycznej, infekcjach i problemach dermatologicznych w obrębie twarzy.</strong> Jeśli niedawno miałaś wypełniacze albo toksynę botulinową, powiedz o tym przed umówieniem terminu, bo liczy się odstęp czasu.',
      },
      {
        typ: 'h2',
        tekst:
          'Czego się spodziewać po serii',
      },
      {
        typ: 'p',
        tekst:
          'Po jednym zabiegu ludzie najczęściej mówią o lżejszej, bardziej wypoczętej twarzy i mniejszym uczuciu napięcia. To efekt, który utrzymuje się kilka dni. <strong>Trwalszych zmian szuka się w serii</strong>, rozłożonej na tygodnie, a nie w pojedynczej wizycie — i uczciwie mówiąc, Kobido nie zastąpi zabiegów medycyny estetycznej ani nie cofnie procesu starzenia.',
      },
      {
        typ: 'p',
        tekst:
          'Jeśli chcesz sprawdzić, jak reaguje Twoja twarz, umów pojedynczą wizytę i zobacz, co czujesz przez kolejne dni. Aktualną cenę i pakiety znajdziesz w <a href="/cennik-masazu-poznan">cenniku</a>, a szczegóły samego zabiegu na stronie <a href="/masaze/kobido-poznan">masażu Kobido</a>. Wątpliwości najszybciej rozwiejemy przez telefon.',
      },
    ],
  },

  {
    slug: 'czy-masaz-pomaga-na-rwe-kulszowa',
    tytul: 'Czy masaż pomaga na rwę kulszową',
    metaTytul: 'Czy masaż pomaga na rwę kulszową? Co realnie daje, a czego nie',
    lead: 'Na czym polega rwa kulszowa, kiedy masaż przynosi ulgę, kiedy trzeba go odłożyć i dlaczego najpierw idzie się do lekarza.',
    data: '2026-09-11',
    minuty: 8,
    miniatura: 'nog',
    bloki: [
      {
        typ: 'p',
        tekst:
          'Bywa pomocny, ale <strong>nie jest leczeniem rwy kulszowej i nie zastąpi diagnozy</strong>. Masaż może przynieść ulgę wtedy, gdy część dolegliwości bierze się z napiętych mięśni wokół nerwu. Nie cofnie natomiast ucisku spowodowanego wypadniętym dyskiem ani nie naprawi zmian w kręgosłupie.',
      },
      {
        typ: 'p',
        tekst:
          'Zacznijmy od tego, czym rwa właściwie jest, bo słowo bywa używane na wszystko, co strzela w krzyżu. <strong>Rwa kulszowa to ból biegnący wzdłuż przebiegu nerwu kulszowego</strong>: od pośladka przez tył uda, czasem aż do łydki i stopy. Często dochodzi mrowienie, drętwienie albo uczucie, że noga jest słabsza. To objaw, nie choroba — a przyczyn bywa kilka.',
      },
      {
        typ: 'h2',
        tekst:
          'Dlaczego najpierw lekarz',
      },
      {
        typ: 'p',
        tekst:
          'Bo od przyczyny zależy wszystko. Inaczej postępuje się przy ucisku korzenia nerwowego przez dysk, inaczej przy napiętym mięśniu gruszkowatym, jeszcze inaczej przy zmianach zwyrodnieniowych. Masażysta nie ma jak tego rozróżnić: <strong>nie wykonuje badania neurologicznego i nie widzi obrazu z rezonansu</strong>.',
      },
      {
        typ: 'p',
        tekst:
          'Są też objawy, przy których nie ma miejsca na rozważania. Jeśli pojawia się <strong>osłabienie stopy, zaburzenia czucia w okolicy krocza albo problemy z kontrolą pęcherza</strong>, to sytuacja pilna medycznie. Wtedy nie umawia się masażu, tylko jedzie do lekarza.',
      },
      {
        typ: 'zdjecie',
        klucz: 'nog',
        alt: 'Masaż tylnej części uda i łydki wykonywany w gabinecie',
        podpis: 'Przy dolegliwościach z pośladka i tyłu uda pracuje się zwykle w miejscach oddalonych od samego bólu.',
      },
      {
        typ: 'h2',
        tekst:
          'Kiedy masaż realnie pomaga',
      },
      {
        typ: 'p',
        tekst:
          'Największy sens ma <strong>po ostrej fazie</strong>, kiedy najgorszy ból już zelżał, a zostaje sztywność, napięcie i strach przed ruchem. Wtedy praca na mięśniach pośladkowych, na mięśniu gruszkowatym, na prostownikach grzbietu i na tylnej części uda potrafi wyraźnie odciążyć okolicę.',
      },
      {
        typ: 'p',
        tekst:
          'Druga sytuacja to profilaktyka po wszystkim. Gdy epizod minął, ciało długo pamięta pozycję ochronną: chodzisz krzywo, oszczędzasz jedną stronę, mięśnie po drugiej pracują za dwóch. Regularny <a href="/masaze/klasyczny-poznan">masaż klasyczny</a> albo praca na <a href="/masaze/tkanek-glebokich-poznan">tkankach głębokich</a> pomaga to rozplątać.',
      },
      {
        typ: 'ramka',
        tytul: 'Z praktyki gabinetu',
        tekst:
          'Ludzie z bólem promieniującym do nogi prawie zawsze proszą, żeby masować dokładnie tam, gdzie boli. Tymczasem najbardziej odciążającą pracą bywa ta na pośladku i biodrze po drugiej stronie — tej, która przez dwa tygodnie przejmowała cały ciężar ciała. Bolące miejsce i miejsce, które trzeba rozluźnić, to często dwa różne adresy.',
      },
      {
        typ: 'h2',
        tekst:
          'Kiedy masażu nie robimy',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>W ostrej fazie z silnym, promieniującym bólem</strong> — ruch i nacisk zwykle nasilają objawy.',
          '<strong>Przy narastającym drętwieniu lub osłabieniu nogi.</strong>',
          '<strong>Bezpośrednio po świeżym urazie kręgosłupa</strong> i przed postawieniem rozpoznania.',
          '<strong>Gdy lekarz zalecił inaczej</strong> — jego zalecenie jest ważniejsze niż nasza ocena.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'W takich przypadkach mówimy to wprost i proponujemy przełożenie terminu. Pełną listę sytuacji, w których masażu się nie wykonuje, zebraliśmy we wpisie <a href="/blog/czy-masaz-moze-zaszkodzic">czy masaż może zaszkodzić</a>.',
      },
      {
        typ: 'h2',
        tekst:
          'Czego się spodziewać po zabiegu',
      },
      {
        typ: 'p',
        tekst:
          'Zwykle mniejszej sztywności i swobodniejszego ruchu w biodrze. Czasem lekkiej bolesności mięśni następnego dnia. <strong>Nie spodziewaj się, że jeden masaż zlikwiduje problem</strong> — jeśli przyczyną jest ucisk na nerw, to on nie zniknie od pracy na mięśniach.',
      },
      {
        typ: 'p',
        tekst:
          'Najlepsze efekty widujemy tam, gdzie masaż jest częścią większej całości: razem z rehabilitacją, ruchem dobranym przez fizjoterapeutę i zwykłą zmianą nawyków przy biurku. O tej ostatniej piszemy w tekstach o <a href="/blog/praca-siedzaca">pracy siedzącej</a> i <a href="/blog/ergonomia-pracy">ergonomii przy biurku</a>.',
      },
      {
        typ: 'p',
        tekst:
          'Masz rozpoznanie od lekarza i nie wiesz, czy to już moment na masaż? Zadzwoń i opowiedz, co się dzieje. Jeśli uznamy, że lepiej poczekać, powiemy to od razu — także wtedy, gdy oznacza to wizytę przełożoną o dwa tygodnie.',
      },
    ],
  },

  {
    slug: 'czy-masaz-moze-zaszkodzic',
    tytul: 'Czy masaż może zaszkodzić',
    metaTytul: 'Czy masaż może zaszkodzić? Przeciwwskazania bez straszenia',
    lead: 'Lista sytuacji, w których masażu się nie wykonuje, plus to, o czym warto powiedzieć przed zabiegiem, żeby wyszedł bezpiecznie.',
    data: '2026-09-14',
    minuty: 7,
    miniatura: 'relaksacyjny',
    bloki: [
      {
        typ: 'p',
        tekst:
          'U zdrowej osoby masaż jest bezpieczny. Zaszkodzić może w trzech przypadkach: <strong>gdy istnieje przeciwwskazanie, o którym nikt nie wiedział, gdy technika jest źle dobrana do sytuacji oraz gdy siła nacisku przekracza to, co ciało jest w stanie przyjąć</strong>. Wszystkie trzy da się wyeliminować rozmową przed zabiegiem.',
      },
      {
        typ: 'p',
        tekst:
          'Ten tekst nie ma nikogo straszyć. Przeciwwskazania w masażu są dość oczywiste i w większości sprowadzają się do zdrowego rozsądku: nie pobudza się krążenia tam, gdzie akurat toczy się stan zapalny, i nie pracuje się na czymś, co wymaga lekarza.',
      },
      {
        typ: 'h2',
        tekst:
          'Kiedy masażu się nie wykonuje',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Gorączka i infekcja.</strong> Także zwykłe przeziębienie w fazie ostrej — masaż potrafi nasilić objawy.',
          '<strong>Świeże urazy</strong>: skręcenia, złamania, mocne stłuczenia, zerwania. Najpierw diagnoza, potem ewentualnie praca w okolicy.',
          '<strong>Zakrzepica żył głębokich albo jej podejrzenie.</strong> To jedno z najpoważniejszych przeciwwskazań i nie ma tu pola do negocjacji.',
          '<strong>Zaawansowane żylaki</strong> w miejscu masażu.',
          '<strong>Zmiany skórne</strong>: rany, owrzodzenia, aktywne infekcje skóry, świeże blizny, niepokojące znamiona.',
          '<strong>Choroby nowotworowe, leki przeciwzakrzepowe, poważne schorzenia serca</strong> — potrzebna jest wcześniejsza zgoda lekarza.',
          '<strong>Stan po niedawnej operacji</strong>, dopóki lekarz nie da zielonego światła.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'Do tego dochodzą przeciwwskazania czasowe: ciąża, która wymaga innego ułożenia i innych technik, świeże zabiegi medycyny estetycznej przy pracy na twarzy czy alkohol przed wizytą. Żadne z nich nie oznacza „nigdy" — oznaczają „nie dziś" albo „nie w ten sposób".',
      },
      {
        typ: 'zdjecie',
        klucz: 'relaksacyjny',
        alt: 'Spokojna praca dłońmi na plecach podczas masażu relaksacyjnego',
        podpis: 'Dobrze dobrany nacisk nie wymaga zaciskania zębów ani wstrzymywania oddechu.',
      },
      {
        typ: 'h2',
        tekst:
          'O czym powiedzieć przed zabiegiem',
      },
      {
        typ: 'p',
        tekst:
          'Wywiad przed masażem to nie odpytywanka. To moment, w którym wychodzą rzeczy zmieniające cały plan pracy. Warto wspomnieć o:',
      },
      {
        typ: 'lista',
        punkty: [
          'przebytych urazach i operacjach, nawet sprzed lat,',
          'chorobach przewlekłych i przyjmowanych lekach,',
          'ciąży, także tej bardzo wczesnej,',
          'problemach ze skórą, alergiach na kosmetyki i olejki,',
          'wszystkim, co boli od niedawna i nie wiadomo dlaczego.',
        ],
      },
      {
        typ: 'ramka',
        tytul: 'Dobra wskazówka przed wizytą',
        tekst:
          'Najczęściej przemilczaną informacją są leki rozrzedzające krew. Ludzie nie kojarzą ich z masażem, bo „to przecież tylko masaż". Tymczasem przy takiej terapii łatwiej o siniaki i wybroczyny, więc masażysta dobiera wtedy zupełnie inną intensywność. Jedno zdanie przed zabiegiem oszczędza tygodnia z fioletowymi plecami.',
      },
      {
        typ: 'h2',
        tekst:
          'Co jest normalne po masażu, a co powinno niepokoić',
      },
      {
        typ: 'p',
        tekst:
          'Normalne: lekka bolesność mięśni przez dzień lub dwa, senność, uczucie ciężkich nóg, zwiększone pragnienie. Po mocniejszej pracy, zwłaszcza na <a href="/masaze/tkanek-glebokich-poznan">tkankach głębokich</a>, zdarzają się też pojedyncze siniaki.',
      },
      {
        typ: 'p',
        tekst:
          'Powinno niepokoić: <strong>ból ostry i narastający zamiast ustępującego, obrzęk, zaczerwienienie z uczuciem ciepła, drętwienie, duszność albo zawroty głowy</strong>. To sygnały, z którymi idzie się do lekarza, a nie czeka, aż przejdą.',
      },
      {
        typ: 'h2',
        tekst:
          'Najczęstszy realny problem: źle dobrana siła',
      },
      {
        typ: 'p',
        tekst:
          'W praktyce znacznie częściej niż o przeciwwskazania ludzie potykają się o przekonanie, że masaż musi boleć. Nie musi. Nacisk ma być odczuwalny, ale <strong>ma pozwalać oddychać i rozmawiać</strong>. Jeśli zaciskasz zęby, to nie jest oznaka skuteczności, tylko informacja, że trzeba zejść z siły. Napisaliśmy o tym osobno: <a href="/blog/dlaczego-masaz-boli">dlaczego masaż boli</a>.',
      },
      {
        typ: 'p',
        tekst:
          'Jeśli masz chorobę przewlekłą albo świeże rozpoznanie i nie wiesz, czy masaż jest dla Ciebie, napisz do nas przed rezerwacją. Zdarza się, że odsyłamy do lekarza, i to też jest uczciwa odpowiedź.',
      },
    ],
  },

  {
    slug: 'dlaczego-masaz-boli',
    tytul: 'Dlaczego masaż boli',
    metaTytul: 'Dlaczego masaż boli? Kiedy to normalne, a kiedy nie',
    lead: 'Skąd bierze się ból podczas zabiegu, czym różni się dobry dyskomfort od złego i dlaczego mocniej nie znaczy skuteczniej.',
    data: '2026-09-17',
    minuty: 7,
    miniatura: 'glowyIBarki',
    bloki: [
      {
        typ: 'p',
        tekst:
          'Masaż boli najczęściej dlatego, że <strong>pracujemy na tkance, która jest przeciążona i nadwrażliwa</strong>. Napięty mięsień reaguje na nacisk mocniej niż zdrowy, a układ nerwowy w okolicy od dawna trzymanej w napięciu ma obniżony próg bólu. Do tego dochodzi prosta rzecz: przy większości technik po prostu naciskamy, a nacisk bywa nieprzyjemny.',
      },
      {
        typ: 'p',
        tekst:
          'Ważniejsze jest jednak coś innego. <strong>Ból nie jest miarą skuteczności zabiegu.</strong> Można wyjść z masażu obolałym i bez efektu, można wyjść rozluźnionym i bez jednego nieprzyjemnego momentu. Rzecz w tym, żeby rozróżnić, który dyskomfort ma sens, a który jest sygnałem do zatrzymania.',
      },
      {
        typ: 'h2',
        tekst:
          'Dobry dyskomfort i zły ból',
      },
      {
        typ: 'p',
        tekst:
          'Dobry dyskomfort jest tępy i rozlany. Czuć go w mięśniu, czasem chce się westchnąć, ale <strong>da się przy nim normalnie oddychać</strong>. Po zejściu nacisku zostaje ulga, nie napięcie. Wiele osób opisuje to jako „boli, ale przyjemnie".',
      },
      {
        typ: 'p',
        tekst:
          'Zły ból jest ostry, kłujący albo piekący, często punktowy. Zmusza do wstrzymania oddechu, zaciśnięcia zębów, odruchowego napięcia całego ciała. Bywa, że promieniuje albo towarzyszy mu drętwienie. Taki ból <strong>nie jest etapem, przez który trzeba przejść</strong> — jest informacją, że nacisk trzeba zmniejszyć albo zmienić miejsce pracy.',
      },
      {
        typ: 'zdjecie',
        klucz: 'glowyIBarki',
        alt: 'Praca na karku i obręczy barkowej podczas masażu',
        podpis: 'Kark i barki bolą przy masażu najczęściej, bo najdłużej pracują w napięciu.',
      },
      {
        typ: 'h2',
        tekst:
          'Dlaczego jedne miejsca bolą bardziej',
      },
      {
        typ: 'p',
        tekst:
          'Bo nie wszystkie mięśnie mają tak samo przepracowane. Kark, barki, okolica między łopatkami i pas biodrowy to u większości ludzi pracujących przy komputerze miejsca stale obciążone. Tam napięcie zbiera się miesiącami i tam pierwszy dotyk bywa najbardziej wymowny.',
      },
      {
        typ: 'p',
        tekst:
          'Różnice bierze się też z techniki. <a href="/masaz-relaksacyjny-poznan">Masaż relaksacyjny</a> prawie nie boli, bo pracuje spokojnie i szeroko. <a href="/masaze/tkanek-glebokich-poznan">Masaż tkanek głębokich</a> sięga głębiej i wolniej, więc bywa odczuwalny — ale nawet on nie powinien być torturą. O tym, dla kogo jest ta mocniejsza praca, piszemy we wpisie <a href="/blog/tkanki-glebokie-dla-kogo">masaż tkanek głębokich dla kogo</a>.',
      },
      {
        typ: 'ramka',
        tytul: 'Warto wiedzieć',
        tekst:
          'Ciało reaguje na ból wcześniej, niż zdążysz cokolwiek powiedzieć. Przy zbyt mocnym nacisku mięsień odruchowo się napina, żeby się chronić. Powstaje błędne koło: masażysta naciska mocniej, bo czuje opór, a opór rośnie właśnie dlatego, że naciska mocniej. Dlatego zdanie „za mocno" wypowiedziane w połowie zabiegu jest warte więcej niż cała reszta godziny.',
      },
      {
        typ: 'h2',
        tekst:
          'Skąd bierze się bolesność następnego dnia',
      },
      {
        typ: 'p',
        tekst:
          'Po mocniejszym zabiegu zdarza się uczucie podobne do zakwasów. Tkanka była pobudzona do pracy, krążenie przyspieszyło, mięsień dostał bodziec, którego nie miał od dawna. To zwykle mija w ciągu doby, dwóch, a pomaga picie wody, spokojny ruch i ciepła kąpiel.',
      },
      {
        typ: 'p',
        tekst:
          'Jeśli jednak bolesność narasta zamiast ustępować, pojawiają się obrzęk, rozległe siniaki albo drętwienie, to już nie jest normalna reakcja po masażu. Wtedy warto zajrzeć do tekstu o <a href="/blog/czy-masaz-moze-zaszkodzic">przeciwwskazaniach do masażu</a> i skonsultować się z lekarzem.',
      },
      {
        typ: 'h2',
        tekst:
          'Co zrobić, żeby bolało mniej',
      },
      {
        typ: 'lista',
        punkty: [
          '<strong>Mów, kiedy siła jest za duża.</strong> Nie na końcu, tylko w momencie, w którym to czujesz.',
          '<strong>Oddychaj.</strong> Wstrzymywanie oddechu podbija napięcie i nasila odczuwanie bólu.',
          '<strong>Nie zaczynaj od najmocniejszego wariantu</strong>, jeśli to Twój pierwszy masaż od dawna. Lepiej dołożyć intensywności przy kolejnej wizycie.',
          '<strong>Przychodź regularniej, a nie raz na pół roku.</strong> Ciało, które jest rozluźniane co kilka tygodni, reaguje zupełnie inaczej niż takie, którego nikt nie dotykał od maja.',
        ],
      },
      {
        typ: 'p',
        tekst:
          'I najważniejsze: dobry masażysta pyta o siłę nacisku w trakcie pracy, a nie tylko na początku. My pytamy, bo to samo miejsce u dwóch osób znosi zupełnie inny nacisk. Jeśli nie wiesz, który zabieg wybrać przy pierwszej wizycie, napisz albo zadzwoń — dobierzemy go razem, zanim zarezerwujesz termin.',
      },
    ],
  },
]
