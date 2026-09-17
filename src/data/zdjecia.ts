import { artykulyWszystkie } from './artykuly'

/**
 * Zdjęcia przypisane do podstron. Astro wymaga statycznych importów,
 * więc trzymamy je w jednym module i mapujemy po kluczu.
 */
import relaksacyjny from '../assets/1745875825434-scaled.jpg'
import klasyczny from '../assets/1745875825441-1.jpg'
import kobido from '../assets/1745875825332-scaled.jpg'
import sportowy from '../assets/1745875825394.jpg'
import tkanekGlebokich from '../assets/1746636876297.jpg'
import bankaChinska from '../assets/1745875825526-scaled.jpg'
import nog from '../assets/1745875825343-1-scaled.jpg'
import glowyIBarki from '../assets/1745875825386-scaled.jpg'
import antycellulitowy from '../assets/1746636876292.jpg'
import dloni from '../assets/ChatGPT-Image-11-sie-2025-17_24_01-1.png'

import gabinet from '../assets/1746635357709-scaled.jpg'
import gabinet2 from '../assets/1746635357595-scaled.jpg'
import gabinet3 from '../assets/1746635357688-scaled.jpg'
import gabinetStol from '../assets/1789576283605.jpg'
import zespol from '../assets/IMG_20250426_143259-scaled.jpg'
import nicole from '../assets/1745875825575-scaled.jpg'
import kamil from '../assets/1745875825562-scaled.jpg'
import dojazd from '../assets/Gemini_Generated_Image_4nbd5v4nbd5v4nbd.png'
import dojazd2 from '../assets/Gemini_Generated_Image_4nbd5v4nbd5v4nbd-1.png'
// Prawdziwe zdjęcia auta i sprzętu wożonego do klienta.
import dojazdAuto from '../assets/1789576019870.jpg'
import dojazdSprzet from '../assets/1789576117272.jpg'
import dojazdOpis from '../assets/1789576247761.jpg'
import dojazdBok from '../assets/1789576247776.jpg'
import dojazdTorby from '../assets/1789576207107.jpg'
import dojazdRozlozony from '../assets/1789576827015.jpg'
// Vouchery: zdjęcia z gabinetu i wzory kart do wyboru.
import voucherKoperta from '../assets/voucher-koperta.jpg'
import voucherKoperty from '../assets/voucher-koperty.jpg'
import voucherWRece from '../assets/1789576446377.jpg'
import kartaSpa from '../assets/karta-spa.jpg'
import kartaSerce from '../assets/karta-serce.jpg'
import kartaMasaz from '../assets/karta-masaz.jpg'
import kartaSwietaCzerwona from '../assets/karta-swieta-czerwona.jpg'
import kartaSwietaZielona from '../assets/karta-swieta-zielona.jpg'
import biuro from '../assets/Masaz_Biurowy_Poznan.jpg'
// Zdjęcia z realizacji masażu biurowego u klientów.
import biuroSala from '../assets/1789576499741.jpg'
import biuroParawan from '../assets/1789576896354.jpg'
import biuroStoly from '../assets/1789576827015.jpg'
import voucher from '../assets/Projekt-bez-nazwy124.jpg'
import budynek from '../assets/1745875825583-scaled.jpg'
import spokoj from '../assets/Projekt-bez-nazwy316.png'
import spokoj2 from '../assets/Projekt-bez-nazwy317.png'
import spokoj3 from '../assets/Projekt-bez-nazwy318.png'

// Kadry gabinetu z galerii Booksy
import booksy1 from '../assets/booksy-1.jpeg'
import booksy2 from '../assets/booksy-2.jpeg'
import booksy3 from '../assets/booksy-3.jpeg'

// miniatury wpisów, zdjęte z wyróżnionych obrazków starego bloga
import mJesien from '../assets/ChatGPT-Image-8-paz-2025-11_41_02.png'
import mSzyja from '../assets/1745875825411.jpg'
import mLopatki from '../assets/1745875825394.jpg'
import mPrzeciazenia from '../assets/1745875825372-scaled.jpg'
import mTkanki from '../assets/1745875825343-scaled.jpg'

export const zdjeciaMasazy: Record<string, ImageMetadata> = {
  'relaksacyjny-poznan': relaksacyjny,
  'klasyczny-poznan': klasyczny,
  'kobido-poznan': kobido,
  'sportowy-poznan': sportowy,
  'tkanek-glebokich-poznan': tkanekGlebokich,
  'banka-chinska-poznan': bankaChinska,
  'nog-poznan': nog,
  'glowy-i-barki-poznan': glowyIBarki,
  'antycellulitowy-poznan': antycellulitowy,
  'dloni-poznan': dloni,
}

export const zdjecia = {
  booksy1,
  booksy2,
  booksy3,
  gabinet,
  gabinet2,
  gabinet3,
  gabinetStol,
  zespol,
  nicole,
  kamil,
  dojazd,
  dojazd2,
  dojazdAuto,
  dojazdSprzet,
  biuro,
  voucher,
  voucherKoperta,
  voucherKoperty,
  voucherWRece,
  budynek,
  spokoj,
  spokoj2,
  spokoj3,
}


/**
 * Zdjęcia, po które mogą sięgać artykuły pisane od zera. Klucz jest tym,
 * co wpisujemy w bloku `zdjecie` w src/data/artykuly.ts.
 */
export const zdjeciaArtykulow: Record<string, ImageMetadata> = {
  gabinet,
  gabinet2,
  gabinet3,
  gabinetStol,
  zespol,
  nicole,
  kamil,
  budynek,
  dojazdAuto,
  dojazdSprzet,
  biuro,
  spokoj,
  spokoj2,
  spokoj3,
  voucherKoperta,
  voucherWRece,
  relaksacyjny,
  klasyczny,
  kobido,
  sportowy,
  tkanekGlebokich,
  bankaChinska,
  nog,
  glowyIBarki,
  antycellulitowy,
  dloni,
}

/**
 * Zdjęcia wgrane przez panel /admin. Nie mają ręcznych importów, więc bierzemy
 * je globem — nowy plik w src/assets działa od razu po przebudowaniu strony.
 */
const wgrane = import.meta.glob('../assets/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>

/**
 * Zdjęcie artykułu po kluczu. Najpierw nazwane wpisy z mapy wyżej, potem
 * nazwa pliku, tak jak zapisuje ją panel (np. „stol-do-masazu.jpg”).
 */
export function zdjecieArtykulu(klucz: string): ImageMetadata | undefined {
  if (zdjeciaArtykulow[klucz]) return zdjeciaArtykulow[klucz]
  const trafienie = Object.entries(wgrane).find(([sciezka]) => sciezka.endsWith('/' + klucz))
  return trafienie?.[1]
}

/** Miniatury wpisów bloga. Klucz to slug wpisu na nowej stronie. */
export const miniaturyWpisow: Record<string, ImageMetadata> = {
  ...Object.fromEntries(artykulyWszystkie.map((a) => [a.slug, zdjeciaArtykulow[a.miniatura]])),
  'masaz-kobido-up-poznan': kobido,
  'jak-wybrac-masaz': gabinet3,
  'ile-kosztuje-masaz': voucher,
  'kobido-up': gabinet,
  'bol-dolnego-odcinka-plecow': spokoj2,
  'bol-glowy-i-szyi': mSzyja,
  'bol-miedzy-lopatkami': mLopatki,
  'praca-siedzaca': spokoj2,
  'ergonomia-pracy': spokoj2,
  'masaz-a-sen': spokoj,
  'stres-a-bol': voucher,
  'przeciazenia-treningowe': mPrzeciazenia,
  'tkanki-glebokie-dla-kogo': mTkanki,
  'napiecie-jesienia': mJesien,
}

/** Wzory kart podarunkowych do wyboru przy zamówieniu. */
export const wzoryKart = [
  { zdjecie: kartaMasaz, nazwa: 'Klasyczny', alt: 'Karta podarunkowa na masaż ze zdjęciem masażu pleców' },
  { zdjecie: kartaSpa, nazwa: 'Spa ze świecami', alt: 'Karta podarunkowa na masaż ze świecami i kamieniami spa' },
  { zdjecie: kartaSerce, nazwa: 'Walentynkowy', alt: 'Karta podarunkowa na masaż w walentynkowym wzorze z sercem' },
  { zdjecie: kartaSwietaCzerwona, nazwa: 'Świąteczny czerwony', alt: 'Czerwona świąteczna karta podarunkowa na masaż' },
  { zdjecie: kartaSwietaZielona, nazwa: 'Świąteczny zielony', alt: 'Zielona świąteczna karta podarunkowa na masaż' },
]

/**
 * Pula zdjęć na podstrony masażu z dojazdem. Podstrony dzielnic biorą z niej
 * po kolei, żeby Ogrody i Grunwald nie miały tego samego kadru.
 */
export const zdjeciaDojazdu: { zdjecie: ImageMetadata; alt: string }[] = [
  { zdjecie: dojazdAuto, alt: 'Masażysta ze składanym stołem i torbami przy aucie gabinetu Rozluźnij Się' },
  { zdjecie: dojazdOpis, alt: 'Auto gabinetu Rozluźnij Się z napisem masaż w gabinecie i z dojazdem oraz numerem telefonu' },
  { zdjecie: dojazdSprzet, alt: 'Masażysta wyjmuje z auta składany stół do masażu z dojazdem w Poznaniu' },
  { zdjecie: dojazdBok, alt: 'Oznakowane auto gabinetu masażu Rozluźnij Się, którym dojeżdżamy do klientów w Poznaniu' },
  { zdjecie: dojazdTorby, alt: 'Sprzęt do masażu spakowany do toreb, gotowy do dojazdu pod adres klienta' },
  { zdjecie: dojazdRozlozony, alt: 'Rozłożone stoły do masażu przygotowane na miejscu u klienta' },
]

/** Zdjęcia z realizacji na landing masażu biurowego. */
export const zdjeciaBiura = [
  { zdjecie: biuroSala, podpis: 'Sala konferencyjna w zupełności wystarczy', alt: 'Krzesło do masażu biurowego rozstawione w sali konferencyjnej klienta' },
  { zdjecie: biuroParawan, podpis: 'Parawan robi ze stanowiska osobne miejsce', alt: 'Stanowisko do masażu biurowego osłonięte parawanem w biurze klienta' },
  { zdjecie: biuroStoly, podpis: 'Przy większych wydarzeniach pracujemy na dwóch stanowiskach', alt: 'Dwa stoły do masażu przygotowane na wydarzeniu firmowym' },
]
