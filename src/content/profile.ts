/**
 * Identity / CV config — single source of truth for the home profile block,
 * social links, and CV download. Edit handles + bio here.
 */

export type SocialIcon = "github" | "x" | "linkedin";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface Profile {
  name: string;
  /** Short mono handle shown in the HUD. */
  handle: string;
  /** One-line role/title. */
  role: string;
  /** Short bio paragraphs for the home CV block. */
  bio: string[];
  /** Quick-scan focus areas, mapped to the three lenses. */
  focus: { label: string; detail: string }[];
  /** Path to the downloadable CV/resume PDF (drop the file in /public). */
  cvHref: string;
  socials: SocialLink[];
}

export const PROFILE: Profile = {
  name: "Romain Bodinier",
  handle: "romain.sys",
  role: "Builder across games, capital & biology",
  bio: [
    "I design game systems, allocate capital, and run small biology-meets-compute experiments — three lenses on the same instinct for complex, living systems.",
    "This site is the feed where all of it surfaces: shipped work, theses, devlogs, and experiments, logged as one stream.",
  ],
  focus: [
    { label: "Game", detail: "Systems, simulation & procedural worlds" },
    { label: "Invest", detail: "Deep-tech theses & portfolio process" },
    { label: "Science", detail: "Synthetic biology × ML experiments" },
  ],
  // Drop your resume at public/cv.pdf (or change this path).
  cvHref: "/cv.pdf",
  socials: [
    // TODO: replace with your real handles.
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "X", href: "https://x.com/", icon: "x" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  ],
};
