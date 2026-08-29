import type { Metadata } from "next";
import { Jobs } from "@/features/jobs/components/Jobs";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export const metadata: Metadata = {
  title: "Jobs & Opportunities",
  description: "Explore tech jobs, remote positions, and apply directly with your Chancen resume.",
};

export default function JobsPage() {
  return (
    <AnimatedPage>
      <Jobs />
    </AnimatedPage>
  );
}
