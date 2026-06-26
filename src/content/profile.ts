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
  /** Path to the downloadable CV/resume PDF (lives in /public). */
  cvHref: string;
  socials: SocialLink[];
}

export const PROFILE: Profile = {
  name: "Romain Bodinier, Ph.D",
  handle: "romain.sys",
  role: "Biologist · Equity Analyst · Gaming enthusiast",
  bio: [
    "Ph.D biologist turned healthcare equity analyst, based in Geneva. By day I research biotech & medtech equities as a Senior Analyst / Junior PM at AtonRa Partners; by training I'm a cell biologist with four peer-reviewed papers on intracellular immunity.",
    "Outside the lab and the markets I've spent a decade building the Swiss esports scene — president of Geneva E-Sport and the Swiss Esports Federation. This site is where biology, capital, and games converge into one feed.",
  ],
  focus: [
    {
      label: "Game",
      detail:
        "Esports leadership & game dev — built Geneva's gaming scene, 700+ members",
    },
    {
      label: "Invest",
      detail:
        "Healthcare equity research — biotech & medtech, $60M AuM at AtonRa Partners",
    },
    {
      label: "Science",
      detail:
        "Ph.D in biomedical sciences — immunology, bacteriology & cell biology",
    },
  ],
  cvHref: "/cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/orbite-lab/", icon: "github" },
    { label: "X", href: "https://x.com/RBodinier", icon: "x" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/romain-bodinier/",
      icon: "linkedin",
    },
  ],
};
