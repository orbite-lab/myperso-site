import type { Entry } from "../types";

const entry: Entry = {
  slug: "protein-folding-experiment",
  domain: "science",
  type: "experiment",
  title: "Folding Toy Proteins on a Laptop GPU",
  summary:
    "A from-scratch implementation of a differentiable folding model, small enough to train overnight on consumer hardware.",
  date: "2026-06-20",
  state: "ongoing",
  status: "live",
  featured: true,
  tags: ["protein", "ml", "cuda", "experiment"],
  body: [
    "AlphaFold is magnificent and also completely opaque if you want to learn how the machinery actually works. So I'm building a deliberately tiny version: 30-residue synthetic peptides, a stripped-down attention stack, and an energy-based loss I can reason about by hand.",
    "The goal isn't accuracy — it's intuition. Each notebook isolates one mechanism (pair representations, triangle attention, the recycling loop) so I can watch what breaks when I remove it.",
    "Latest run reaches sub-angstrom RMSD on the toy set after 4 hours on a single 4090.",
  ],
  links: [
    { label: "Notebooks", href: "#" },
    { label: "Write-up", href: "#" },
  ],
};

export default entry;
