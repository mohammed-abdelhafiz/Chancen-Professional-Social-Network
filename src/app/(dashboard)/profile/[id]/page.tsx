import { ProfilePage } from "@/features/user/components/profile/ProfilePage";

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProfilePage userId={id} />;
}
