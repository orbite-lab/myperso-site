import type { Metadata } from "next";
import { LensView } from "@/components/LensView";

export const metadata: Metadata = { title: "Science // orbite.lab" };

export default function SciencePage() {
  return <LensView domain="science" />;
}
