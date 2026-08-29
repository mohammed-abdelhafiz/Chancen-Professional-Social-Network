"use client";

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/features/auth/types/user";
import { getUserInitials } from "@/lib/utils";
import Image from "next/image";
import { UsersIcon, BriefcaseIcon, CalendarIcon } from "lucide-react";

import React, { useState } from "react";
import { FollowersModal } from "./FollowersModal";

interface Props {
  user: User;
  followersCount?: number;
  followingCount?: number;
}

function getImageUrl(obj: { url?: string; secure_url?: string } | null | undefined): string | undefined {
  if (!obj) return undefined;
  return obj.url || obj.secure_url;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export const ProfileHeader = ({ user, followersCount = 0, followingCount = 0 }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"followers" | "following">("followers");

  const coverUrl = getImageUrl(user.coverPhoto as { url?: string; secure_url?: string });
  const avatarUrl = getImageUrl(user.avatar as { url?: string; secure_url?: string });

  const handleOpenFollowers = (tab: "followers" | "following") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <div className="relative">
      <div className="w-full h-48 relative bg-muted rounded-t-lg overflow-hidden">
        {coverUrl && <Image src={coverUrl} fill alt="cover photo" className="object-cover" />}
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
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <BriefcaseIcon className="size-3" />
              at {user.company}
            </p>
          )}
          {user.bio && (
            <p className="text-sm text-muted-foreground mt-4 whitespace-pre-wrap">{user.bio}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground flex-wrap">
            <button
              onClick={() => handleOpenFollowers("followers")}
              className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              <UsersIcon className="size-4" />
              <span className="underline underline-offset-4">{followersCount.toLocaleString()} followers</span>
            </button>
            <button
              onClick={() => handleOpenFollowers("following")}
              className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              <UsersIcon className="size-4" />
              <span className="underline underline-offset-4">{followingCount.toLocaleString()} following</span>
            </button>
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3" />
              Member since {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <FollowersModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user.id}
        userName={`${user.firstName} ${user.lastName}`}
        initialTab={modalTab}
      />
    </div>
  );
};
