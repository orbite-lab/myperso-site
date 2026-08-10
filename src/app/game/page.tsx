import type { Metadata } from "next";
import { LensView } from "@/components/LensView";

export const metadata: Metadata = { title: "Game // orbite.lab" };

export default function GamePage() {
  return <LensView domain="game" />;
}
