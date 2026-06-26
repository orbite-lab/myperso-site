/** Format an ISO date (YYYY-MM-DD) as e.g. "May 18, 2026". */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Compact "2026.05.18" stamp for the HUD/mono labels. */
export function stampDate(iso: string): string {
  return iso.replace(/-/g, ".");
}
