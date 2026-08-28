"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getUserInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function getImageUrl(obj: { url?: string; secure_url?: string } | null | undefined): string | undefined {
  if (!obj) return undefined;
  return obj.url || obj.secure_url;
}

export const UserCard = () => {
  const user = useAuthStore((s) => s.user);
  const coverUrl = getImageUrl(user?.coverPhoto as { url?: string; secure_url?: string }) || "/placeholder-cover-photo.avif";
  const avatarUrl = getImageUrl(user?.avatar as { url?: string; secure_url?: string });
  return (
    <Card className="w-full lg:w-64 xl:w-72 shrink-0 p-0 overflow-hidden h-fit lg:sticky lg:top-6">
      <CardHeader className="p-0 border-0">
        <div className="w-full h-24 relative bg-muted">
          <Image
            src={coverUrl}
            fill
            alt="cover photo"
            className="object-cover"
          />
          <Link href={`/profile/${user?.id}`} className="absolute -bottom-6 left-4">
            <Avatar className="ring-4 ring-card" size="lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-8 pb-5 px-4 space-y-1">
        <Link href={`/profile/${user?.id}`} className="hover:underline">
          <p className="font-semibold text-base">
            {user?.firstName} {user?.lastName}
          </p>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{user?.headline || "Welcome to Chancen"}</p>
      </CardContent>
    </Card>
  );
};
