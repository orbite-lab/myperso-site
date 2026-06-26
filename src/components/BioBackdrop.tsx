import { DnaHelix } from "./DnaHelix";

/** Ambient, non-interactive backdrop: gradient membrane, hex grid, drifting
 *  cells, and a faint floating DNA strand. */
export function BioBackdrop() {
  return (
    <>
      <div className="bio-backdrop" aria-hidden />
      <div className="hex-field" aria-hidden />

      {/* faint side helix, desktop only */}
      <div
        className="animate-float fixed right-[3%] top-[14%] hidden h-[340px] w-[90px] opacity-[0.13] lg:block"
        aria-hidden
        style={{ zIndex: -1 }}
      >
        <DnaHelix rungs={18} />
      </div>

      <div
        className="cell"
        aria-hidden
        style={{
          top: "8%",
          left: "-4%",
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5), transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="cell"
        aria-hidden
        style={{
          top: "55%",
          right: "-6%",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(20,184,166,0.4), transparent 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="cell"
        aria-hidden
        style={{
          bottom: "-8%",
          left: "35%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.45), transparent 70%)",
          animationDelay: "-12s",
        }}
      />
    </>
  );
}
