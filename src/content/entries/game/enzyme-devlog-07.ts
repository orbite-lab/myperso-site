import type { Entry } from "../types";

const entry: Entry = {
  slug: "enzyme-devlog-07",
  domain: "game",
  type: "devlog",
  title: "Devlog 07 — Teaching enzymes to pathfind",
  summary:
    "How I replaced A* with a gradient-following agent model that behaves more like a protein folding toward its substrate.",
  date: "2026-04-02",
  state: "v0.7",
  status: "live",
  tags: ["pathfinding", "agents", "devlog"],
  body: [
    "Classic A* gave my creatures a robotic, omniscient feel — they always knew the optimal route. For a game about microscopic life, that's wrong. Real cells stumble toward chemical gradients.",
    "This devlog walks through swapping the planner for a chemotaxis-style controller: agents sample a scent field locally and bias their random walk uphill. It's cheaper, emergent, and produces those satisfying 'swarm finds the food' moments for free.",
  ],
  links: [{ label: "Watch the breakdown", href: "#" }],
};

export default entry;
