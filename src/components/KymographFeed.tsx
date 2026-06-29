import Link from "next/link";
import { DOMAINS, TYPE_LABELS, type Entry } from "@/content/entries/types";
import { EntryCover } from "./EntryCover";
import { Reveal } from "./Reveal";

/**
 * The feed as a kymograph — a vertical time axis (newest at top) where each
 * entry is a node on its channel's color, with month/year markers down the
 * spine. Reading one isolated channel = reading one fluorophore's trace over
 * time. Replaces the flat card grid.
 */

interface Group {
  key: string;
  year: string;
  month: string;
  entries: Entry[];
}

function groupByMonth(entries: Entry[]): Group[] {
  const groups: Group[] = [];
  for (const e of entries) {
    const [year, month] = e.date.split("-");
    const key = `${year}-${month}`;
    let g = groups.find((x) => x.key === key);
    if (!g) {
      g = { key, year, month, entries: [] };
      groups.push(g);
    }
    g.entries.push(e);
  }
  return groups;
}

function monthName(year: string, month: string): string {
  return new Date(Date.UTC(+year, +month - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
}

export function KymographFeed({ entries }: { entries: Entry[] }) {
  if (entries.length === 0) {
    return <p className="mono py-8 text-sm text-ink-faint">// no signals on this channel</p>;
  }

  const groups = groupByMonth(entries);
  let i = 0; // global stagger index

  return (
    <div className="relative">
      {/* the time-axis spine */}
      <span
        className="pointer-events-none absolute bottom-2 left-4 top-2 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(152,161,194,0.35) 8%, rgba(152,161,194,0.25) 92%, transparent)",
        }}
        aria-hidden
      />

      {groups.map((g) => (
        <section key={g.key}>
          {/* period marker — label + hairline running to the edge */}
          <div className="relative flex items-center py-3 pl-10">
            <span
              className="absolute left-4 h-2 w-2 -translate-x-1/2 rounded-full bg-ink-faint"
              aria-hidden
            />
            <h2 className="mono shrink-0 text-[11px] uppercase tracking-[0.3em] text-ink-dim">
              {monthName(g.year, g.month)}{" "}
              <span className="text-ink-faint">{g.year}</span>
            </h2>
            <span className="ml-4 h-px flex-1 bg-white/8" aria-hidden />
          </div>

          <ul>
            {g.entries.map((entry) => (
              <li key={entry.slug}>
                <Reveal index={i++}>
                  <TimelineEntry entry={entry} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TimelineEntry({ entry }: { entry: Entry }) {
  const meta = DOMAINS[entry.domain];
  const day = entry.date.split("-")[2];

  return (
    <Link
      href={`/work/${entry.slug}`}
      className="group relative block py-2.5 pl-10"
      style={{ ["--accent-rgb" as string]: meta.accentSoft } as React.CSSProperties}
    >
      {/* node on the spine */}
      <span
        className="absolute left-4 top-5 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
        style={{
          borderColor: meta.accent,
          background: "var(--color-void)",
          boxShadow: `0 0 0 3px rgba(${meta.accentSoft},0.12)`,
        }}
        aria-hidden
      />
      {/* pulse core */}
      <span
        className="absolute left-4 top-5 h-3 w-3 -translate-x-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: meta.accent, filter: "blur(4px)" }}
        aria-hidden
      />
      {/* connector tick from spine to card */}
      <span
        className="absolute left-[17px] top-[26px] h-px w-5 origin-left scale-x-50 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${meta.accent}, transparent)` }}
        aria-hidden
      />

      <div className="flex gap-4 border-b border-white/[0.06] pb-4 transition-colors group-hover:border-white/15">
        {/* compact bio-scan thumb — sharp FOV with corner ticks */}
        <div className="relative hidden h-20 w-24 shrink-0 overflow-hidden sm:block">
          {entry.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <EntryCover slug={entry.slug} domain={entry.domain} height={80} />
          )}
          {[
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "left-0 bottom-0 border-l border-b",
            "right-0 bottom-0 border-r border-b",
          ].map((c, k) => (
            <span key={k} className={`absolute ${c} h-2.5 w-2.5 border-white/30`} aria-hidden />
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <span
              className="mono inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider"
              style={{ color: meta.accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: meta.accent, boxShadow: `0 0 6px ${meta.accent}` }}
              />
              {meta.label}
            </span>
            <span className="mono text-[10px] uppercase tracking-wider text-ink-faint">
              / {TYPE_LABELS[entry.type]}
            </span>
            <time className="mono ml-auto text-[10px] text-ink-faint" dateTime={entry.date}>
              {day} · {entry.date.slice(0, 7).replace("-", ".")}
            </time>
          </div>

          <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-white sm:text-lg">
            {entry.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-dim">
            {entry.summary}
          </p>
          {entry.state && (
            <span
              className="mono mt-2 inline-block text-[10px] uppercase tracking-wider"
              style={{ color: meta.accent }}
            >
              ▸ {entry.state}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
