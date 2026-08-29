import { JobDetail } from "@/features/jobs/components/JobDetail";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AnimatedPage>
      <JobDetail jobId={id} />
    </AnimatedPage>
  );
}
