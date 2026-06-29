"use client";

import { PROFILE } from "@/content/profile";
import { DOMAIN_ORDER, DOMAINS, type Domain } from "@/content/entries/types";
import { SocialLinks, DownloadCV } from "./SocialLinks";

/** "merge" = all channels (no filter); a Domain = isolate that fluorophore. */
export type Channel = Domain | "merge";

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
    <section className="relative">
      {/* acquisition metadata strip — hairline, no box */}
      <div className="mono flex items-center justify-between border-b border-white/10 pb-2 text-[10px] uppercase tracking-[0.25em] text-ink-faint">
        <span>specimen — r. bodinier</span>
        <span>obj 63× / na 1.4 · {channelTag(active)}</span>
      </div>

      <div className="mt-7 grid items-start gap-7 sm:grid-cols-[210px_1fr] sm:gap-9">
        <FluorescenceMerge src={src} active={active} />

        <div className="min-w-0">
          <h1 className="text-balance text-3xl font-bold leading-[1.03] tracking-tight sm:text-[2.9rem]">
            {PROFILE.name}
          </h1>
          <p className="mt-2 text-base font-medium sm:text-lg">
            <span className="text-gradient">{PROFILE.role}</span>
          </p>

          {/* Channels — open toggles (underline = active), not boxes */}
          <div className="mt-6">
            <p className="mono mb-3 text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              channels acquired —{" "}
              <span className="text-ink-dim">select to isolate</span>
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {DOMAIN_ORDER.map((d) => (
                <ChannelToggle
                  key={d}
                  label={DOMAINS[d].label}
                  sub={FLUOR[d]}
                  color={DOMAINS[d].accent}
                  active={active === d}
                  onClick={() => onChange(active === d ? "merge" : d)}
                />
              ))}
              <ChannelToggle
                label="Merge"
                sub="all"
                merge
                active={active === "merge"}
                onClick={() => onChange("merge")}
              />
            </div>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-dim">
            {PROFILE.bio[0]}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <DownloadCV />
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* epigraph — figure-caption, hairline above, the one warm note */}
      {PROFILE.epigraph && (
        <figure className="mt-9 border-t border-white/10 pt-4">
          <blockquote className="max-w-2xl text-sm italic leading-relaxed text-bone/90">
            “{PROFILE.epigraph.text}”
          </blockquote>
          <figcaption className="mono mt-1.5 text-[10px] uppercase tracking-[0.25em] text-bone/50">
            — {PROFILE.epigraph.attribution}
          </figcaption>
        </figure>
      )}
    </section>
  );
}

function channelTag(active: Channel): string {
  return active === "merge" ? "merge" : `ch · ${FLUOR[active]}`;
}

/** Stacked 3-channel fluorescence composite — a sharp microscope field-of-view. */
function FluorescenceMerge({ src, active }: { src: string; active: Channel }) {
  const offsets: Record<Domain, string> = {
    game: "translate(-2.5px, 1px)",
    invest: "translate(0, -1.5px)",
    science: "translate(2.5px, 1px)",
  };

  return (
    <div className="mx-auto w-[200px] shrink-0 sm:mx-0 sm:w-[210px]">
      {/* FOV — sharp corners, corner-tick framing (not a rounded card) */}
      <div className="relative aspect-square w-full bg-black">
        <div className="absolute inset-0 overflow-hidden">
          {DOMAIN_ORDER.map((d) => {
            const isolated = active !== "merge";
            const lit = !isolated || active === d;
            return (
              <div
                key={d}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  mixBlendMode: "screen",
                  opacity: lit ? 1 : 0.07,
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

          <span
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 60px 10px rgba(0,0,0,0.6)" }}
          />

          {/* scale bar */}
          <div className="absolute bottom-2.5 left-2.5 flex flex-col gap-1">
            <span className="block h-[3px] w-10 bg-white/80" />
            <span className="mono text-[9px] uppercase tracking-wider text-white/70">
              50 µm
            </span>
          </div>
        </div>

        {/* corner ticks — the only framing */}
        {[
          "left-0 top-0 border-l border-t",
          "right-0 top-0 border-r border-t",
          "left-0 bottom-0 border-l border-b",
          "right-0 bottom-0 border-r border-b",
        ].map((c, i) => (
          <span key={i} className={`absolute ${c} h-4 w-4 border-white/35`} />
        ))}
      </div>

      <p className="mono mt-2 flex items-center justify-between text-[9px] uppercase tracking-widest text-ink-faint">
        <span className="text-invest">● live acquisition</span>
        <span>{active === "merge" ? "3-ch merge" : FLUOR[active as Domain]}</span>
      </p>
    </div>
  );
}

function ChannelToggle({
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
      className="group/ch flex items-center gap-2 border-b-2 pb-1 transition-colors"
      style={{ borderColor: active ? (merge ? "#e7dec9" : color) : "transparent" }}
    >
      <span
        className="h-2 w-2 rounded-full transition-all"
        style={{
          background: merge
            ? "conic-gradient(from 0deg, #b24dff, #15e0c4, #4f86ff, #b24dff)"
            : color,
          boxShadow: active && !merge ? `0 0 8px ${color}` : undefined,
          opacity: active ? 1 : 0.5,
        }}
      />
      <span className="text-left leading-tight">
        <span
          className="block text-xs font-medium transition-colors"
          style={{
            color: active ? (merge ? "#e7dec9" : color) : "#98a1c2",
          }}
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
