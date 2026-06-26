import type { Entry } from "../types";

const entry: Entry = {
  slug: "spore-jam-release",
  domain: "game",
  type: "release",
  title: "SPORE — 48h jam build",
  summary:
    "A tiny game made in a weekend: cultivate a glowing spore garden before the dark tide rolls in. Shipped to web.",
  date: "2026-02-09",
  state: "shipped",
  status: "live",
  tags: ["game-jam", "web", "shaders"],
  body: [
    "Built for a 48-hour jam with the theme 'symbiosis'. You plant bioluminescent spores that feed each other in chains — break the chain and the whole garden goes dark.",
    "Most of the weekend went into a single fragment shader doing the volumetric glow and the encroaching darkness. Placed 14th of 380.",
  ],
  links: [
    { label: "Play in browser", href: "#" },
    { label: "Source", href: "#" },
  ],
};

export default entry;
