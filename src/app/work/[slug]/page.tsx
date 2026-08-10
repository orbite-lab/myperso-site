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
  if (!entry) return { title: "Not found // orbite.lab" };
  return { title: `${entry.title} // orbite.lab`, description: entry.summary };
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

      {/* Header — open, sharp-framed cover (corner ticks), no glass box */}
      <header>
        <div className="relative overflow-hidden">
          {entry.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.image} alt="" className="h-44 w-full object-cover sm:h-56" />
          ) : (
            <EntryCover slug={entry.slug} domain={entry.domain} height={210} />
          )}
          <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent" />
          {[
            "left-0 top-0 border-l border-t",
            "right-0 top-0 border-r border-t",
            "left-0 bottom-0 border-l border-b",
            "right-0 bottom-0 border-r border-b",
          ].map((c, i) => (
            <span key={i} className={`absolute ${c} h-4 w-4 border-white/35`} aria-hidden />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <DomainBadge domain={entry.domain} type={entry.type} />
          <time className="mono text-xs text-ink-faint" dateTime={entry.date}>
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

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
          {entry.title}
        </h1>
        <p className="mt-3 max-w-2xl border-l-2 pl-4 text-lg leading-relaxed text-ink-dim"
          style={{ borderColor: `${meta.accent}66` }}>
          {entry.summary}
        </p>
      </header>

      {/* Body */}
      {entry.body && entry.body.length > 0 && (
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink/90">
          {entry.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* Links — bracketed mono actions, not pills */}
      {entry.links && entry.links.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {entry.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mono inline-flex items-center gap-1.5 border-b pb-0.5 text-sm transition-colors"
              style={{ color: meta.accent, borderColor: `${meta.accent}55` }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/10 pt-6">
          {entry.tags.map((tag) => (
            <span key={tag} className="mono text-[11px] text-ink-faint">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
