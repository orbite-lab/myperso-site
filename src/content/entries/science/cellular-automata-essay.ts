import type { Entry } from "../types";

const entry: Entry = {
  slug: "cellular-automata-essay",
  domain: "science",
  type: "essay",
  title: "Life Is a Cellular Automaton (Sort Of)",
  summary:
    "An essay on Lenia, continuous cellular automata, and why morphogenesis might be simpler than we think.",
  date: "2026-04-29",
  state: "published",
  status: "live",
  tags: ["alife", "lenia", "morphogenesis", "essay"],
  body: [
    "Conway's Game of Life is discrete and brittle. Lenia generalizes it to continuous space, time, and states — and out of that smoothness crawl creatures that glide, split, and heal.",
    "This piece argues that the gap between 'toy automaton' and 'developmental biology' is narrower than it looks, and walks through implementing a Lenia organism that maintains its body plan under damage.",
  ],
  links: [{ label: "Interactive demo", href: "#" }],
};

export default entry;
