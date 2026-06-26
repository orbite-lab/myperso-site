import { allEntries } from "@/content/entries";
import { FeedFilter } from "@/components/FeedFilter";
import { ProfileHero } from "@/components/ProfileHero";

export default function HomePage() {
  const entries = allEntries();

  return (
    <div className="space-y-12">
      <ProfileHero />
      <section>
        <p className="mono mb-4 text-xs uppercase tracking-[0.3em] text-ink-faint">
          // the feed
        </p>
        <FeedFilter entries={entries} />
      </section>
    </div>
  );
}
