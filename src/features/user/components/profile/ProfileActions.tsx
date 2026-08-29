"use client";

import { Button } from "@/components/ui/button";
import { useFollowUser } from "@/features/network/hooks/useFollowUser";
import { useConnectUser } from "@/features/network/hooks/useConnectUser";
import { useAcceptRequest } from "@/features/network/hooks/useAcceptRequest";
import { useGetConnectionStatus } from "@/features/network/hooks/useGetConnectionStatus";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { User } from "@/features/auth/types/user";
import { useRouter } from "next/navigation";
import {
  UserPlusIcon,
  MessageCircleIcon,
  CheckIcon,
  Edit2Icon,
  Link2Icon,
  ClockIcon,
} from "lucide-react";

interface Props {
  user: User;
  isFollowing?: boolean;
  onEditProfile?: () => void;
}

export const ProfileActions = ({ user, isFollowing = false, onEditProfile }: Props) => {
  const currentUser = useAuthStore((s) => s.user);
  const followMutation = useFollowUser();
  const connectMutation = useConnectUser();
  const acceptMutation = useAcceptRequest();
  const { data: connectionStatus } = useGetConnectionStatus(user.id);
  const router = useRouter();

  const isOwnProfile = currentUser?.id === user.id;

  const handleMessage = () => {
    router.push(`/messaging?user=${user.id}`);
  };

  if (isOwnProfile) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onEditProfile} size="lg">
          <Edit2Icon className="size-4 mr-1" /> Edit Profile
        </Button>
      </div>
    );
  }

  const renderConnectButton = () => {
    const status = connectionStatus?.status;

    if (status === "connected") {
      return (
        <Button
          variant="secondary"
          onClick={() => connectMutation.mutate(user.id)}
          disabled={connectMutation.isPending}
        >
          <CheckIcon className="size-4 mr-1" /> Connected
        </Button>
      );
    }

    if (status === "pending_sent") {
      return (
        <Button
          variant="outline"
          onClick={() => connectMutation.mutate(user.id)}
          disabled={connectMutation.isPending}
          title="Click to cancel connection request"
        >
          <ClockIcon className="size-4 mr-1" /> Pending
        </Button>
      );
    }

    if (status === "pending_received") {
      return (
        <Button
          variant="default"
          onClick={() => acceptMutation.mutate(user.id)}
          disabled={acceptMutation.isPending}
        >
          <CheckIcon className="size-4 mr-1" /> Accept Request
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        onClick={() => connectMutation.mutate(user.id)}
        disabled={connectMutation.isPending}
      >
        <Link2Icon className="size-4 mr-1" />
        {connectMutation.isPending ? "Connecting..." : "Connect"}
      </Button>
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
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
      {renderConnectButton()}
      <Button
        variant="outline"
        onClick={handleMessage}
      >
        <MessageCircleIcon className="size-4 mr-1" /> Message
      </Button>
    </div>
  );
};
