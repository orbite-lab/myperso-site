import type { Metadata } from "next";
import { LensView } from "@/components/LensView";

export const metadata: Metadata = { title: "Game // myperso" };

export default function GamePage() {
  return <LensView domain="game" />;
}
