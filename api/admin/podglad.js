/**
 * Podgląd zdjęcia z repozytorium dla panelu.
 *
 * Pliki z `src/assets` nie są serwowane publicznie (Astro przetwarza je przy
 * buildzie), a repozytorium bywa prywatne. Ten endpoint pobiera plik tokenem
 * serwera i oddaje go zalogowanemu redaktorowi.
 *
 *   GET /api/admin/podglad?plik=nazwa.jpg
 */
import { odpowiedzBledem, wymagajSesji } from '../_lib/wspolne.js'

const TYPY = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif' }

export default async function handler(req, res) {
  if (!wymagajSesji(req, res)) return
  if (req.method !== 'GET') return odpowiedzBledem(res, 405, 'Nieobsługiwana metoda.')

  const plik = String(req.query?.plik || '')
  // Sama nazwa pliku, żadnych ścieżek — inaczej dałoby się wyjść z katalogu.
  if (!/^[\w.-]+\.(jpe?g|png|webp|avif)$/i.test(plik)) return odpowiedzBledem(res, 400, 'Nieznany plik.')

  try {
    const odp = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/src/assets/${plik}?ref=${process.env.GITHUB_BRANCH || 'main'}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.raw',
          'User-Agent': 'rozluznijsie-cms',
        },
      }
    )
    if (!odp.ok) return odpowiedzBledem(res, 404, 'Nie udało się pobrać pliku.')

    const bajty = Buffer.from(await odp.arrayBuffer())
    res.setHeader('Content-Type', TYPY[plik.split('.').pop().toLowerCase()] || 'application/octet-stream')
    // Prywatny cache: podgląd panelu nie ma prawa trafić do cache'u brzegowego.
    res.setHeader('Cache-Control', 'private, max-age=600')
    return res.status(200).send(bajty)
  } catch (e) {
    console.error('Podgląd pliku nie powiódł się:', e)
    return odpowiedzBledem(res, 502, 'Nie udało się pobrać pliku.')
  }
}
