/**
 * Unified content model for the whole site.
 *
 * Everything — a shipped game, an investing thesis, a science experiment —
 * is a single `Entry`. The `domain` field places it in one of three lenses
 * (game / invest / science) and the `type` field describes its shape
 * (project, video, essay, ...). The home feed renders every domain together,
 * sorted by date; the lens pages filter by domain.
 */

export type Domain = "game" | "invest" | "science";

export type EntryType =
  | "project"
  | "video"
  | "essay"
  | "release"
  | "devlog"
  | "thesis"
  | "experiment";

/** Editorial status — drafts can be filtered out of the public feed. */
export type EntryStatus = "live" | "draft" | "archived";

export interface EntryLink {
  label: string;
  href: string;
}

export interface Entry {
  /** URL-safe unique id, used for /work/[slug]. */
  slug: string;
  /** Which lens this belongs to. Drives accent color + filtering. */
  domain: Domain;
  /** The shape of the artifact. */
  type: EntryType;
  /** Headline. */
  title: string;
  /** One-line hook shown in the feed and detail header. */
  summary: string;
  /** ISO date (YYYY-MM-DD). Primary sort key for the unified feed. */
  date: string;
  /** Longer body copy for the detail page. Plain paragraphs. */
  body?: string[];
  /** Free-form tags for scanning / future filtering. */
  tags?: string[];
  /** Outbound links (repo, demo, paper, video, ...). */
  links?: EntryLink[];
  /** Optional cover image path (in /public). Falls back to generative art. */
  image?: string;
  /** Short status badge, e.g. "shipped", "in progress", "v0.3". */
  state?: string;
  status?: EntryStatus;
  /** Optional emphasis flag for hero placement later. */
  featured?: boolean;
}

/** Visual + label metadata for each domain. Single source of truth. */
export interface DomainMeta {
  id: Domain;
  label: string;
  /** Short tagline used on lens pages. */
  tagline: string;
  /** Tailwind/CSS hue tokens. */
  accent: string; // hex
  accentSoft: string; // rgba-ish for glows
}

export const DOMAINS: Record<Domain, DomainMeta> = {
  game: {
    id: "game",
    label: "Game",
    tagline: "Worlds, systems, and the things that play inside them.",
    accent: "#b24dff", // mCherry — fluorescent magenta-violet
    accentSoft: "178, 77, 255",
  },
  invest: {
    id: "invest",
    label: "Invest",
    tagline: "Capital as a living system — theses, positions, post-mortems.",
    accent: "#15e0c4", // GFP — fluorescent teal
    accentSoft: "21, 224, 196",
  },
  science: {
    id: "science",
    label: "Science",
    tagline: "Experiments at the edge of biology and computation.",
    accent: "#4f86ff", // DAPI — fluorescent blue
    accentSoft: "79, 134, 255",
  },
};

export const DOMAIN_ORDER: Domain[] = ["game", "invest", "science"];

/** Human-readable label for an entry type. */
export const TYPE_LABELS: Record<EntryType, string> = {
  project: "Project",
  video: "Video",
  essay: "Essay",
  release: "Release",
  devlog: "Devlog",
  thesis: "Thesis",
  experiment: "Experiment",
};
