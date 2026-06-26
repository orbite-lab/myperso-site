import { DOMAINS, TYPE_LABELS, type Domain, type EntryType } from "@/content/entries/types";

export function DomainBadge({
  domain,
  type,
}: {
  domain: Domain;
  type?: EntryType;
}) {
  const meta = DOMAINS[domain];
  return (
    <span
      className="mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-wider"
      style={{
        color: meta.accent,
        borderColor: `${meta.accent}40`,
        background: `${meta.accent}12`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: meta.accent,
          boxShadow: `0 0 8px ${meta.accent}`,
        }}
      />
      {meta.label}
      {type && (
        <span className="text-ink-faint normal-case tracking-normal">
          / {TYPE_LABELS[type]}
        </span>
      )}
    </span>
  );
}
