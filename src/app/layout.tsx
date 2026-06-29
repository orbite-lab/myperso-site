import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BioBackdrop } from "@/components/BioBackdrop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "myperso // game · invest · science",
  description:
    "A living feed at the intersection of games, capital, and biology.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chakra.variable}`}
    >
      <body className="imaging-grain min-h-screen">
        <BioBackdrop />
        <SiteNav />
        <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-8 sm:px-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
