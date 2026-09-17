/**
 * Odbiór formularzy ze strony i wysyłka maila przez Resend.
 * Funkcja serverless Vercela, leci na nią fetch z komponentu Formularz.astro.
 *
 * Zmienne środowiskowe:
 *   RESEND_API_KEY       – klucz z resend.com (wymagany)
 *   FORMULARZ_ODBIORCA   – adres docelowy (domyślnie skrzynka gabinetu)
 *   RESEND_NADAWCA       – nadawca; bez własnej domeny zostaje onboarding@resend.dev
 */

const ODBIORCA = process.env.FORMULARZ_ODBIORCA || 'rozluznijsiepoznan@gmail.com'
const NADAWCA = process.env.RESEND_NADAWCA || 'Formularz rozluznijsie.pl <onboarding@resend.dev>'

/** Etykiety pól, żeby mail czytało się jak zgłoszenie, a nie jak dump formularza. */
const ETYKIETY = {
  imie: 'Imię',
  email: 'E-mail',
  telefon: 'Telefon',
  wiadomosc: 'Wiadomość',
  firma: 'Firma',
  osoba: 'Osoba kontaktowa',
  terminy: 'Interesujące terminy',
  godziny: 'Przewidywany czas na całość',
  osoby: 'Liczba osób',
  czasNaOsobe: 'Masaż na jednego pracownika',
  dni: 'Jeden dzień czy kilka',
  tryb: 'Preferowany tryb',
  uwagi: 'Uwagi',
}

const LIMIT_ZNAKOW = 5000

const escapuj = (t) =>
  String(t).replace(/[&<>"']/g, (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[z]))

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, blad: 'Tylko POST.' })
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('Brak RESEND_API_KEY w środowisku')
    return res.status(500).json({ ok: false, blad: 'Formularz nie jest skonfigurowany.' })
  }

  const dane = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

  // Bot wypełnił ukryte pole: udajemy sukces, żeby nie podpowiadać mu, co poszło nie tak.
  if (dane.botcheck) return res.status(200).json({ ok: true })

  const email = String(dane.email || '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ ok: false, blad: 'Podaj poprawny adres e-mail.' })
  }
  if (!dane.wiadomosc && !dane.firma) {
    return res.status(400).json({ ok: false, blad: 'Pusty formularz.' })
  }

  const wiersze = Object.keys(ETYKIETY)
    .filter((k) => dane[k] && String(dane[k]).trim())
    .map((k) => {
      const wartosc = escapuj(String(dane[k]).slice(0, LIMIT_ZNAKOW)).replace(/\n/g, '<br>')
      return `<tr>
        <td style="padding:8px 14px 8px 0;color:#6b7671;font-size:13px;white-space:nowrap;vertical-align:top">${escapuj(ETYKIETY[k])}</td>
        <td style="padding:8px 0;color:#2c3330;font-size:15px">${wartosc}</td>
      </tr>`
    })
    .join('')

  const temat = String(dane.subject || 'Wiadomość ze strony rozluznijsie.pl').slice(0, 160)

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:620px">
    <h2 style="margin:0 0 4px;color:#133528;font-size:19px">${escapuj(temat)}</h2>
    <p style="margin:0 0 18px;color:#6b7671;font-size:13px">Zgłoszenie z formularza na rozluznijsie.pl</p>
    <table style="border-collapse:collapse;width:100%">${wiersze}</table>
    <p style="margin:22px 0 0;color:#6b7671;font-size:12px">
      Odpowiedz na tego maila, żeby napisać prosto do osoby, która wysłała formularz.
    </p>
  </div>`

  try {
    const odpowiedz = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: NADAWCA,
        to: [ODBIORCA],
        reply_to: email,
        subject: temat,
        html,
      }),
    })

    if (!odpowiedz.ok) {
      const tresc = await odpowiedz.text()
      console.error('Resend odrzucił wysyłkę:', odpowiedz.status, tresc)
      return res.status(502).json({ ok: false, blad: 'Nie udało się wysłać wiadomości.' })
    }

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Błąd wysyłki:', e)
    return res.status(502).json({ ok: false, blad: 'Nie udało się wysłać wiadomości.' })
  }
}
