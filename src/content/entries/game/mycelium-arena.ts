import type { Entry } from "../types";

const entry: Entry = {
  slug: "mycelium-arena",
  domain: "game",
  type: "project",
  title: "Mycelium Arena",
  summary:
    "A real-time strategy game where you don't command units — you grow them, spreading a fungal network across contested terrain.",
  date: "2026-05-18",
  state: "in progress",
  status: "live",
  featured: true,
  tags: ["rts", "procedural", "bio-sim", "godot"],
  body: [
    "Mycelium Arena throws out the unit-and-base RTS loop. Instead you play as a colony: nutrients flow through hyphae, branching toward heat signatures and decaying matter, competing for the same substrate as your opponent.",
    "The whole simulation runs on a reaction-diffusion field. Players nudge growth with pheromone markers rather than direct orders, so victory is about reading the board as a living organism — pruning, redirecting, and starving the enemy network.",
    "Currently prototyping the diffusion solver on the GPU so a single match can sustain ~2M active cells at 60fps.",
  ],
  links: [
    { label: "Devlog #3", href: "#" },
    { label: "Wishlist", href: "#" },
  ],
};

export default entry;
