export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "previas" | "convocatorias" | "lesiones" | "suspensiones" | "torneo";
  date: string;
  author: string;
  teams: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "argentina-convocatoria-mundial-2026",
    title: "Argentina presenta su convocatoria para el Mundial 2026",
    excerpt: "La Selección Argentina confirmó sus 26 jugadores para el Mundial 2026 que se disputará en Estados Unidos, México y Canadá.",
    content: `
La Selección Argentina, campeona vigente del mundo, presentó su lista definitiva de 26 jugadores convocados para el Mundial 2026 que se disputará en Estados Unidos, México y Canadá del 11 de junio al 19 de julio.

El técnico Lionel Scaloni ratificó su confianza en el bloque campeón de Qatar 2022, con Lionel Messi como figura central del equipo bicampeón del mundo.

**Dónde ver los partidos de Argentina en el Mundial 2026**

Para ver los partidos de Argentina en el Mundial 2026, consultá la [guía de canales oficiales para Argentina](/argentina), donde encontrarás todos los canales que transmiten en vivo los partidos de la Selección Argentina.

**Fixture de Argentina — Grupo J**

Argentina integra el Grupo J junto a Argelia, Austria y Jordania. Sus partidos de fase de grupos son:
- Argentina vs Argelia — 16 de junio, Kansas City
- Argentina vs Austria — 22 de junio, Dallas
- Jordania vs Argentina — 27 de junio, Dallas
    `,
    category: "convocatorias",
    date: "2026-05-20",
    author: "Redacción Mundial en Vivo",
    teams: ["Argentina"],
  },
  {
    slug: "brasil-grupos-mundial-2026",
    title: "Brasil en el Grupo C del Mundial 2026: rivales, horarios y dónde ver",
    excerpt: "La Canarinha cayó en el Grupo C del Mundial 2026 junto a Marruecos, Haití y Escocia. Conocé todo sobre el grupo brasileño.",
    content: `
Brasil, cinco veces campeón del mundo, integra el Grupo C del Mundial 2026 junto a Marruecos, Haití y Escocia.

**Fixture de Brasil — Grupo C**

- Brasil vs Marruecos — 13 de junio, Nueva York (MetLife Stadium)
- Brasil vs Haití — 19 de junio, Filadelfia
- Escocia vs Brasil — 24 de junio, Miami

**Dónde ver los partidos de Brasil en el Mundial 2026**

En Brasil, los partidos se transmiten por TV Globo, SporTV, CazéTV y Globoplay. Consulta la [guía de transmisión por país](/noticias) para más detalles.
    `,
    category: "torneo",
    date: "2026-04-15",
    author: "Redacción Mundial en Vivo",
    teams: ["Brasil", "Marruecos", "Haití", "Escocia"],
  },
  {
    slug: "mexico-partido-inaugural-mundial-2026",
    title: "México juega el partido inaugural del Mundial 2026 ante Sudáfrica en el Azteca",
    excerpt: "El Estadio Azteca será el escenario del partido de apertura del Mundial 2026 el 11 de junio, cuando México enfrente a Sudáfrica.",
    content: `
El Estadio Azteca de Ciudad de México será el escenario del partido inaugural del Mundial 2026 el próximo 11 de junio, cuando México enfrente a Sudáfrica en el arranque del torneo más importante del fútbol mundial.

**Horarios del partido México vs Sudáfrica**

El partido está programado para las 13:00 horas local (Ciudad de México / UTC-6):
- 13:00 hs (CDMX)
- 14:00 hs (Colombia, Perú, Ecuador)
- 15:00 hs (Venezuela, Chile)
- 16:00 hs (Argentina, Uruguay)

**Dónde ver México vs Sudáfrica en vivo**

Para ver el partido inaugural del Mundial 2026 de manera oficial, consultá la [página de México](/mexico) con todos los canales que transmiten el torneo en México, y la [página del partido México vs Sudáfrica](/mexico-vs-sudafrica-donde-ver) con los canales por país.
    `,
    category: "previas",
    date: "2026-06-10",
    author: "Redacción Mundial en Vivo",
    teams: ["México", "Sudáfrica"],
  },
  {
    slug: "espana-favorita-mundial-2026",
    title: "España, una de las grandes favoritas al título del Mundial 2026",
    excerpt: "La Roja llega al Mundial 2026 como una de las potencias favoritas tras su dominio en la Eurocopa 2024.",
    content: `
España llega al Mundial 2026 como una de las grandes favoritas al título, respaldada por su brillante actuación en la Eurocopa 2024 que conquistó y por contar con una generación dorada de jugadores jóvenes y experimentados.

**España en el Grupo H del Mundial 2026**

Los españoles integran el Grupo H junto a Cabo Verde, Arabia Saudita y Uruguay. El debut será el 15 de junio en Atlanta.

**Fixture de España — Grupo H**
- España vs Cabo Verde — 15 de junio, Atlanta
- España vs Arabia Saudita — 21 de junio, Atlanta
- Uruguay vs España — 26 de junio, Guadalajara

Para saber en qué canal ver los partidos de España, consultá la [guía de canales oficiales](/faq).
    `,
    category: "previas",
    date: "2026-06-08",
    author: "Redacción Mundial en Vivo",
    teams: ["España"],
  },
  {
    slug: "guia-horarios-mundial-2026-latam",
    title: "Guía de horarios del Mundial 2026 para Argentina, Colombia, México y más",
    excerpt: "Todos los partidos del Mundial 2026 con sus horarios convertidos para los principales países de América Latina.",
    content: `
El Mundial 2026 se juega en tres países con diferentes husos horarios: México (UTC-6 / UTC-7), Estados Unidos (UTC-4 a UTC-7) y Canadá (UTC-4 a UTC-7). Aquí te explicamos cómo calcular los horarios para los principales países de América Latina.

**Diferencias horarias respecto a UTC**

| País | Huso horario |
|------|-------------|
| Argentina / Uruguay | UTC-3 |
| Chile / Venezuela | UTC-4 |
| Colombia / Perú / Ecuador | UTC-5 |
| México (Ciudad de México) | UTC-6 |

**Ejemplo: Partido a las 12:00 UTC**

- Argentina / Uruguay: 09:00 hs
- Chile / Venezuela: 08:00 hs
- Colombia / Perú / Ecuador: 07:00 hs
- México (CDMX): 06:00 hs

Consultá el [Calendario completo del Mundial 2026](/calendario) para ver todos los horarios convertidos por país.
    `,
    category: "torneo",
    date: "2026-06-05",
    author: "Redacción Mundial en Vivo",
    teams: [],
  },
  {
    slug: "estadio-azteca-partido-inaugural-historia",
    title: "El Estadio Azteca, el único con dos finales mundialistas, vuelve al Mundial",
    excerpt: "El mítico coloso de Santa Úrsula albergará el partido inaugural del Mundial 2026 y volverá a ser escenario de la historia del fútbol.",
    content: `
El Estadio Azteca es un templo del fútbol mundial. Con capacidad para 87.000 espectadores, el estadio ubicado en la delegación Coyoacán de Ciudad de México es el único en el mundo que ha albergado dos finales de Copa del Mundo: la de 1970, cuando Brasil venció a Italia 4-1, y la de 1986, cuando Argentina derrotó a Alemania Occidental 3-2.

**Historia del Azteca en el Mundial**

El Estadio Azteca también fue escenario de uno de los momentos más icónicos de la historia del fútbol: el "Gol del Siglo" de Diego Maradona en las semifinales del Mundial 1986, cuando el 10 argentino recorrió 60 metros y regateó a seis jugadores ingleses antes de marcar.

Para 2026, el Azteca acogerá el partido inaugural (México vs Sudáfrica, 11 de junio) y varios partidos de la fase de grupos.

Consultá el [perfil completo del Estadio Azteca](/estadios/estadio-azteca) para ver todos los partidos que se disputarán allí.
    `,
    category: "torneo",
    date: "2026-06-01",
    author: "Redacción Mundial en Vivo",
    teams: ["México"],
  },
  {
    slug: "colombia-grupo-k-mundial-2026-onde-ver",
    title: "Colombia en el Grupo K del Mundial 2026: partidos, horarios y canales oficiales",
    excerpt: "La Tricolor cayó en el Grupo K junto a Portugal, RD Congo y Uzbekistán. Aquí todos los detalles y dónde ver en Colombia.",
    content: `
La Selección Colombia integra el Grupo K del Mundial 2026 junto a Portugal, RD Congo y Uzbekistán. Es un grupo desafiante donde los colombianos deberán rendir al máximo para avanzar a la siguiente ronda.

**Fixture de Colombia — Grupo K**

- Uzbekistán vs Colombia — 17 de junio, Ciudad de México (Estadio Azteca)
- Colombia vs RD Congo — 23 de junio, Guadalajara (Estadio Akron)
- Colombia vs Portugal — 27 de junio, Miami (Hard Rock Stadium)

**Dónde ver los partidos de Colombia en el Mundial 2026**

En Colombia los partidos se transmiten oficialmente por Caracol TV, RCN y Win Sports. Consultá la [guía completa para Colombia](/colombia) con todos los detalles de transmisión.
    `,
    category: "previas",
    date: "2026-06-12",
    author: "Redacción Mundial en Vivo",
    teams: ["Colombia", "Portugal", "RD Congo", "Uzbekistán"],
  },
  {
    slug: "final-mundial-2026-metlife-nueva-york",
    title: "La Final del Mundial 2026 se jugará en el MetLife Stadium de Nueva York",
    excerpt: "El 19 de julio de 2026, el MetLife Stadium en East Rutherford, Nueva Jersey, será el escenario de la gran final del Mundial.",
    content: `
El domingo 19 de julio de 2026, el MetLife Stadium de East Rutherford (área metropolitana de Nueva York) será el escenario de la Final del Mundial 2026, el encuentro más esperado del fútbol mundial.

**El MetLife Stadium**

Con capacidad para 82.500 espectadores, el MetLife Stadium es hogar de los New York Giants y New York Jets de la NFL. Para el Mundial 2026 será el escenario del partido más importante: la Final.

**Horarios de la Final del Mundial 2026 para LATAM**

La Final está programada para las 15:00 horas local (Nueva York / UTC-4):
- Argentina / Uruguay: 16:00 hs
- Chile / Venezuela: 15:00 hs
- Colombia / Perú / Ecuador: 14:00 hs
- México (CDMX): 13:00 hs

Conocé el [cuadro completo del Mundial 2026](/cuadro-mundial-2026) con todos los cruces desde dieciseisavos hasta la final.
    `,
    category: "torneo",
    date: "2026-06-03",
    author: "Redacción Mundial en Vivo",
    teams: [],
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: NewsArticle["category"]): NewsArticle[] {
  return newsArticles.filter((a) => a.category === category);
}

export function getArticlesByTeam(team: string): NewsArticle[] {
  const lower = team.toLowerCase();
  return newsArticles.filter((a) => a.teams.some((t) => t.toLowerCase().includes(lower)));
}
