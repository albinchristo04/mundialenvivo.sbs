import { slugify } from "@/utils/fixtures";

export interface Team {
  name: string;
  slug: string;
  group: string;
  flag: string;
  fifaUrl: string;
  countryCode: string;
}

const RAW_TEAMS: Omit<Team, "slug">[] = [
  // Group A
  { name: "México", group: "A", flag: "🇲🇽", fifaUrl: "https://ppvtv.top/", countryCode: "MX" },
  { name: "Sudáfrica", group: "A", flag: "🇿🇦", fifaUrl: "https://ppvtv.top/", countryCode: "ZA" },
  { name: "Corea del Sur", group: "A", flag: "🇰🇷", fifaUrl: "https://ppvtv.top/", countryCode: "KR" },
  { name: "República Checa", group: "A", flag: "🇨🇿", fifaUrl: "https://ppvtv.top/", countryCode: "CZ" },
  // Group B
  { name: "Canadá", group: "B", flag: "🇨🇦", fifaUrl: "https://ppvtv.top/", countryCode: "CA" },
  { name: "Bosnia y Herzegovina", group: "B", flag: "🇧🇦", fifaUrl: "https://ppvtv.top/", countryCode: "BA" },
  { name: "Catar", group: "B", flag: "🇶🇦", fifaUrl: "https://ppvtv.top/", countryCode: "QA" },
  { name: "Suiza", group: "B", flag: "🇨🇭", fifaUrl: "https://ppvtv.top/", countryCode: "CH" },
  // Group C
  { name: "Brasil", group: "C", flag: "🇧🇷", fifaUrl: "https://ppvtv.top/", countryCode: "BR" },
  { name: "Marruecos", group: "C", flag: "🇲🇦", fifaUrl: "https://ppvtv.top/", countryCode: "MA" },
  { name: "Haití", group: "C", flag: "🇭🇹", fifaUrl: "https://ppvtv.top/", countryCode: "HT" },
  { name: "Escocia", group: "C", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fifaUrl: "https://ppvtv.top/", countryCode: "SCO" },
  // Group D
  { name: "Estados Unidos", group: "D", flag: "🇺🇸", fifaUrl: "https://ppvtv.top/", countryCode: "US" },
  { name: "Paraguay", group: "D", flag: "🇵🇾", fifaUrl: "https://ppvtv.top/", countryCode: "PY" },
  { name: "Australia", group: "D", flag: "🇦🇺", fifaUrl: "https://ppvtv.top/", countryCode: "AU" },
  { name: "Turquía", group: "D", flag: "🇹🇷", fifaUrl: "https://ppvtv.top/", countryCode: "TR" },
  // Group E
  { name: "Alemania", group: "E", flag: "🇩🇪", fifaUrl: "https://ppvtv.top/", countryCode: "DE" },
  { name: "Curazao", group: "E", flag: "🇨🇼", fifaUrl: "https://ppvtv.top/", countryCode: "CW" },
  { name: "Costa de Marfil", group: "E", flag: "🇨🇮", fifaUrl: "https://ppvtv.top/", countryCode: "CI" },
  { name: "Ecuador", group: "E", flag: "🇪🇨", fifaUrl: "https://ppvtv.top/", countryCode: "EC" },
  // Group F
  { name: "Países Bajos", group: "F", flag: "🇳🇱", fifaUrl: "https://ppvtv.top/", countryCode: "NL" },
  { name: "Japón", group: "F", flag: "🇯🇵", fifaUrl: "https://ppvtv.top/", countryCode: "JP" },
  { name: "Suecia", group: "F", flag: "🇸🇪", fifaUrl: "https://ppvtv.top/", countryCode: "SE" },
  { name: "Túnez", group: "F", flag: "🇹🇳", fifaUrl: "https://ppvtv.top/", countryCode: "TN" },
  // Group G
  { name: "Bélgica", group: "G", flag: "🇧🇪", fifaUrl: "https://ppvtv.top/", countryCode: "BE" },
  { name: "Egipto", group: "G", flag: "🇪🇬", fifaUrl: "https://ppvtv.top/", countryCode: "EG" },
  { name: "Irán", group: "G", flag: "🇮🇷", fifaUrl: "https://ppvtv.top/", countryCode: "IR" },
  { name: "Nueva Zelanda", group: "G", flag: "🇳🇿", fifaUrl: "https://ppvtv.top/", countryCode: "NZ" },
  // Group H
  { name: "España", group: "H", flag: "🇪🇸", fifaUrl: "https://ppvtv.top/", countryCode: "ES" },
  { name: "Cabo Verde", group: "H", flag: "🇨🇻", fifaUrl: "https://ppvtv.top/", countryCode: "CV" },
  { name: "Arabia Saudita", group: "H", flag: "🇸🇦", fifaUrl: "https://ppvtv.top/", countryCode: "SA" },
  { name: "Uruguay", group: "H", flag: "🇺🇾", fifaUrl: "https://ppvtv.top/", countryCode: "UY" },
  // Group I
  { name: "Francia", group: "I", flag: "🇫🇷", fifaUrl: "https://ppvtv.top/", countryCode: "FR" },
  { name: "Senegal", group: "I", flag: "🇸🇳", fifaUrl: "https://ppvtv.top/", countryCode: "SN" },
  { name: "Iraq", group: "I", flag: "🇮🇶", fifaUrl: "https://ppvtv.top/", countryCode: "IQ" },
  { name: "Noruega", group: "I", flag: "🇳🇴", fifaUrl: "https://ppvtv.top/", countryCode: "NO" },
  // Group J
  { name: "Argentina", group: "J", flag: "🇦🇷", fifaUrl: "https://ppvtv.top/", countryCode: "AR" },
  { name: "Argelia", group: "J", flag: "🇩🇿", fifaUrl: "https://ppvtv.top/", countryCode: "DZ" },
  { name: "Austria", group: "J", flag: "🇦🇹", fifaUrl: "https://ppvtv.top/", countryCode: "AT" },
  { name: "Jordania", group: "J", flag: "🇯🇴", fifaUrl: "https://ppvtv.top/", countryCode: "JO" },
  // Group K
  { name: "Portugal", group: "K", flag: "🇵🇹", fifaUrl: "https://ppvtv.top/", countryCode: "PT" },
  { name: "RD Congo", group: "K", flag: "🇨🇩", fifaUrl: "https://ppvtv.top/", countryCode: "CD" },
  { name: "Uzbekistán", group: "K", flag: "🇺🇿", fifaUrl: "https://ppvtv.top/", countryCode: "UZ" },
  { name: "Colombia", group: "K", flag: "🇨🇴", fifaUrl: "https://ppvtv.top/", countryCode: "CO" },
  // Group L
  { name: "Inglaterra", group: "L", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fifaUrl: "https://ppvtv.top/", countryCode: "ENG" },
  { name: "Croacia", group: "L", flag: "🇭🇷", fifaUrl: "https://ppvtv.top/", countryCode: "HR" },
  { name: "Ghana", group: "L", flag: "🇬🇭", fifaUrl: "https://ppvtv.top/", countryCode: "GH" },
  { name: "Panamá", group: "L", flag: "🇵🇦", fifaUrl: "https://ppvtv.top/", countryCode: "PA" },
];

export const teams: Team[] = RAW_TEAMS.map((t) => ({
  ...t,
  slug: slugify(t.name),
}));

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter((t) => t.group === group);
}
