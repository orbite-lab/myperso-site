import type { Domain, Entry } from "./types";

// --- Game ---
import myceliumArena from "./game/mycelium-arena";
import enzymeDevlog07 from "./game/enzyme-devlog-07";
import sporeJamRelease from "./game/spore-jam-release";

// --- Invest ---
import synbioThesis from "./invest/synthetic-biology-thesis";
import computeArmsRace from "./invest/compute-arms-race-essay";
import q1Postmortem from "./invest/q1-postmortem";

// --- Science ---
import proteinFolding from "./science/protein-folding-experiment";
import cellularAutomata from "./science/cellular-automata-essay";
import biosensorVideo from "./science/biosensor-video";

/**
 * The full corpus. Adding an entry = create the TS file and register it here.
 * Kept as a flat array; helpers below derive every view the UI needs.
 */
export const ENTRIES: Entry[] = [
  myceliumArena,
  enzymeDevlog07,
  sporeJamRelease,
  synbioThesis,
  computeArmsRace,
  q1Postmortem,
  proteinFolding,
  cellularAutomata,
  biosensorVideo,
];

/** Newest first. */
function byDateDesc(a: Entry, b: Entry): number {
  return b.date.localeCompare(a.date);
}

/** Only entries meant for public surfaces (drops drafts/archived). */
function isPublic(entry: Entry): boolean {
  return entry.status === undefined || entry.status === "live";
}

/** All public entries, newest first. Powers the unified home feed. */
export function allEntries(): Entry[] {
  return ENTRIES.filter(isPublic).slice().sort(byDateDesc);
}

/** Public entries for a single lens, newest first. */
export function byDomain(domain: Domain): Entry[] {
  return allEntries().filter((e) => e.domain === domain);
}

/** The N most recent public entries across all domains. */
export function recent(limit = 5): Entry[] {
  return allEntries().slice(0, limit);
}

/** Look up a single entry by slug (includes non-public so detail links never 404 in dev). */
export function getEntry(slug: string): Entry | undefined {
  return ENTRIES.find((e) => e.slug === slug);
}

/** All slugs, for static generation. */
export function allSlugs(): string[] {
  return ENTRIES.map((e) => e.slug);
}

/** Count of public entries per domain. Used for the filter pills. */
export function domainCounts(): Record<Domain, number> {
  const counts: Record<Domain, number> = { game: 0, invest: 0, science: 0 };
  for (const e of allEntries()) counts[e.domain]++;
  return counts;
}
