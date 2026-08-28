"use client";

import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Message } from "../types/messaging";
import { cn } from "@/lib/utils";

interface Props {
  message: Message;
}

function formatTime(date: string): string {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const MessageBubble = ({ message }: Props) => {
  const currentUser = useAuthStore((s) => s.user);
  const isOwn = message.senderId === currentUser?.id;

  return (
    <div className={cn("flex gap-2 mb-3", isOwn ? "flex-row-reverse" : "")}>
      {!isOwn && (
        <UserAvatar user={message.sender} size="sm" href={`/profile/${message.sender.id}`} />
      )}
      <div className={cn("max-w-[70%]", isOwn ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-3 py-2 rounded-2xl text-sm",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted rounded-bl-md"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <p className={cn("text-xs text-muted-foreground mt-1", isOwn ? "text-right" : "")}>
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
};
