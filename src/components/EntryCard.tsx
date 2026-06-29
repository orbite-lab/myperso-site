import Link from "next/link";
import { DOMAINS, TYPE_LABELS, type Entry } from "@/content/entries/types";
import { DomainBadge } from "./DomainBadge";
import { EntryCover } from "./EntryCover";
import { formatDate, stampDate } from "@/lib/format";

export function EntryCard({ entry }: { entry: Entry }) {
  const meta = DOMAINS[entry.domain];
  return (
    <Link
      href={`/work/${entry.slug}`}
      className="hud-frame group relative block overflow-hidden rounded-[var(--radius-organic)] glass transition-all duration-300 hover:-translate-y-1"
      style={
        { ["--accent-rgb" as string]: meta.accentSoft } as React.CSSProperties
      }
    >
      {/* hover scan sweep */}
      <span className="scan-line" aria-hidden />

      {/* Cover banner: real image or generative bio-scan */}
      <div className="relative">
        {entry.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.image}
            alt=""
            className="h-[132px] w-full object-cover"
          />
        ) : (
          <EntryCover slug={entry.slug} domain={entry.domain} />
        )}
        {/* fade into card body */}
        <span className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0e1220] to-transparent" />
        {/* class/type chip on the cover */}
        <span
          className="mono absolute right-3 top-3 rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur-sm"
          style={{
            color: meta.accent,
            borderColor: `${meta.accent}55`,
            background: "rgba(5,6,10,0.55)",
          }}
        >
          {TYPE_LABELS[entry.type]}
        </span>
      </div>

      <div className="p-5 pt-3">
        <div className="flex items-center justify-between gap-3">
          <DomainBadge domain={entry.domain} />
          <time
            className="mono text-[11px] text-ink-faint"
            dateTime={entry.date}
          >
            {stampDate(entry.date)}
          </time>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-white">
          {entry.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
          {entry.summary}
        </p>

        {/* hover underline sweep (decorative) */}
        <div className="mt-4 h-px w-full overflow-hidden bg-white/5">
          <span
            className="block h-full w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{
              background: `linear-gradient(90deg, ${meta.accent}, transparent)`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
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
      </div>

      <span className="sr-only">{formatDate(entry.date)}</span>
    </Link>
  );
}
