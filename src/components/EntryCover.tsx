import { DOMAINS, type Domain } from "@/content/entries/types";
import { hashString, seededRandom } from "@/lib/hash";

/**
 * Deterministic "bio-scan" cover art — looks like a cell sample under a
 * microscope crossed with a game HUD. Seeded by slug so SSR === CSR.
 * If the entry provides a real `image`, the card uses that instead.
 */
export function EntryCover({
  slug,
  domain,
  height = 132,
  className = "",
}: {
  slug: string;
  domain: Domain;
  height?: number;
  className?: string;
}) {
  const accent = DOMAINS[domain].accent;
  const seed = hashString(slug + domain);
  const rand = seededRandom(seed);

  const W = 400;
  const H = 200;

  // Scattered "cells"
  const cells = Array.from({ length: 11 }, () => ({
    cx: rand() * W,
    cy: rand() * H,
    r: 6 + rand() * 26,
    o: 0.12 + rand() * 0.5,
  }));

  // Synapse links between a few cells
  const links = Array.from({ length: 6 }, () => {
    const a = cells[Math.floor(rand() * cells.length)];
    const b = cells[Math.floor(rand() * cells.length)];
    return { x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy };
  });

  // A helix ribbon across the frame
  const helix = Array.from({ length: 14 }, (_, i) => {
    const x = (i / 13) * W;
    const phase = (i / 13) * Math.PI * 4 + rand() * 0.4;
    return { x, y1: H / 2 + Math.sin(phase) * 34, y2: H / 2 - Math.sin(phase) * 34 };
  });

  const gid = `cov-${seed.toString(36)}`;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id={`${gid}-bg`} cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor="#05060a" stopOpacity="0" />
          </radialGradient>
          <filter id={`${gid}-glow`}>
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={W} height={H} fill={`url(#${gid}-bg)`} />

        {/* synapse links */}
        {links.map((l, i) => (
          <line
            key={`l${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={accent}
            strokeOpacity="0.18"
            strokeWidth="0.75"
          />
        ))}

        {/* helix ribbon — kept faint so the cell field reads first */}
        <polyline
          points={helix.map((h) => `${h.x},${h.y1}`).join(" ")}
          fill="none"
          stroke={accent}
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <polyline
          points={helix.map((h) => `${h.x},${h.y2}`).join(" ")}
          fill="none"
          stroke={accent}
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        {/* cells */}
        {cells.map((c, i) => (
          <g key={`c${i}`}>
            <circle
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={accent}
              fillOpacity={c.o * 0.25}
            />
            <circle
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill="none"
              stroke={accent}
              strokeOpacity={c.o}
              strokeWidth="0.9"
            />
            <circle cx={c.cx} cy={c.cy} r={1.6} fill={accent} fillOpacity={c.o + 0.2} />
          </g>
        ))}
      </svg>

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* corner ticks */}
        {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map(
          (pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} h-3 w-3 border-ink-faint/40`}
              style={{
                borderTopWidth: pos.includes("top") ? 1 : 0,
                borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                borderLeftWidth: pos.includes("left") ? 1 : 0,
                borderRightWidth: pos.includes("right") ? 1 : 0,
              }}
            />
          ),
        )}
        <span
          className="mono absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.35em]"
          style={{ color: `${accent}aa` }}
        >
          sample · {seed.toString(16).slice(0, 6)}
        </span>
      </div>

      {/* scanline shimmer */}
      <span
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.18) 3px)",
        }}
      />
    </div>
  );
}
