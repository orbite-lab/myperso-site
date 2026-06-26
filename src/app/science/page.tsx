import type { Metadata } from "next";
import { LensView } from "@/components/LensView";

export const metadata: Metadata = { title: "Science // myperso" };

export default function SciencePage() {
  return <LensView domain="science" />;
}
