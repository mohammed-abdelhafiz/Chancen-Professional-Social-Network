import type { Metadata } from "next";
import { Bookmarks } from "@/features/bookmarks/components/Bookmarks";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export const metadata: Metadata = {
  title: "Saved Posts & Bookmarks",
  description: "Quickly access your saved articles, insights, and job posts on Chancen.",
};

export default function BookmarksPage() {
  return (
    <AnimatedPage>
      <Bookmarks />
    </AnimatedPage>
  );
}
