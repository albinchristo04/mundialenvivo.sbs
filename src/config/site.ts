export const site = {
  domain: "mundialenvivo.sbs",
  url: "https://mundialenvivo.sbs",
  brand: "Mundial en Vivo",
  tagline: "Dónde Ver el Mundial 2026 — Canales Oficiales por País",
  lang: "es-AR",
  locale: "es_AR",
  watchVerb: "ver",
  watchCta: "Ver en el canal oficial",
  slugSuffix: "donde-ver",
  fifaWatchUrl: "https://ppvtv.top/",
  fifaUrl: "https://ppvtv.top/",
  focusCountries: ["AR", "CO", "UY", "EC", "CL", "PE", "VE", "MX", "GT", "SV", "CR", "PA", "BO", "HN", "NI", "DO"],
  social: {
    instagram: "",
    facebook: "",
    x: "",
    youtube: "",
  },
  officialAccounts: [
    { name: "FIFA World Cup", handle: "@FIFAWorldCup", url: "https://ppvtv.top/" },
    { name: "FIFA", handle: "@FIFAcom", url: "https://ppvtv.top/" },
    { name: "FIFA World Cup (Instagram)", handle: "@fifaworldcup", url: "https://ppvtv.top/" },
    { name: "FIFA (YouTube)", handle: "FIFA", url: "https://ppvtv.top/" },
  ],
  indexNowKey: process.env.INDEXNOW_KEY ?? "c8f3a9d2b7e1054698f23a71d4b6c0e5",
  description:
    "Guía oficial para ver el Mundial 2026: dónde ver cada partido por país, canales oficiales, horarios y toda la información del torneo. Argentina, Colombia, México, Perú y más.",
  defaultKeywords:
    "mundial 2026 en vivo, ver mundial 2026, mundial en vivo, copa mundial 2026, world cup 2026, partidos mundial 2026, dónde ver el mundial 2026, canales oficiales mundial 2026, horarios mundial 2026, fútbol en vivo 2026",
} as const;

export type Site = typeof site;
