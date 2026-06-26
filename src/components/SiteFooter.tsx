export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-5 pb-10 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
        <span className="mono">
          // organism online · {new Date().getFullYear()}
        </span>
        <span className="mono">
          game<span className="text-game">●</span> invest
          <span className="text-invest">●</span> science
          <span className="text-science">●</span>
        </span>
      </div>
    </footer>
  );
}
