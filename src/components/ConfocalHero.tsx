"use client";

import { PROFILE } from "@/content/profile";
import {
  DOMAIN_ORDER,
  DOMAINS,
  type Domain,
} from "@/content/entries/types";
import { SocialLinks, DownloadCV } from "./SocialLinks";

/** "merge" = all channels (no filter); a Domain = isolate that fluorophore. */
export type Channel = Domain | "merge";

/** Real fluorophore labels per lens — the microscopy vernacular. */
const FLUOR: Record<Domain, string> = {
  game: "mCherry",
  invest: "GFP",
  science: "DAPI",
};

export function ConfocalHero({
  active,
  onChange,
  src = "/avatar.jpg",
}: {
  active: Channel;
  onChange: (c: Channel) => void;
  src?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[var(--radius-organic)] border border-white/8 bg-panel/60 p-5 backdrop-blur-sm sm:p-7">
      {/* acquisition metadata strip */}
      <div className="mono flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-ink-faint">
        <span>specimen — r. bodinier</span>
        <span className="hidden sm:inline">obj 63× / na 1.4 · {channelTag(active)}</span>
      </div>

      <div className="mt-5 grid items-center gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
        <FluorescenceMerge src={src} active={active} />

        <div className="min-w-0">
          <h1 className="text-balance text-3xl font-bold leading-[1.04] tracking-tight sm:text-[2.7rem]">
            {PROFILE.name}
          </h1>
          <p className="mt-2 text-base font-medium sm:text-lg">
            <span className="text-gradient">{PROFILE.role}</span>
          </p>

          {/* Channel selector — IS the feed filter */}
          <div className="mt-5">
            <p className="mono mb-2 text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              channels acquired
            </p>
            <div className="flex flex-wrap gap-2">
              {DOMAIN_ORDER.map((d) => (
                <ChannelChip
                  key={d}
                  label={DOMAINS[d].label}
                  sub={FLUOR[d]}
                  color={DOMAINS[d].accent}
                  active={active === d}
                  onClick={() => onChange(active === d ? "merge" : d)}
                />
              ))}
              <ChannelChip
                label="Merge"
                sub="all"
                merge
                active={active === "merge"}
                onClick={() => onChange("merge")}
              />
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-dim">
            {PROFILE.bio[0]}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <DownloadCV />
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* epigraph — the one warm-bone moment, like a figure caption */}
      {PROFILE.epigraph && (
        <figure className="mt-6 border-t border-white/8 pt-4">
          <blockquote className="text-sm italic leading-relaxed text-bone/90">
            “{PROFILE.epigraph.text}”
          </blockquote>
          <figcaption className="mono mt-1 text-[10px] uppercase tracking-[0.25em] text-bone/50">
            — {PROFILE.epigraph.attribution}
          </figcaption>
        </figure>
      )}
    </section>
  );
}

function channelTag(active: Channel): string {
  if (active === "merge") return "merge";
  return `ch · ${FLUOR[active]}`;
}

/** Stacked 3-channel fluorescence composite of the portrait. */
function FluorescenceMerge({ src, active }: { src: string; active: Channel }) {
  const offsets: Record<Domain, string> = {
    game: "translate(-2.5px, 1px)",
    invest: "translate(0, -1.5px)",
    science: "translate(2.5px, 1px)",
  };

  return (
    <div className="relative mx-auto aspect-square w-[200px] shrink-0 sm:mx-0 sm:w-[220px]">
      {/* field-of-view frame */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-black">
        {DOMAIN_ORDER.map((d) => {
          const isolated = active !== "merge";
          const lit = !isolated || active === d;
          return (
            <div
              key={d}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                mixBlendMode: "screen",
                opacity: lit ? 1 : 0.08,
                transform: active === "merge" ? offsets[d] : "none",
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-[center_top]"
                style={{
                  backgroundImage: `url(${src})`,
                  filter: "grayscale(1) contrast(1.25) brightness(1.05)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: DOMAINS[d].accent, mixBlendMode: "multiply" }}
              />
            </div>
          );
        })}

        {/* subtle vignette + grain to sell the microscopy look */}
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 60px 10px rgba(0,0,0,0.6)",
          }}
        />

        {/* scale bar */}
        <div className="absolute bottom-2.5 left-2.5 flex flex-col gap-1">
          <span className="block h-[3px] w-10 bg-white/80" />
          <span className="mono text-[9px] uppercase tracking-wider text-white/70">
            50 µm
          </span>
        </div>

        {/* corner ticks */}
        {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "left-2 bottom-2 border-l border-b", "right-2 bottom-2 border-r border-b"].map(
          (c, i) => (
            <span key={i} className={`absolute ${c} h-3 w-3 border-white/25`} />
          ),
        )}
      </div>

      {/* live dot */}
      <span className="mono absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-void/80 px-2 py-0.5 text-[9px] uppercase tracking-widest text-invest">
        ● live acquisition
      </span>
    </div>
  );
}

function ChannelChip({
  label,
  sub,
  color,
  merge = false,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  color?: string;
  merge?: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="group/chip flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all"
      style={{
        borderColor: active
          ? merge
            ? "rgba(231,222,201,0.5)"
            : `${color}88`
          : "rgba(255,255,255,0.1)",
        background: active
          ? merge
            ? "rgba(231,222,201,0.08)"
            : `${color}1f`
          : "transparent",
        boxShadow: active && !merge ? `0 0 22px -6px ${color}` : undefined,
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: merge
            ? "conic-gradient(from 0deg, #b24dff, #15e0c4, #4f86ff, #b24dff)"
            : color,
          boxShadow: active && !merge ? `0 0 8px ${color}` : undefined,
          opacity: active ? 1 : 0.55,
        }}
      />
      <span className="leading-tight">
        <span
          className="block text-xs font-medium"
          style={{ color: active ? (merge ? "#e7dec9" : color) : "#98a1c2" }}
        >
          {label}
        </span>
        <span className="mono block text-[9px] uppercase tracking-wider text-ink-faint">
          {sub}
        </span>
      </span>
    </button>
  );
}
