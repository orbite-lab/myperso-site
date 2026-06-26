import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allSlugs, getEntry } from "@/content/entries";
import { DOMAINS } from "@/content/entries/types";
import { DomainBadge } from "@/components/DomainBadge";
import { EntryCover } from "@/components/EntryCover";
import { formatDate, stampDate } from "@/lib/format";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return { title: "Not found // myperso" };
  return { title: `${entry.title} // myperso`, description: entry.summary };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const meta = DOMAINS[entry.domain];

  return (
    <article
      className="space-y-8"
      style={{ ["--accent-rgb" as string]: meta.accentSoft } as React.CSSProperties}
    >
      <Link
        href="/"
        className="mono inline-flex items-center gap-1.5 text-xs text-ink-dim transition-colors hover:text-ink"
      >
        ← back to feed
      </Link>

      {/* Header */}
      <header className="hud-frame relative overflow-hidden rounded-[var(--radius-organic)] glass">
        {/* cover banner */}
        <div className="relative">
          {entry.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.image} alt="" className="h-44 w-full object-cover sm:h-56" />
          ) : (
            <EntryCover slug={entry.slug} domain={entry.domain} height={210} />
          )}
          <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0e1220] to-transparent" />
        </div>

        <div className="relative p-8 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <DomainBadge domain={entry.domain} type={entry.type} />
          <time
            className="mono text-xs text-ink-faint"
            dateTime={entry.date}
          >
            {stampDate(entry.date)} · {formatDate(entry.date)}
          </time>
          {entry.state && (
            <span
              className="mono text-xs uppercase tracking-wider"
              style={{ color: meta.accent }}
            >
              ▸ {entry.state}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {entry.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-dim">
          {entry.summary}
        </p>
        </div>
      </header>

      {/* Body */}
      {entry.body && entry.body.length > 0 && (
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink/90">
          {entry.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* Links */}
      {entry.links && entry.links.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {entry.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mono rounded-full border px-4 py-2 text-sm transition-all hover:-translate-y-0.5"
              style={{
                borderColor: `${meta.accent}40`,
                color: meta.accent,
                background: `${meta.accent}10`,
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-6">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="mono rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-ink-faint"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
