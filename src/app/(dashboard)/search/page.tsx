import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/features/search/components/SearchResults";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Find people, discussions, and jobs across the Chancen network.",
};

export default function SearchPage() {
  return (
    <AnimatedPage>
      <Suspense fallback={<div className="py-12 text-center text-sm text-muted-foreground">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </AnimatedPage>
  );
}
