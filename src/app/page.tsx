import { allEntries } from "@/content/entries";
import { FeedFilter } from "@/components/FeedFilter";

export default function HomePage() {
  const entries = allEntries();

  return (
    <div className="space-y-10">
      <Hero />
      <FeedFilter entries={entries} />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-6">
      <p className="mono mb-4 text-xs uppercase tracking-[0.3em] text-ink-faint">
        // organism · v0.1
      </p>
      <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
        One feed for three obsessions:{" "}
        <span className="bg-gradient-to-r from-game via-invest to-science bg-clip-text text-transparent">
          games, capital, and biology.
        </span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim">
        Everything I build, fund, and grow — logged as a single living stream.
        Filter by lens, or watch the whole organism move at once.
      </p>
    </section>
  );
}
