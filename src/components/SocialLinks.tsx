import { PROFILE } from "@/content/profile";
import { SocialIcon } from "./SocialIcon";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {PROFILE.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-ink"
        >
          <SocialIcon name={s.icon} className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function DownloadCV({ className = "" }: { className?: string }) {
  return (
    <a
      href={PROFILE.cvHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`mono group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${className}`}
      style={{
        borderColor: "rgba(230,236,255,0.25)",
        background:
          "linear-gradient(90deg, rgba(168,85,247,0.15), rgba(20,184,166,0.15), rgba(59,130,246,0.15))",
        color: "#e6ecff",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
      </svg>
      Download CV
    </a>
  );
}
