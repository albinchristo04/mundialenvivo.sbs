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
  { name: "México", group: "A", flag: "🇲🇽", fifaUrl: "https://www.fifa.com/en/associations/association/MEX", countryCode: "MX" },
  { name: "Sudáfrica", group: "A", flag: "🇿🇦", fifaUrl: "https://www.fifa.com/en/associations/association/RSA", countryCode: "ZA" },
  { name: "Corea del Sur", group: "A", flag: "🇰🇷", fifaUrl: "https://www.fifa.com/en/associations/association/KOR", countryCode: "KR" },
  { name: "República Checa", group: "A", flag: "🇨🇿", fifaUrl: "https://www.fifa.com/en/associations/association/CZE", countryCode: "CZ" },
  // Group B
  { name: "Canadá", group: "B", flag: "🇨🇦", fifaUrl: "https://www.fifa.com/en/associations/association/CAN", countryCode: "CA" },
  { name: "Bosnia y Herzegovina", group: "B", flag: "🇧🇦", fifaUrl: "https://www.fifa.com/en/associations/association/BIH", countryCode: "BA" },
  { name: "Catar", group: "B", flag: "🇶🇦", fifaUrl: "https://www.fifa.com/en/associations/association/QAT", countryCode: "QA" },
  { name: "Suiza", group: "B", flag: "🇨🇭", fifaUrl: "https://www.fifa.com/en/associations/association/SUI", countryCode: "CH" },
  // Group C
  { name: "Brasil", group: "C", flag: "🇧🇷", fifaUrl: "https://www.fifa.com/en/associations/association/BRA", countryCode: "BR" },
  { name: "Marruecos", group: "C", flag: "🇲🇦", fifaUrl: "https://www.fifa.com/en/associations/association/MAR", countryCode: "MA" },
  { name: "Haití", group: "C", flag: "🇭🇹", fifaUrl: "https://www.fifa.com/en/associations/association/HAI", countryCode: "HT" },
  { name: "Escocia", group: "C", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fifaUrl: "https://www.fifa.com/en/associations/association/SCO", countryCode: "SCO" },
  // Group D
  { name: "Estados Unidos", group: "D", flag: "🇺🇸", fifaUrl: "https://www.fifa.com/en/associations/association/USA", countryCode: "US" },
  { name: "Paraguay", group: "D", flag: "🇵🇾", fifaUrl: "https://www.fifa.com/en/associations/association/PAR", countryCode: "PY" },
  { name: "Australia", group: "D", flag: "🇦🇺", fifaUrl: "https://www.fifa.com/en/associations/association/AUS", countryCode: "AU" },
  { name: "Turquía", group: "D", flag: "🇹🇷", fifaUrl: "https://www.fifa.com/en/associations/association/TUR", countryCode: "TR" },
  // Group E
  { name: "Alemania", group: "E", flag: "🇩🇪", fifaUrl: "https://www.fifa.com/en/associations/association/GER", countryCode: "DE" },
  { name: "Curazao", group: "E", flag: "🇨🇼", fifaUrl: "https://www.fifa.com/en/associations/association/CUW", countryCode: "CW" },
  { name: "Costa de Marfil", group: "E", flag: "🇨🇮", fifaUrl: "https://www.fifa.com/en/associations/association/CIV", countryCode: "CI" },
  { name: "Ecuador", group: "E", flag: "🇪🇨", fifaUrl: "https://www.fifa.com/en/associations/association/ECU", countryCode: "EC" },
  // Group F
  { name: "Países Bajos", group: "F", flag: "🇳🇱", fifaUrl: "https://www.fifa.com/en/associations/association/NED", countryCode: "NL" },
  { name: "Japón", group: "F", flag: "🇯🇵", fifaUrl: "https://www.fifa.com/en/associations/association/JPN", countryCode: "JP" },
  { name: "Suecia", group: "F", flag: "🇸🇪", fifaUrl: "https://www.fifa.com/en/associations/association/SWE", countryCode: "SE" },
  { name: "Túnez", group: "F", flag: "🇹🇳", fifaUrl: "https://www.fifa.com/en/associations/association/TUN", countryCode: "TN" },
  // Group G
  { name: "Bélgica", group: "G", flag: "🇧🇪", fifaUrl: "https://www.fifa.com/en/associations/association/BEL", countryCode: "BE" },
  { name: "Egipto", group: "G", flag: "🇪🇬", fifaUrl: "https://www.fifa.com/en/associations/association/EGY", countryCode: "EG" },
  { name: "Irán", group: "G", flag: "🇮🇷", fifaUrl: "https://www.fifa.com/en/associations/association/IRN", countryCode: "IR" },
  { name: "Nueva Zelanda", group: "G", flag: "🇳🇿", fifaUrl: "https://www.fifa.com/en/associations/association/NZL", countryCode: "NZ" },
  // Group H
  { name: "España", group: "H", flag: "🇪🇸", fifaUrl: "https://www.fifa.com/en/associations/association/ESP", countryCode: "ES" },
  { name: "Cabo Verde", group: "H", flag: "🇨🇻", fifaUrl: "https://www.fifa.com/en/associations/association/CPV", countryCode: "CV" },
  { name: "Arabia Saudita", group: "H", flag: "🇸🇦", fifaUrl: "https://www.fifa.com/en/associations/association/KSA", countryCode: "SA" },
  { name: "Uruguay", group: "H", flag: "🇺🇾", fifaUrl: "https://www.fifa.com/en/associations/association/URU", countryCode: "UY" },
  // Group I
  { name: "Francia", group: "I", flag: "🇫🇷", fifaUrl: "https://www.fifa.com/en/associations/association/FRA", countryCode: "FR" },
  { name: "Senegal", group: "I", flag: "🇸🇳", fifaUrl: "https://www.fifa.com/en/associations/association/SEN", countryCode: "SN" },
  { name: "Iraq", group: "I", flag: "🇮🇶", fifaUrl: "https://www.fifa.com/en/associations/association/IRQ", countryCode: "IQ" },
  { name: "Noruega", group: "I", flag: "🇳🇴", fifaUrl: "https://www.fifa.com/en/associations/association/NOR", countryCode: "NO" },
  // Group J
  { name: "Argentina", group: "J", flag: "🇦🇷", fifaUrl: "https://www.fifa.com/en/associations/association/ARG", countryCode: "AR" },
  { name: "Argelia", group: "J", flag: "🇩🇿", fifaUrl: "https://www.fifa.com/en/associations/association/ALG", countryCode: "DZ" },
  { name: "Austria", group: "J", flag: "🇦🇹", fifaUrl: "https://www.fifa.com/en/associations/association/AUT", countryCode: "AT" },
  { name: "Jordania", group: "J", flag: "🇯🇴", fifaUrl: "https://www.fifa.com/en/associations/association/JOR", countryCode: "JO" },
  // Group K
  { name: "Portugal", group: "K", flag: "🇵🇹", fifaUrl: "https://www.fifa.com/en/associations/association/POR", countryCode: "PT" },
  { name: "RD Congo", group: "K", flag: "🇨🇩", fifaUrl: "https://www.fifa.com/en/associations/association/COD", countryCode: "CD" },
  { name: "Uzbekistán", group: "K", flag: "🇺🇿", fifaUrl: "https://www.fifa.com/en/associations/association/UZB", countryCode: "UZ" },
  { name: "Colombia", group: "K", flag: "🇨🇴", fifaUrl: "https://www.fifa.com/en/associations/association/COL", countryCode: "CO" },
  // Group L
  { name: "Inglaterra", group: "L", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fifaUrl: "https://www.fifa.com/en/associations/association/ENG", countryCode: "ENG" },
  { name: "Croacia", group: "L", flag: "🇭🇷", fifaUrl: "https://www.fifa.com/en/associations/association/CRO", countryCode: "HR" },
  { name: "Ghana", group: "L", flag: "🇬🇭", fifaUrl: "https://www.fifa.com/en/associations/association/GHA", countryCode: "GH" },
  { name: "Panamá", group: "L", flag: "🇵🇦", fifaUrl: "https://www.fifa.com/en/associations/association/PAN", countryCode: "PA" },
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
