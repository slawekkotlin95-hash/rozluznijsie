/**
 * Generuje sekcję "redirects" w vercel.json z mapy adresów.
 * Odpalać po każdej zmianie src/data/adresy.ts: node scripts/przekierowania.mjs
 */
import fs from 'fs'

const zrodlo = fs.readFileSync('src/data/adresy.ts', 'utf8')
const pary = [...zrodlo.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(([, z, na]) => ({ z, na }))

// Porównujemy po obcięciu końcowego ukośnika, inaczej /o-nas/ -> /o-nas robi pętlę.
const redirects = pary
  .map(({ z, na }) => ({ source: z.replace(/\/$/, ''), destination: na }))
  .filter(({ source, destination }) => source !== destination)
  .map((r) => ({ ...r, permanent: true }))

const config = {
  framework: 'astro',
  buildCommand: 'astro build',
  outputDirectory: 'dist',
  redirects,
}

fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2) + '\n', 'utf8')
console.log('przekierowań 301:', redirects.length)
