"use client";

import { UserAvatar } from "@/components/shared/UserAvatar";
import { useGetMessages } from "../hooks/useGetMessages";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { useEffect, useRef } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  conversationId: string;
  onBack: () => void;
}

export const ChatWindow = ({ conversationId, onBack }: Props) => {
  const { data, isLoading } = useGetMessages(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  const messages = data?.messages || [];

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon-sm" onClick={onBack} className="lg:hidden">
          <ArrowLeftIcon className="size-4" />
        </Button>
        {messages.length > 0 && (
          <>
            <UserAvatar user={messages[0].sender} size="sm" href={`/profile/${messages[0].sender.id}`} />
            <div>
              <p className="font-semibold text-sm">
                {messages[0].sender.firstName} {messages[0].sender.lastName}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <MessageInput conversationId={conversationId} />
    </div>
  );
};
