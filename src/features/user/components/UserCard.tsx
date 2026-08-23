"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getUserInitials } from "@/lib/utils";
import Image from "next/image";

export const UserCard = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <Card className="w-full lg:w-64 pt-1 gap-7 h-fit">
      <CardHeader className="px-1">
        <div className="w-full h-28 relative">
          <Image
            src={
              user?.coverPhoto?.secure_url || "/placeholder-cover-photo.avif"
            }
            fill
            alt="cover photo"
            className="rounded"
          />
          <Avatar className="absolute -bottom-5 left-3" size="lg">
            <AvatarImage src={user?.avatar?.secure_url} />
            <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-lg">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-muted-foreground">{user?.headline}</p>
      </CardContent>
    </Card>
  );
};
