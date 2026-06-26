"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOMAIN_ORDER, DOMAINS } from "@/content/entries/types";

const NAV_LINKS = [
  { href: "/", label: "Feed" },
  ...DOMAIN_ORDER.map((d) => ({ href: `/${d}`, label: DOMAINS[d].label })),
  { href: "/now", label: "Now" },
];

function accentFor(href: string): string | undefined {
  const d = DOMAIN_ORDER.find((x) => href === `/${x}`);
  return d ? DOMAINS[d].accent : undefined;
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[var(--color-void)]/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-game via-invest to-science opacity-80 blur-[6px] transition group-hover:opacity-100" />
            <span className="relative h-3 w-3 rounded-full bg-gradient-to-tr from-game via-invest to-science" />
          </span>
          <span className="mono text-sm font-medium tracking-tight">
            myperso<span className="text-ink-faint">.sys</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 text-sm">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const accent = accentFor(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-3 py-1.5 transition-colors ${
                    active
                      ? "text-ink"
                      : "text-ink-dim hover:text-ink"
                  }`}
                  style={
                    active && accent
                      ? { color: accent }
                      : undefined
                  }
                >
                  {active && (
                    <span
                      className="absolute inset-0 -z-10 rounded-full border"
                      style={{
                        borderColor: accent
                          ? `${accent}55`
                          : "rgba(255,255,255,0.15)",
                        background: accent
                          ? `${accent}14`
                          : "rgba(255,255,255,0.06)",
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
