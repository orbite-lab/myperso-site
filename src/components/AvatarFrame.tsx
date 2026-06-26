/**
 * Hexagonal "bio-scan" portrait frame: a game-character-select meets
 * microscope-slide treatment. Uses /avatar.jpg when present; otherwise
 * falls back to an "RB" monogram so it always looks intentional.
 */
export function AvatarFrame({
  src = "/avatar.jpg",
  initials = "RB",
  size = 168,
}: {
  src?: string;
  initials?: string;
  size?: number;
}) {
  const hexClip =
    "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden={false}
    >
      {/* rotating reticle ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="#14b8a6"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          strokeDasharray="3 6"
        />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="#a855f7"
          strokeOpacity="0.4"
          strokeWidth="0.6"
          strokeDasharray="1 14"
        />
      </svg>

      {/* glow */}
      <span
        className="absolute inset-3 blur-xl"
        style={{
          background:
            "conic-gradient(from 0deg, #a855f7, #14b8a6, #3b82f6, #a855f7)",
          opacity: 0.35,
          clipPath: hexClip,
        }}
      />

      {/* hex portrait */}
      <div
        className="absolute inset-2 overflow-hidden bg-membrane"
        style={{ clipPath: hexClip }}
      >
        {/* fallback monogram layer (shown if image fails / absent) */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#141a2e] to-[#0a0d16]">
          <span className="mono text-4xl font-bold tracking-tight text-ink/80">
            {initials}
          </span>
          <span
            className="mono absolute bottom-3 text-[8px] uppercase tracking-[0.3em] text-ink-faint"
          >
            no-signal
          </span>
        </div>
        {/* portrait image sits on top when it loads */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Portrait of Romain Bodinier"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: hexClip }}
        />
        {/* scan sweep */}
        <span
          className="absolute inset-x-0 top-0 h-1/3 animate-[scanY_3.5s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,184,166,0.35), transparent)",
          }}
        />
        {/* grid tint */}
        <span
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,0,0,0.25) 3px)",
          }}
        />
      </div>

      {/* HUD readout */}
      <span className="mono absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-void/80 px-2 py-0.5 text-[9px] uppercase tracking-widest text-invest">
        ● specimen · live
      </span>
    </div>
  );
}
