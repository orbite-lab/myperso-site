/**
 * Domain-tinted duotone photo treatment. Uses a CSS background-image (not
 * <img>) so a missing file degrades to a clean tinted panel instead of a
 * broken-image icon. Layers: grayscale base → accent "color" blend →
 * accent highlight glow → grain → scanlines.
 */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function BioPhoto({
  src,
  accent,
  className = "",
  intensity = 1,
  position = "center",
  scan = false,
  style,
}: {
  src: string;
  accent: string;
  className?: string;
  /** 0 = subtle, 1 = full duotone */
  intensity?: number;
  position?: string;
  /** add a hover scan-sweep */
  scan?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`group/photo relative overflow-hidden ${className}`}
      style={style}
      aria-hidden
    >
      {/* grayscale base */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: position,
          filter: `grayscale(1) contrast(${1 + 0.15 * intensity}) brightness(${1 - 0.1 * intensity})`,
        }}
      />
      {/* duotone shadow */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #05060a, transparent 60%)",
          mixBlendMode: "multiply",
          opacity: intensity,
        }}
      />
      {/* accent hue mapped onto midtones */}
      <div
        className="absolute inset-0"
        style={{
          background: accent,
          mixBlendMode: "color",
          opacity: 0.55 * intensity,
        }}
      />
      {/* accent highlight bloom */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 72% 28%, ${accent}55, transparent 70%)`,
          mixBlendMode: "screen",
          opacity: intensity,
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          opacity: 0.12 * intensity,
          mixBlendMode: "overlay",
        }}
      />
      {/* scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(0,0,0,0.22) 3px)",
          opacity: 0.35 * intensity,
        }}
      />
      {/* hover scan sweep */}
      {scan && (
        <div
          className="absolute inset-x-0 top-0 h-1/3 -translate-y-full opacity-0 transition-all duration-700 group-hover/photo:translate-y-[300%] group-hover/photo:opacity-100"
          style={{
            background: `linear-gradient(to bottom, ${accent}40, transparent)`,
          }}
        />
      )}
    </div>
  );
}
