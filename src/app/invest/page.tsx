import type { Metadata } from "next";
import { LensView } from "@/components/LensView";

export const metadata: Metadata = { title: "Invest // myperso" };

export default function InvestPage() {
  return <LensView domain="invest" />;
}
