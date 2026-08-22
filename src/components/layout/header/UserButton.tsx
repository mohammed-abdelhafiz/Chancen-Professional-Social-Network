"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { SettingsModal } from "@/features/settings/components/SettingsModal";
import Link from "next/link";
import { useState } from "react";

export const UserButton = () => {
  const user = useAuthStore((s) => s.user);
  const logoutMutation = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
      : user?.firstName
        ? user.firstName[0].toUpperCase()
        : "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.avatar?.secure_url} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-destructive hover:text-destructive/80!"
              onClick={handleLogout}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
