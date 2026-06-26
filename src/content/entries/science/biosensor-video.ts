import type { Entry } from "../types";

const entry: Entry = {
  slug: "biosensor-video",
  domain: "science",
  type: "video",
  title: "Building a DIY Bioluminescence Sensor",
  summary:
    "Video build log: a desk-sized rig that turns living bacteria into a light-emitting readout for environmental toxins.",
  date: "2026-02-22",
  state: "published",
  status: "live",
  tags: ["hardware", "biosensor", "video", "diy-bio"],
  body: [
    "Engineered bioluminescent bacteria dim when they encounter heavy metals. Pair them with a cheap photomultiplier and a microcontroller and you have a living toxin detector for under $200.",
    "This video covers the optical chamber, the light-tight enclosure, and the calibration curve against known copper concentrations.",
  ],
  links: [{ label: "Watch", href: "#" }, { label: "BOM + STLs", href: "#" }],
};

export default entry;
