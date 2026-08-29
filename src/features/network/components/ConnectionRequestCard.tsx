"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAcceptRequest } from "../hooks/useAcceptRequest";
import { useRejectRequest } from "../hooks/useRejectRequest";
import { ConnectionRequest } from "../types/network";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  request: ConnectionRequest;
}

export const ConnectionRequestCard = ({ request }: Props) => {
  const acceptMutation = useAcceptRequest();
  const rejectMutation = useRejectRequest();

  if (!request?.sender || !request.sender.id) return null;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <Link href={`/profile/${request.sender.id}`}>
        <UserAvatar user={request.sender} size="default" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={`/profile/${request.sender.id}`}
          className="font-semibold text-sm hover:underline line-clamp-1"
        >
          {request.sender.firstName} {request.sender.lastName}
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {request.sender.headline || "Wants to connect with you"}
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => rejectMutation.mutate(request.senderId)}
          disabled={rejectMutation.isPending}
        >
          <XIcon className="size-4" />
        </Button>
        <Button
          variant="default"
          size="sm"
          className="rounded-full h-7 px-3 text-xs"
          onClick={() => acceptMutation.mutate(request.senderId)}
          disabled={acceptMutation.isPending}
        >
          <CheckIcon className="size-3.5 mr-1" /> Accept
        </Button>
      </div>
    </div>
  );
};
