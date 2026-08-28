"use client";

import { useGetUser } from "../../hooks/useGetUser";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileActions } from "./ProfileActions";
import { useGetFollowing } from "@/features/network/hooks/useGetFollowing";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  userId: string;
}

export const ProfilePage = ({ userId }: Props) => {
  const { data: user, isLoading } = useGetUser(userId);
  const { data: following } = useGetFollowing();
  const currentUser = useAuthStore((s) => s.user);

  if (isLoading) {
    return (
      <div className="py-6 px-4 max-w-3xl mx-auto w-full">
        <Card className="overflow-hidden">
          <div className="h-48 w-full bg-muted animate-pulse" />
          <CardContent className="p-6">
            <div className="size-32 rounded-full bg-muted animate-pulse -mt-24" />
            <div className="h-8 w-48 bg-muted animate-pulse mt-4 rounded" />
            <div className="h-4 w-64 bg-muted animate-pulse mt-2 rounded" />
            <div className="h-4 w-48 bg-muted animate-pulse mt-2 rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-6 px-4 max-w-3xl mx-auto w-full">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">User not found</p>
        </div>
      </div>
    );
  }

  const isFollowing = following?.some((f: any) => f.followingId === userId);

  return (
    <div className="py-6 px-4 max-w-3xl mx-auto w-full">
      <Card className="overflow-hidden">
        <ProfileHeader user={user} />
        <div className="px-6 pb-6">
          <ProfileActions user={user} isFollowing={isFollowing} />
        </div>
      </Card>
    </div>
  );
};
