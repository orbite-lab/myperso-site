import Link from "next/link";
import { DOMAINS, type Entry } from "@/content/entries/types";
import { DomainBadge } from "./DomainBadge";
import { formatDate, stampDate } from "@/lib/format";

export function EntryCard({ entry }: { entry: Entry }) {
  const meta = DOMAINS[entry.domain];
  return (
    <Link
      href={`/work/${entry.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-organic)] glass p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={
        {
          // CSS vars consumed by .scan-line / hover glow
          ["--accent-rgb" as string]: meta.accentSoft,
        } as React.CSSProperties
      }
    >
      {/* hover scan sweep */}
      <span className="scan-line" aria-hidden />
      {/* left accent membrane */}
      <span
        className="absolute inset-y-0 left-0 w-[3px] opacity-60 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(to bottom, transparent, ${meta.accent}, transparent)`,
        }}
        aria-hidden
      />

      <div className="flex items-center justify-between gap-3">
        <DomainBadge domain={entry.domain} type={entry.type} />
        <time className="mono text-[11px] text-ink-faint" dateTime={entry.date}>
          {stampDate(entry.date)}
        </time>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-white">
        {entry.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
        {entry.summary}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {entry.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="mono rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-ink-faint"
            >
              #{tag}
            </span>
          ))}
        </div>
        {entry.state && (
          <span
            className="mono text-[10px] uppercase tracking-wider"
            style={{ color: meta.accent }}
          >
            ▸ {entry.state}
          </span>
        )}
      </div>

      <span className="sr-only">{formatDate(entry.date)}</span>
    </Link>
  );
}
