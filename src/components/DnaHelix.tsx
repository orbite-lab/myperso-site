/**
 * Animated vertical DNA double-helix. Pure CSS/SVG, decorative.
 * Tri-color (game/invest/science) rungs to literally bind the three lenses.
 */
const ACCENTS = ["#a855f7", "#14b8a6", "#3b82f6"];

export function DnaHelix({
  className = "",
  rungs = 16,
}: {
  className?: string;
  rungs?: number;
}) {
  const H = 320;
  const stepsY = H / rungs;

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox="0 0 100 320" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="helix-strand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* rungs (the "base pairs") */}
        {Array.from({ length: rungs }).map((_, i) => {
          const y = i * stepsY + stepsY / 2;
          const phase = (i / rungs) * Math.PI * 4;
          const x1 = 50 + Math.sin(phase) * 34;
          const x2 = 50 - Math.sin(phase) * 34;
          const depth = (Math.cos(phase) + 1) / 2; // 0..1 front/back
          const color = ACCENTS[i % 3];
          return (
            <g key={i} style={{ opacity: 0.35 + depth * 0.65 }}>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke={color}
                strokeWidth={0.8 + depth * 1.2}
                strokeOpacity={0.5}
              />
              <circle cx={x1} cy={y} r={1.8 + depth * 2.2} fill={color}>
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="3s"
                  begin={`${i * 0.12}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={x2} cy={y} r={1.8 + (1 - depth) * 2.2} fill={color} fillOpacity={0.7} />
            </g>
          );
        })}

        {/* the two sugar-phosphate backbones */}
        <path
          d={backbonePath(0)}
          fill="none"
          stroke="url(#helix-strand)"
          strokeWidth="1.4"
          strokeOpacity="0.8"
        />
        <path
          d={backbonePath(Math.PI)}
          fill="none"
          stroke="url(#helix-strand)"
          strokeWidth="1.4"
          strokeOpacity="0.45"
        />
      </svg>
    </div>
  );
}

function backbonePath(offset: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const y = (i / 64) * 320;
    const x = 50 + Math.sin((i / 64) * Math.PI * 4 + offset) * 34;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
