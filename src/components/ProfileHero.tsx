import { PROFILE } from "@/content/profile";
import { DOMAIN_ORDER, DOMAINS } from "@/content/entries/types";
import { byDomain } from "@/content/entries";
import { SocialLinks, DownloadCV } from "./SocialLinks";
import { AvatarFrame } from "./AvatarFrame";
import { BioPhoto } from "./BioPhoto";

/** Home identity block — styled like a game character-select / bio dossier. */
export function ProfileHero() {
  return (
    <section
      className="hud-frame relative overflow-hidden rounded-[var(--radius-organic)] glass p-6 sm:p-9"
      style={{ ["--accent-rgb" as string]: "20,184,166" } as React.CSSProperties}
    >
      {/* ambient B&W hero photo, duotone, faded right side */}
      <BioPhoto
        src="/hero.jpg"
        accent={DOMAINS.science.accent}
        position="center 20%"
        className="absolute inset-0 opacity-[0.28]"
        style={{
          maskImage:
            "linear-gradient(to left, black, transparent 72%)",
        }}
      />

      {/* ambient accent blooms */}
      <span
        className="absolute -left-16 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: DOMAINS.game.accent }}
        aria-hidden
      />
      <span
        className="absolute -right-24 top-6 h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{ background: DOMAINS.science.accent }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-start">
        {/* Portrait */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <AvatarFrame />
        </div>

        {/* Identity */}
        <div className="min-w-0 flex-1">
          <p className="mono mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-faint">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-invest opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-invest" />
            </span>
            {PROFILE.handle} · online
          </p>

          <h1 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="mt-2 text-base font-medium sm:text-lg">
            <span className="bg-gradient-to-r from-game via-invest to-science bg-clip-text text-transparent">
              {PROFILE.role}
            </span>
          </p>

          <div className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-ink-dim sm:text-base">
            {PROFILE.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Class stat bars — one per lens */}
          <div className="mt-6 space-y-2.5">
            {DOMAIN_ORDER.map((d, i) => {
              const meta = DOMAINS[d];
              const focus = PROFILE.focus[i];
              const count = byDomain(d).length;
              const pct = 55 + i * 14; // flavorful "stat" levels
              return (
                <div key={d} className="flex items-center gap-3">
                  <span
                    className="mono w-16 shrink-0 text-[11px] uppercase tracking-wider"
                    style={{ color: meta.accent }}
                  >
                    {meta.label}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}40)`,
                        boxShadow: `0 0 12px ${meta.accent}80`,
                      }}
                    />
                  </div>
                  <span className="mono hidden w-44 shrink-0 truncate text-[11px] text-ink-faint sm:block">
                    {focus.detail.split(" — ")[0]}
                  </span>
                  <span className="mono w-8 shrink-0 text-right text-[11px] text-ink-faint">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <DownloadCV />
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
