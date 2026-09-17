/**
 * Generuje wpis do zmiennej ADMIN_HASLO dla panelu /admin.
 *
 *   node scripts/haslo-panelu.mjs "twoje-haslo"
 *
 * Wynik (format `scrypt$sól$hash`) wklejasz w Vercelu jako ADMIN_HASLO.
 * Samo hasło nigdzie nie jest zapisywane — w razie zgubienia generujesz nowe.
 */
import { randomBytes, scryptSync } from 'node:crypto'

const haslo = process.argv[2]

if (!haslo || haslo.length < 10) {
  console.error('Podaj hasło o długości co najmniej 10 znaków:\n  node scripts/haslo-panelu.mjs "twoje-haslo"')
  process.exit(1)
}

const sol = randomBytes(16).toString('hex')
const hash = scryptSync(haslo, sol, 64).toString('hex')

console.log(`scrypt$${sol}$${hash}`)
