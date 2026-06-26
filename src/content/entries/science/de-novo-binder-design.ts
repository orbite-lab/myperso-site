import type { Entry } from "../types";

const entry: Entry = {
  slug: "de-novo-binder-design",
  domain: "science",
  type: "essay",
  title: "Past AlphaFold: Designing Binders That Actually Stick",
  summary:
    "Structural biology's next act isn't predicting one static fold — it's routine de novo design of high-affinity protein binders and full conformational landscapes. The bottleneck is becoming engineering, not guessing.",
  date: "2026-06-12",
  state: "published",
  status: "live",
  tags: ["protein-design", "ml", "structural-biology", "alphafold"],
  body: [
    "AlphaFold 2 solved 'what does this sequence fold into?' The frontier now is two harder questions: what are the protein's full conformational states, and can we design — from scratch — a new protein that binds a chosen target with high affinity. The recent literature frames de novo binder design as becoming a scalable engineering discipline with real experimental hit-rates, not a lottery.",
    "For me this connects my old immunology work to where the field is going: instead of screening nature's antibodies, you specify the epitope and let a model lay down a binder. That collapses timelines from months to days and turns 'find a molecule' into 'compile a molecule' — with all the leverage that implies for therapeutics and diagnostics.",
  ],
  links: [
    {
      label: "Source · Nature Communications Biology",
      href: "https://www.nature.com/articles/s42003-026-10112-3",
    },
  ],
};

export default entry;
