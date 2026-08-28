"use client";

import { Button } from "@/components/ui/button";
import { useFollowUser } from "@/features/network/hooks/useFollowUser";
import { useConnectUser } from "@/features/network/hooks/useConnectUser";
import { useGetOrCreateConversation } from "@/features/messaging/hooks/useGetOrCreateConversation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { User } from "@/features/auth/types/user";
import { useRouter } from "next/navigation";
import { UserPlusIcon, MessageCircleIcon, CheckIcon } from "lucide-react";

interface Props {
  user: User;
  isFollowing?: boolean;
}

export const ProfileActions = ({ user, isFollowing = false }: Props) => {
  const currentUser = useAuthStore((s) => s.user);
  const followMutation = useFollowUser();
  const connectMutation = useConnectUser();
  const conversationMutation = useGetOrCreateConversation();
  const router = useRouter();

  const isOwnProfile = currentUser?.id === user.id;

  const handleMessage = () => {
    conversationMutation.mutate(user.id, {
      onSuccess: (data) => {
        router.push(`/messaging`);
      },
    });
  };

  if (isOwnProfile) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isFollowing ? "secondary" : "default"}
        onClick={() => followMutation.mutate(user.id)}
        disabled={followMutation.isPending}
      >
        {isFollowing ? (
          <>
            <CheckIcon className="size-4 mr-1" /> Following
          </>
        ) : (
          <>
            <UserPlusIcon className="size-4 mr-1" /> Follow
          </>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={handleMessage}
        disabled={conversationMutation.isPending}
      >
        <MessageCircleIcon className="size-4 mr-1" /> Message
      </Button>
    </div>
  );
};
