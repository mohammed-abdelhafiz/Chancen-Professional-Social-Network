"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/features/auth/types/user";
import { getUserInitials } from "@/lib/utils";
import Image from "next/image";

interface Props {
  user: User;
}

function getImageUrl(obj: { url?: string; secure_url?: string } | null | undefined): string | undefined {
  if (!obj) return undefined;
  return obj.url || obj.secure_url;
}

export const ProfileHeader = ({ user }: Props) => {
  const coverUrl = getImageUrl(user.coverPhoto as { url?: string; secure_url?: string }) || "/placeholder-cover-photo.avif";
  const avatarUrl = getImageUrl(user.avatar as { url?: string; secure_url?: string });

  return (
    <div className="relative">
      <div className="w-full h-48 relative bg-muted rounded-t-lg overflow-hidden">
        <Image
          src={coverUrl}
          fill
          alt="cover photo"
          className="object-cover"
        />
      </div>
      <div className="px-6 pb-6">
        <Avatar className="relative -mt-16 size-32 ring-4 ring-card">
          <AvatarImage src={avatarUrl} className="object-cover" />
          <AvatarFallback className="text-2xl">{getUserInitials(user)}</AvatarFallback>
        </Avatar>
        <div className="mt-4 space-y-2">
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          {user.headline && (
            <p className="text-muted-foreground">{user.headline}</p>
          )}
          {user.company && (
            <p className="text-sm text-muted-foreground">at {user.company}</p>
          )}
          {user.bio && (
            <p className="text-sm text-muted-foreground mt-4 whitespace-pre-wrap">{user.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
};
