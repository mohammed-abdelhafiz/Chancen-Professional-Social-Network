"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, UserCheck, Search, X, Loader2, UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useGetUserFollowers, useGetUserFollowing } from "../../hooks/useGetUserConnections";
import { useFollowUser } from "@/features/network/hooks/useFollowUser";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { User } from "@/features/auth/types/user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  initialTab?: "followers" | "following";
}

export const FollowersModal = ({
  isOpen,
  onClose,
  userId,
  userName,
  initialTab = "followers",
}: Props) => {
  const [activeTab, setActiveTab] = useState<"followers" | "following">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserId = useAuthStore((s) => s.user?.id);
  const followMutation = useFollowUser();

  const { data: followers, isLoading: loadingFollowers } = useGetUserFollowers(
    userId,
    isOpen && activeTab === "followers"
  );
  const { data: following, isLoading: loadingFollowing } = useGetUserFollowing(
    userId,
    isOpen && activeTab === "following"
  );

  const isLoading = activeTab === "followers" ? loadingFollowers : loadingFollowing;

  // Followers return follow.follower, Following returns follow.following
  const rawList: User[] = (
    activeTab === "followers"
      ? (followers || []).map((f: any) => f.follower)
      : (following || []).map((f: any) => f.following)
  ).filter(Boolean);

  const filteredList = rawList.filter((user) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const headline = (user.headline || "").toLowerCase();
    return fullName.includes(q) || headline.includes(q);
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl gap-0 border-border/80">
        <DialogHeader className="p-4 pb-2 border-b border-border/40">
          <DialogTitle className="text-base font-semibold">
            {userName}&rsquo;s Network
          </DialogTitle>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => setActiveTab("followers")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "followers"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Users className="size-3.5" />
              Followers ({followers?.length ?? "..."})
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "following"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <UserCheck className="size-3.5" />
              Following ({following?.length ?? "..."})
            </button>
          </div>
        </DialogHeader>

        {/* Search within list */}
        <div className="p-3 border-b border-border/40 bg-muted/20">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* User list */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-border/30">
          {isLoading ? (
            <div className="py-8 text-center space-y-2">
              <Loader2 className="size-6 animate-spin text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">Loading {activeTab}...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground px-4">
              <p className="text-xs font-medium">
                {searchQuery ? "No matches found" : `No ${activeTab} yet`}
              </p>
              {searchQuery && (
                <p className="text-[11px] mt-1">Try a different name or title</p>
              )}
            </div>
          ) : (
            filteredList.map((targetUser) => {
              const isSelf = targetUser.id === currentUserId;

              return (
                <div
                  key={targetUser.id}
                  className="flex items-center justify-between gap-3 p-2.5 hover:bg-muted/40 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <UserAvatar
                      user={targetUser}
                      size="default"
                      href={`/profile/${targetUser.id}`}
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/profile/${targetUser.id}`}
                        onClick={onClose}
                        className="font-semibold text-xs text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {targetUser.firstName} {targetUser.lastName}
                      </Link>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {targetUser.headline || "Chancen member"}
                      </p>
                    </div>
                  </div>

                  {!isSelf && (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => followMutation.mutate(targetUser.id)}
                      disabled={followMutation.isPending}
                      className="rounded-full text-xs shrink-0 h-6 px-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <UserPlus className="size-3 mr-1" />
                      Follow
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
