"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useFollowUser } from "../hooks/useFollowUser";
import { User } from "@/features/auth/types/user";
import { CheckIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  user: User;
  type: "connection" | "follower" | "following";
  isFollowing?: boolean;
}

export const NetworkUserCard = ({ user, type, isFollowing = false }: Props) => {
  const followMutation = useFollowUser();

  if (!user || !user.id) return null;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <Link href={`/profile/${user.id}`}>
        <UserAvatar user={user} size="default" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={`/profile/${user.id}`}
          className="font-semibold text-sm hover:underline line-clamp-1"
        >
          {user.firstName} {user.lastName}
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {user.headline || "No headline"}
        </p>
      </div>
      {type === "connection" && (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          className="rounded-full h-7 px-3 text-xs"
          onClick={() => followMutation.mutate(user.id)}
          disabled={followMutation.isPending}
        >
          {isFollowing ? (
            <>
              <CheckIcon className="size-3.5 mr-1" /> Following
            </>
          ) : (
            <>
              <UserPlusIcon className="size-3.5 mr-1" /> Follow
            </>
          )}
        </Button>
      )}
      {type === "follower" && (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          className="rounded-full h-7 px-3 text-xs"
          onClick={() => followMutation.mutate(user.id)}
          disabled={followMutation.isPending}
        >
          {isFollowing ? (
            <>
              <CheckIcon className="size-3.5 mr-1" /> Following
            </>
          ) : (
            <>
              <UserPlusIcon className="size-3.5 mr-1" /> Follow Back
            </>
          )}
        </Button>
      )}
      {type === "following" && (
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full h-7 px-3 text-xs"
          onClick={() => followMutation.mutate(user.id)}
          disabled={followMutation.isPending}
        >
          <CheckIcon className="size-3.5 mr-1" /> Following
        </Button>
      )}
    </div>
  );
};
