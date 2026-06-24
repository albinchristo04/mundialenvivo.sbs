import rawFixtures from "../../fixtures.json";
import rawBroadcasters from "../../broadcasters.json";

export interface Fixture {
  id: string;
  group: string | null;
  matchday: number | null;
  teamA: string;
  teamB: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  slug: string;
  stage?: string;
}

export interface Broadcaster {
  name: string;
  url: string;
  access: string;
  type: string;
}

export const fixtures: Fixture[] = rawFixtures as Fixture[];

const broadcastersData = rawBroadcasters as {
  countries: Record<string, { name: string; broadcasters: Broadcaster[] }>;
};

export function getBroadcastersForCountry(code: string): Broadcaster[] {
  return broadcastersData.countries[code]?.broadcasters ?? broadcastersData.countries["FIFA"]!.broadcasters;
}

export function groupFixtures(): Fixture[] {
  return fixtures.filter((f) => f.group !== null);
}

export function upcomingFixtures(n = 8): Fixture[] {
  const now = Date.now();
  return fixtures
    .filter((f) => new Date(f.date).getTime() > now - 7200_000)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, n);
}

export function todaysFixtures(): Fixture[] {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const prefix = `${y}-${m}-${d}`;
  return fixtures.filter((f) => f.date.startsWith(prefix));
}

export function getFixturesByTeam(teamName: string): Fixture[] {
  const lower = teamName.toLowerCase();
  return fixtures.filter(
    (f) => f.teamA.toLowerCase().includes(lower) || f.teamB.toLowerCase().includes(lower)
  );
}

export function getFixturesByGroup(group: string): Fixture[] {
  return fixtures.filter((f) => f.group === group);
}

export function getFixturesByVenue(venue: string): Fixture[] {
  const lower = venue.toLowerCase();
  return fixtures.filter((f) => f.venue.toLowerCase().includes(lower));
}

export function getFixturesByCity(city: string): Fixture[] {
  const lower = city.toLowerCase();
  return fixtures.filter((f) => f.city.toLowerCase().includes(lower));
}

const TZ_OFFSETS: Record<string, number> = {
  "ARG/URU": -3,
  "CHI/VEN": -4,
  "COL/PER/ECU": -5,
  "CDMX": -6,
};

export function multiTzBlock(isoDate: string): string {
  const d = new Date(isoDate);
  const parts = Object.entries(TZ_OFFSETS).map(([label, offset]) => {
    const local = new Date(d.getTime() + offset * 3600_000);
    const hh = String(local.getUTCHours()).padStart(2, "0");
    const mm = String(local.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm} (${label})`;
  });
  return parts.join(" · ");
}

export function localTime(isoDate: string, tzOffset: number): string {
  const d = new Date(isoDate);
  const local = new Date(d.getTime() + tzOffset * 3600_000);
  const hh = String(local.getUTCHours()).padStart(2, "0");
  const mm = String(local.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function formatDateEs(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

export function formatDateShort(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllTeams(): string[] {
  const teams = new Set<string>();
  for (const f of fixtures) {
    if (f.group) {
      teams.add(f.teamA);
      teams.add(f.teamB);
    }
  }
  return [...teams].sort();
}

export function getAllGroups(): string[] {
  const groups = new Set<string>();
  for (const f of fixtures) {
    if (f.group) groups.add(f.group);
  }
  return [...groups].sort();
}
