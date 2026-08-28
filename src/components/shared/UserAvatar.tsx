import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { User } from "@/features/auth/types/user";
import Link from "next/link";

interface Props {
  user: User | { id?: string; firstName: string; lastName: string; avatar?: { url?: string; secure_url?: string; publicId?: string } | null } | null;
  size: "default" | "lg" | "sm";
  href?: string;
}

function getAvatarSrc(user: Props["user"]): string | undefined {
  if (!user?.avatar) return undefined;
  const avatar = user.avatar as { url?: string; secure_url?: string };
  return avatar.url || avatar.secure_url;
}

export const UserAvatar = ({ user, size, href }: Props) => {
  const avatar = (
    <Avatar size={size}>
      <AvatarImage src={getAvatarSrc(user)} alt={user ? `${(user as User).firstName} ${(user as User).lastName}` : "User"} />
      <AvatarFallback>{getUserInitials(user as User | null)}</AvatarFallback>
    </Avatar>
  );

  if (href && user && "id" in user && user.id) {
    return (
      <Link href={href} className="shrink-0">
        {avatar}
      </Link>
    );
  }

  return avatar;
};
