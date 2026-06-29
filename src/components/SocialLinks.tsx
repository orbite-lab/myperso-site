import { PROFILE } from "@/content/profile";
import { SocialIcon } from "./SocialIcon";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {PROFILE.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className="text-ink-faint transition-colors hover:text-ink"
        >
          <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}

/** Bracketed mono action — reads like an instrument command, not a pill. */
export function DownloadCV({ className = "" }: { className?: string }) {
  return (
    <a
      href={PROFILE.cvHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`mono group inline-flex items-center gap-2 border-b border-white/25 pb-0.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-bone hover:text-bone ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
      </svg>
      download cv
    </a>
  );
}
