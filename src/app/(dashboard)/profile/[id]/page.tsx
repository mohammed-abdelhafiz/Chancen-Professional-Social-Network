import { ProfilePage } from "@/features/user/components/profile/ProfilePage";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AnimatedPage>
      <ProfilePage userId={id} />
    </AnimatedPage>
  );
}
