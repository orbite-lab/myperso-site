/**
 * Ambient backdrop — deliberately quiet. Just the fluorescence bloom on
 * specimen-black (the single imaging-grain layer lives on <body>). All the
 * old clutter (hex grid, drifting cells, floating helix) has been cut so the
 * confocal hero can be the one signature element.
 */
export function BioBackdrop() {
  return <div className="bio-backdrop" aria-hidden />;
}
