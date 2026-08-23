import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { User } from "@/features/auth/types/user";

interface props {
  user: User | null;
  size: "default" | "lg" | "sm";
}

export const UserAvatar = ({ user, size }: props) => {
  return (
    <Avatar size={size}>
      <AvatarImage src={user?.avatar?.secure_url} />
      <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
    </Avatar>
  );
};
