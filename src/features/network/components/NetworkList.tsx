"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetConnections } from "../hooks/useGetConnections";
import { useGetFollowers } from "../hooks/useGetFollowers";
import { useGetFollowing } from "../hooks/useGetFollowing";
import { NetworkUserCard } from "./NetworkUserCard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LinkIcon, UsersIcon, UserCheckIcon } from "lucide-react";
import { Connection, Follow, Following } from "../types/network";
import { User } from "@/features/auth/types/user";

import { useAuthStore } from "@/features/auth/store/auth.store";

type Tab = "connections" | "followers" | "following";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "connections", label: "Connections", icon: <LinkIcon className="size-4" /> },
  { id: "followers", label: "Followers", icon: <UsersIcon className="size-4" /> },
  { id: "following", label: "Following", icon: <UserCheckIcon className="size-4" /> },
];

export const NetworkList = () => {
  const [activeTab, setActiveTab] = useState<Tab>("connections");
  const currentUserId = useAuthStore((s) => s.user?.id);
  const { data: connections, isLoading: loadingConnections } = useGetConnections();
  const { data: followers, isLoading: loadingFollowers } = useGetFollowers();
  const { data: following, isLoading: loadingFollowing } = useGetFollowing();

  const followingIds = new Set(following?.map((f: Following) => f.followingId) || []);

  const getList = (): User[] => {
    switch (activeTab) {
      case "connections":
        return (
          connections
            ?.map((c: Connection) => (c.senderId === currentUserId ? c.receiver : c.sender))
            .filter((u): u is User => Boolean(u && u.id)) || []
        );
      case "followers":
        return (
          followers
            ?.map((f: Follow) => f.follower)
            .filter((u): u is User => Boolean(u && u.id)) || []
        );
      case "following":
        return (
          following
            ?.map((f: Following) => f.following)
            .filter((u): u is User => Boolean(u && u.id)) || []
        );
      default:
        return [];
    }
  };

  const list = getList();
  const isLoading =
    (activeTab === "connections" && loadingConnections) ||
    (activeTab === "followers" && loadingFollowers) ||
    (activeTab === "following" && loadingFollowing);

  const getCount = (tab: Tab) => {
    switch (tab) {
      case "connections":
        return connections?.length || 0;
      case "followers":
        return followers?.length || 0;
      case "following":
        return following?.length || 0;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 border-b pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
              <span className="ml-1 text-xs opacity-70">{getCount(tab.id)}</span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                <div className="size-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              {activeTab === "connections" && "No connections yet"}
              {activeTab === "followers" && "No followers yet"}
              {activeTab === "following" && "Not following anyone yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {list.map((user: User) => (
              <NetworkUserCard
                key={user.id}
                user={user}
                type={activeTab === "connections" ? "connection" : activeTab === "followers" ? "follower" : "following"}
                isFollowing={followingIds.has(user.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
