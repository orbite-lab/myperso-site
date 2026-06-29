"use client";

/**
 * App Router template — remounts on every navigation, so the entrance
 * animation replays on each route change (lightweight route transition).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
