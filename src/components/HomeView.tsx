"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DOMAINS, type Entry } from "@/content/entries/types";
import { ConfocalHero, type Channel } from "./ConfocalHero";
import { EntryCard } from "./EntryCard";
import { Reveal } from "./Reveal";

/**
 * Home composition. Owns the active fluorescence channel so the hero's
 * channel chips double as the feed filter — one control, two effects.
 */
export function HomeView({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState<Channel>("merge");

  const visible = useMemo(
    () =>
      active === "merge"
        ? entries
        : entries.filter((e) => e.domain === active),
    [active, entries],
  );

  return (
    <div className="space-y-10">
      <ConfocalHero active={active} onChange={setActive} />

      <section>
        {/* feed header — shows the acquired channel, lets you reset to merge */}
        <div className="mb-5 flex items-center justify-between border-b border-white/8 pb-3">
          <p className="mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
            // feed ·{" "}
            {active === "merge" ? (
              <span className="text-ink-dim">all channels</span>
            ) : (
              <Link
                href={`/${active}`}
                className="underline-offset-4 transition-opacity hover:underline"
                style={{ color: DOMAINS[active].accent }}
              >
                {DOMAINS[active].label} isolated → open lens
              </Link>
            )}
          </p>
          <span className="mono text-[11px] text-ink-faint">
            {visible.length} signal{visible.length === 1 ? "" : "s"}
            {active !== "merge" && (
              <button
                onClick={() => setActive("merge")}
                className="ml-3 text-ink-dim underline-offset-2 transition-colors hover:text-ink hover:underline"
              >
                reset
              </button>
            )}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((entry, i) => (
            <Reveal key={entry.slug} index={i}>
              <EntryCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
