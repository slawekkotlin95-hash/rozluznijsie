import type { APIRoute } from 'astro'
import { masaze, dzielnice, zespol, sciezkaMasazu } from '../config'
import { wpisy } from '../data/strony'
import { miasta } from '../data/miasta'

/** Wpisy bloga mają własną datę publikacji, reszta dostaje datę builda. */
const DATY_WPISOW: Record<string, string> = Object.fromEntries(wpisy.map((w) => [`/blog/${w.slug}`, w.data]))

const ADRESY = [
  '/',
  '/o-nas',
  ...zespol.map((o) => `/o-nas/${o.slug}`),
  '/masaze',
  ...masaze.map((m) => sciezkaMasazu(m.slug)),
  '/masaze/dloni-poznan',
  '/cennik-masazu-poznan',
  '/vouchery',
  '/vouchery/podarunkowy',
  '/pierwsza-wizyta',
  '/dojazd',
  ...dzielnice.map((d) => `/dojazd/${d.slug}`),
  '/dojazd/dla-seniora-poznan',
  '/dojazd/w-twoim-domu-poznan',
  '/dla-firm',
  '/dla-firm/masaz-biurowy-poznan',
  ...miasta.map((m) => `/dla-firm/masaz-biurowy-${m.slug}`),
  '/blog',
  ...wpisy.map((w) => `/blog/${w.slug}`),
  '/faq',
  '/alfabet-dolegliwosci',
  '/masaz-poznan',
  '/kontakt',
  '/polityka-prywatnosci',
  '/regulamin',
]

export const GET: APIRoute = ({ site }) => {
  const baza = (site ?? new URL('https://rozluznijsie.pl')).origin
  const data = new Date().toISOString().slice(0, 10)

  const wpisyXml = ADRESY.map(
    (s) => `  <url>
    <loc>${baza}${s}</loc>
    <lastmod>${DATY_WPISOW[s] ?? data}</lastmod>
    <priority>${s === '/' ? '1.0' : '0.7'}</priority>
  </url>`
  ).join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${wpisyXml}
</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  )
}
