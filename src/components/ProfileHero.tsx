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
        className="absolute inset-0 opacity-[0.4]"
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
            <span className="text-gradient">{PROFILE.role}</span>
          </p>

          <div className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-ink-dim sm:text-base">
            {PROFILE.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Lenses — what each domain is, + how many entries live in it */}
          <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {DOMAIN_ORDER.map((d, i) => {
              const meta = DOMAINS[d];
              const focus = PROFILE.focus[i];
              const count = byDomain(d).length;
              return (
                <div
                  key={d}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="mono flex items-center gap-1.5 text-[11px] uppercase tracking-wider"
                      style={{ color: meta.accent }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: meta.accent,
                          boxShadow: `0 0 8px ${meta.accent}`,
                        }}
                      />
                      {meta.label}
                    </span>
                    <span className="mono text-[11px] text-ink-faint">
                      {count} entr{count === 1 ? "y" : "ies"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-ink-dim">
                    {focus.detail}
                  </p>
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
