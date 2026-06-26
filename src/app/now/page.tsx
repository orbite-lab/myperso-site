import type { Metadata } from "next";
import { recent } from "@/content/entries";
import { DOMAINS } from "@/content/entries/types";
import { stampDate } from "@/lib/format";
import Link from "next/link";

export const metadata: Metadata = { title: "Now // myperso" };

export default function NowPage() {
  const latest = recent(5);

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-[var(--radius-organic)] glass p-8">
        <span className="absolute right-6 top-6 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-invest opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-invest" />
          </span>
          <span className="mono text-[11px] uppercase tracking-wider text-invest">
            live
          </span>
        </span>
        <p className="mono text-xs uppercase tracking-[0.3em] text-ink-faint">
          // activity monitor
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Now</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-dim">
          A snapshot of what the organism is metabolizing right now. This page is
          a stub — soon it&apos;ll pull live status, current focus, and
          in-flight experiments.
        </p>
      </header>

      {/* Placeholder vitals */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Vital label="Focus" value="Mycelium Arena" accent={DOMAINS.game.accent} />
        <Vital
          label="Reading"
          value="Synbio compute stack"
          accent={DOMAINS.invest.accent}
        />
        <Vital
          label="Tinkering"
          value="Toy protein folding"
          accent={DOMAINS.science.accent}
        />
      </section>

      {/* Recent signal log */}
      <section className="rounded-[var(--radius-organic)] glass p-6">
        <p className="mono mb-4 text-xs uppercase tracking-wider text-ink-faint">
          // recent signal log
        </p>
        <ul className="space-y-1">
          {latest.map((e) => {
            const meta = DOMAINS[e.domain];
            return (
              <li key={e.slug}>
                <Link
                  href={`/work/${e.slug}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
                >
                  <span className="mono text-[11px] text-ink-faint">
                    {stampDate(e.date)}
                  </span>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }}
                  />
                  <span className="truncate text-sm text-ink-dim transition-colors group-hover:text-ink">
                    {e.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Vital({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-[var(--radius-organic)] glass p-5">
      <p className="mono text-[11px] uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-2 font-medium" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}
