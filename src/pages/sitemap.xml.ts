import type { APIRoute } from "astro";
import { fixtures } from "@/utils/fixtures";
import { teams } from "@/data/teams";
import { stadiums } from "@/data/stadiums";
import { hostCities } from "@/data/cities";
import { h2hRecords } from "@/data/h2h";
import { newsArticles } from "@/data/news";

const BASE = "https://mundialenvivo.sbs";
const today = new Date().toISOString().split("T")[0];

type SitemapEntry = {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
};

export const GET: APIRoute = () => {
  const staticPages: SitemapEntry[] = [
    { url: `${BASE}/`,                    priority: "1.0", changefreq: "daily" },
    { url: `${BASE}/calendario`,          priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/partidos-hoy`,        priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/tabla-posiciones`,    priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/cuadro-mundial-2026`, priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/faq`,                 priority: "0.8", changefreq: "weekly" },
    { url: `${BASE}/buscar`,              priority: "0.6", changefreq: "weekly" },
    { url: `${BASE}/noticias`,            priority: "0.9", changefreq: "daily" },
    // Country pages
    { url: `${BASE}/argentina`,           priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/colombia`,            priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/uruguay`,             priority: "0.8", changefreq: "daily" },
    { url: `${BASE}/ecuador`,             priority: "0.8", changefreq: "daily" },
    { url: `${BASE}/chile`,               priority: "0.8", changefreq: "daily" },
    { url: `${BASE}/peru`,                priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/venezuela`,           priority: "0.8", changefreq: "daily" },
    { url: `${BASE}/mexico`,              priority: "0.9", changefreq: "daily" },
    { url: `${BASE}/guatemala`,           priority: "0.8", changefreq: "daily" },
    { url: `${BASE}/el-salvador`,         priority: "0.7", changefreq: "daily" },
    { url: `${BASE}/costa-rica`,          priority: "0.7", changefreq: "daily" },
    { url: `${BASE}/panama`,              priority: "0.7", changefreq: "daily" },
    { url: `${BASE}/bolivia`,             priority: "0.7", changefreq: "daily" },
    { url: `${BASE}/honduras`,            priority: "0.7", changefreq: "daily" },
    { url: `${BASE}/nicaragua`,           priority: "0.6", changefreq: "daily" },
    { url: `${BASE}/republica-dominicana`,priority: "0.7", changefreq: "daily" },
    // Groups
    ...["a","b","c","d","e","f","g","h","i","j","k","l"].map(g => ({
      url: `${BASE}/grupo-${g}`, priority: "0.8", changefreq: "daily",
    })),
  ];

  const matchPages: SitemapEntry[] = fixtures.map((f) => ({
    url: `${BASE}/${f.slug}`,
    priority: f.group ? "0.9" : "0.7",
    changefreq: "daily",
    lastmod: f.date.split("T")[0],
  }));

  const teamPages: SitemapEntry[] = teams.map((t) => ({
    url: `${BASE}/equipos/${t.slug}`,
    priority: "0.8",
    changefreq: "daily",
  }));

  const stadiumPages: SitemapEntry[] = stadiums.map((s) => ({
    url: `${BASE}/estadios/${s.slug}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const cityPages: SitemapEntry[] = hostCities.map((c) => ({
    url: `${BASE}/ciudades/${c.slug}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const h2hPages: SitemapEntry[] = h2hRecords.map((h) => ({
    url: `${BASE}/historial/${h.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const newsPages: SitemapEntry[] = newsArticles.map((a) => ({
    url: `${BASE}/noticias/${a.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: a.date,
  }));

  const comoVerPages: SitemapEntry[] = [
    "peru","mexico","guatemala","colombia","argentina","chile","ecuador","venezuela",
    "costa-rica","panama","bolivia","el-salvador","honduras","nicaragua","republica-dominicana","uruguay",
  ].map((p) => ({ url: `${BASE}/como-ver/${p}`, priority: "0.8", changefreq: "weekly" }));

  const programmaticPages: SitemapEntry[] = teams.map((t) => ({
    url: `${BASE}/a-que-hora-juega/${t.slug}`,
    priority: "0.7",
    changefreq: "daily",
  }));

  const allPages = [
    ...staticPages,
    ...matchPages,
    ...teamPages,
    ...stadiumPages,
    ...cityPages,
    ...h2hPages,
    ...newsPages,
    ...comoVerPages,
    ...programmaticPages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
