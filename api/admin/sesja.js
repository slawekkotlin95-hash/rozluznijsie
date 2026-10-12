/**
 * Logowanie, wylogowanie i sprawdzenie bieżącej sesji.
 *
 *   POST   /api/admin/sesja   { email, haslo, zapamietaj }  → logowanie
 *   GET    /api/admin/sesja                                  → kto jest zalogowany
 *   DELETE /api/admin/sesja                                  → wylogowanie
 */
import {
  odczytajSesje,
  odpowiedzBledem,
  sprawdzHaslo,
  ustawCiastko,
  utworzSesje,
  wyczyscCiastko,
} from '../_lib/wspolne.js'

// Krótka pauza przy błędnym haśle: zwykłe zgadywanie staje się bezsensowne.
const pauza = (ms) => new Promise((r) => setTimeout(r, ms))

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const sesja = odczytajSesje(req)
    return sesja
      ? res.status(200).json({ ok: true, email: sesja.email })
      : res.status(401).json({ ok: false })
  }

  if (req.method === 'DELETE') {
    wyczyscCiastko(res)
    return res.status(200).json({ ok: true })
  }

  if (req.method !== 'POST') return odpowiedzBledem(res, 405, 'Nieobsługiwana metoda.')

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_HASLO || !process.env.SESJA_SEKRET) {
    console.error('Panel nieskonfigurowany: brak ADMIN_EMAIL, ADMIN_HASLO albo SESJA_SEKRET')
    return odpowiedzBledem(res, 500, 'Panel nie jest jeszcze skonfigurowany.')
  }

  const dane = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const email = String(dane.email || '').trim().toLowerCase()
  const haslo = String(dane.haslo || '')

  const emailPasuje = email === process.env.ADMIN_EMAIL.trim().toLowerCase()
  const hasloPasuje = sprawdzHaslo(haslo, process.env.ADMIN_HASLO)

  if (!emailPasuje || !hasloPasuje) {
    await pauza(600)
    // Jeden komunikat na obie pomyłki, żeby nie zdradzać, czy login istnieje.
    return odpowiedzBledem(res, 401, 'Nieprawidłowy e-mail lub hasło.')
  }

  const godzin = dane.zapamietaj ? 24 * 30 : 8
  ustawCiastko(res, utworzSesje(email, godzin), godzin * 3600)
  return res.status(200).json({ ok: true, email })
}
