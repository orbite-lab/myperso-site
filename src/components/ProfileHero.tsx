import { PROFILE } from "@/content/profile";
import { DOMAIN_ORDER, DOMAINS } from "@/content/entries/types";
import { SocialLinks, DownloadCV } from "./SocialLinks";

/** Home identity / mini-CV block. */
export function ProfileHero() {
  return (
    <section className="relative overflow-hidden rounded-[var(--radius-organic)] glass p-7 sm:p-9">
      {/* ambient accent blooms */}
      <span
        className="absolute -left-16 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: DOMAINS.game.accent }}
        aria-hidden
      />
      <span
        className="absolute -right-20 top-10 h-56 w-56 rounded-full opacity-25 blur-3xl"
        style={{ background: DOMAINS.science.accent }}
        aria-hidden
      />

      <div className="relative">
        <p className="mono mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-faint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-invest opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-invest" />
          </span>
          {PROFILE.handle} · online
        </p>

        <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          {PROFILE.name}
        </h1>
        <p className="mt-3 text-lg font-medium">
          <span className="bg-gradient-to-r from-game via-invest to-science bg-clip-text text-transparent">
            {PROFILE.role}
          </span>
        </p>

        <div className="mt-4 max-w-2xl space-y-2 text-base leading-relaxed text-ink-dim">
          {PROFILE.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Focus grid — mini-CV, mapped to lenses */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {DOMAIN_ORDER.map((d, i) => {
            const meta = DOMAINS[d];
            const focus = PROFILE.focus[i];
            return (
              <div
                key={d}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5"
              >
                <p
                  className="mono flex items-center gap-1.5 text-[11px] uppercase tracking-wider"
                  style={{ color: meta.accent }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }}
                  />
                  {focus.label}
                </p>
                <p className="mt-1.5 text-sm text-ink-dim">{focus.detail}</p>
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
    </section>
  );
}
