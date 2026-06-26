import type { Entry } from "../types";

const entry: Entry = {
  slug: "compute-arms-race-essay",
  domain: "invest",
  type: "essay",
  title: "Energy Is the Real Moat",
  summary:
    "An essay on why the AI compute arms race is, downstream, a bet on power generation — and how to position for it.",
  date: "2026-03-27",
  state: "published",
  status: "live",
  tags: ["energy", "ai-infra", "macro", "essay"],
  body: [
    "Every GPU is a small space heater. Scale that to gigawatt clusters and the binding constraint stops being silicon and becomes the grid. The companies that win the AI buildout may not be the chip designers but the ones who control baseload power and cooling.",
    "I trace the dependency chain from model training down to natural gas turbines and small modular reactors, and argue the market is still mispricing the energy leg of the trade.",
  ],
  links: [{ label: "Read on Substack", href: "#" }],
};

export default entry;
