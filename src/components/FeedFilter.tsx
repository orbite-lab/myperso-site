"use client";

import { useMemo, useState } from "react";
import {
  DOMAIN_ORDER,
  DOMAINS,
  type Domain,
  type Entry,
} from "@/content/entries/types";
import { EntryCard } from "./EntryCard";
import { Reveal } from "./Reveal";

type Filter = Domain | "all";

export function FeedFilter({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: entries.length,
      game: 0,
      invest: 0,
      science: 0,
    };
    for (const e of entries) c[e.domain]++;
    return c;
  }, [entries]);

  const visible = useMemo(
    () => (active === "all" ? entries : entries.filter((e) => e.domain === active)),
    [active, entries],
  );

  return (
    <section>
      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Pill
          label="All"
          count={counts.all}
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        {DOMAIN_ORDER.map((d) => (
          <Pill
            key={d}
            label={DOMAINS[d].label}
            count={counts[d]}
            accent={DOMAINS[d].accent}
            active={active === d}
            onClick={() => setActive(d)}
          />
        ))}
        <span className="mono ml-auto hidden text-[11px] text-ink-faint sm:inline">
          {visible.length} signal{visible.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Feed grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((entry, i) => (
          <Reveal key={entry.slug} index={i}>
            <EntryCard entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Pill({
  label,
  count,
  accent,
  active,
  onClick,
}: {
  label: string;
  count: number;
  accent?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200"
      style={{
        borderColor: active
          ? accent
            ? `${accent}80`
            : "rgba(230,236,255,0.4)"
          : "rgba(255,255,255,0.1)",
        background: active
          ? accent
            ? `${accent}1a`
            : "rgba(255,255,255,0.08)"
          : "transparent",
        color: active ? (accent ?? "#e6ecff") : "#8b93b5",
        boxShadow: active && accent ? `0 0 24px -6px ${accent}` : undefined,
      }}
    >
      {accent && (
        <span
          className="h-1.5 w-1.5 rounded-full transition-all"
          style={{
            background: accent,
            boxShadow: active ? `0 0 10px ${accent}` : "none",
            opacity: active ? 1 : 0.5,
          }}
        />
      )}
      {label}
      <span className="mono text-[11px] opacity-60">{count}</span>
    </button>
  );
}
