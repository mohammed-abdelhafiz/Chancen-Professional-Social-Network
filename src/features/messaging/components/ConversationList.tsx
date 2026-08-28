"use client";

import { UserAvatar } from "@/components/shared/UserAvatar";
import { useGetConversations } from "../hooks/useGetConversations";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Conversation } from "../types/messaging";
import { cn } from "@/lib/utils";

interface Props {
  onSelect: (conversationId: string) => void;
  selectedId?: string;
}

function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}h`;
  if (diffDay < 7) return `${diffDay}d`;
  return past.toLocaleDateString();
}

export const ConversationList = ({ onSelect, selectedId }: Props) => {
  const { data: conversations, isLoading } = useGetConversations();
  const currentUser = useAuthStore((s) => s.user);

  if (isLoading) {
    return (
      <div className="space-y-1 p-2">
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
    );
  }

  if (!conversations?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs mt-1">Start a conversation from a user's profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-0.5 p-2">
      {conversations.map((conv: Conversation) => {
        const isOwnLastMessage = conv.lastMessage?.senderId === currentUser?.id;
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
              selectedId === conv.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted/50"
            )}
          >
            <UserAvatar user={conv.otherUser} size="default" href={`/profile/${conv.otherUser.id}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm truncate">
                  {conv.otherUser.firstName} {conv.otherUser.lastName}
                </p>
                {conv.lastMessage && (
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {timeAgo(conv.lastMessage.createdAt)}
                  </span>
                )}
              </div>
              {conv.lastMessage && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {isOwnLastMessage && "You: "}
                  {conv.lastMessage.content}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
