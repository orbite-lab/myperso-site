import { byDomain } from "@/content/entries";
import { DOMAINS, type Domain } from "@/content/entries/types";
import { BioPhoto } from "./BioPhoto";
import { KymographFeed } from "./KymographFeed";

/** Optional photo backdrop per lens (degrades to gradient if file absent). */
const LENS_PHOTO: Partial<Record<Domain, { src: string; position?: string }>> = {
  science: { src: "/igem.jpg", position: "center 30%" },
  invest: { src: "/hero.jpg", position: "center 20%" },
};

/** Fluorophore label per channel (matches the hero's vernacular). */
const FLUOR: Record<Domain, string> = {
  game: "mCherry",
  invest: "GFP",
  science: "DAPI",
};

/** Full lens page body for a single domain. */
export function LensView({ domain }: { domain: Domain }) {
  const meta = DOMAINS[domain];
  const entries = byDomain(domain);
  const photo = LENS_PHOTO[domain];

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden border-b border-white/10 pb-7">
        {photo && (
          <BioPhoto
            src={photo.src}
            accent={meta.accent}
            position={photo.position}
            className="absolute -inset-x-5 -top-8 bottom-0 opacity-25 sm:-inset-x-8"
            style={{
              maskImage:
                "linear-gradient(to left, black, transparent 65%)",
            }}
          />
        )}
        <div className="relative pt-1">
          <p
            className="mono text-xs uppercase tracking-[0.3em]"
            style={{ color: meta.accent }}
          >
            // lens · {meta.label.toLowerCase()} · {FLUOR[domain]}
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            {meta.label}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-dim">
            {meta.tagline}
          </p>
          <p className="mono mt-5 text-xs text-ink-faint">
            {entries.length} entr{entries.length === 1 ? "y" : "ies"} on this channel
          </p>
        </div>
      </header>

      <KymographFeed entries={entries} />
    </div>
  );
}
