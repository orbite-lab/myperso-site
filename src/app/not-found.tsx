import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="mono text-xs uppercase tracking-[0.3em] text-ink-faint">
        // signal lost
      </p>
      <h1 className="text-gradient mt-4 text-7xl font-bold">404</h1>
      <p className="mt-4 max-w-sm text-ink-dim">
        This organism has no such cell. The entry may have been pruned or never
        grew here.
      </p>
      <Link
        href="/"
        className="mono mt-8 rounded-full border border-white/15 px-5 py-2 text-sm text-ink transition-colors hover:bg-white/5"
      >
        ← back to feed
      </Link>
    </div>
  );
}
