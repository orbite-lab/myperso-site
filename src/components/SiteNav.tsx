import Link from "next/link";

/**
 * Minimal top bar — just the brand. Domain navigation lives in the home
 * hero's channel chips; there's no separate feed/now page to link to.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[var(--color-void)]/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-game via-invest to-science opacity-80 blur-[6px] transition group-hover:opacity-100" />
            <span className="relative h-3 w-3 rounded-full bg-gradient-to-tr from-game via-invest to-science" />
          </span>
          <span className="mono text-sm font-medium tracking-tight">
            orbite<span className="text-ink-faint">.lab</span>
          </span>
        </Link>

        <span className="mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          game · invest · science
        </span>
      </nav>
    </header>
  );
}
