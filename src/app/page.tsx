import { allEntries } from "@/content/entries";
import { HomeView } from "@/components/HomeView";

export default function HomePage() {
  return <HomeView entries={allEntries()} />;
}
