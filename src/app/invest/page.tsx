import type { Metadata } from "next";
import { LensView } from "@/components/LensView";

export const metadata: Metadata = { title: "Invest // orbite.lab" };

export default function InvestPage() {
  return <LensView domain="invest" />;
}
