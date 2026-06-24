import { newsArticles } from "@/data/news";
import { site } from "@/config/site";

export const GET = () => {
  const sorted = [...newsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map((a) => {
      const pubDate = new Date(a.date).toUTCString();
      return `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${site.url}/noticias/${a.slug}</link>
      <guid>${site.url}/noticias/${a.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${a.excerpt}]]></description>
      <category>${a.category}</category>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.brand} — Noticias</title>
    <link>${site.url}/noticias</link>
    <description>Noticias del Mundial 2026 para América Latina</description>
    <language>es</language>
    <atom:link href="${site.url}/noticias/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
