import { byDomain } from "@/content/entries";
import { DOMAINS, type Domain } from "@/content/entries/types";
import { EntryCard } from "./EntryCard";

/** Full lens page body for a single domain. */
export function LensView({ domain }: { domain: Domain }) {
  const meta = DOMAINS[domain];
  const entries = byDomain(domain);

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-[var(--radius-organic)] glass p-8">
        <span
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
          style={{ background: meta.accent }}
          aria-hidden
        />
        <p
          className="mono text-xs uppercase tracking-[0.3em]"
          style={{ color: meta.accent }}
        >
          // lens · {meta.label.toLowerCase()}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {meta.label}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-dim">
          {meta.tagline}
        </p>
        <p className="mono mt-5 text-xs text-ink-faint">
          {entries.length} entr{entries.length === 1 ? "y" : "ies"} in this lens
        </p>
      </header>

      {entries.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="mono text-sm text-ink-faint">// no signals yet</p>
      )}
    </div>
  );
}
