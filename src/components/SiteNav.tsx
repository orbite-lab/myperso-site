"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Domain navigation lives in the home hero's channel chips (the "channels
// acquired" control), so the top bar stays minimal and doesn't duplicate it.
const NAV_LINKS = [
  { href: "/", label: "Feed" },
  { href: "/now", label: "Now" },
];

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
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-3 py-1.5 transition-colors ${
                    active ? "text-ink" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/6" />
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
