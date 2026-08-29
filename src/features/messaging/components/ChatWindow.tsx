"use client";

import { UserAvatar } from "@/components/shared/UserAvatar";
import { useGetMessages } from "../hooks/useGetMessages";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/lib/useSocket";
import { Message } from "../types/messaging";

interface Props {
  conversationId: string;
  onBack: () => void;
}

export const ChatWindow = ({ conversationId, onBack }: Props) => {
  const { data, isLoading } = useGetMessages(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { joinConversation, leaveConversation, socket } = useSocket();
  const conversationIdRef = useRef(conversationId);

  // Keep ref in sync inside an effect, not during render
  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);

  // Initialise messages from query data without a derived-state effect:
  // use the query result directly as initial state and append only socket messages
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.messages]);

  useEffect(() => {
    joinConversation(conversationId);
    return () => {
      leaveConversation(conversationId);
    };
  }, [conversationId, joinConversation, leaveConversation]);

  useEffect(() => {
    if (!socket) return;

    const handler = (message: Message) => {
      if (message.conversationId === conversationIdRef.current) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    };

    socket.on("newMessage", handler);
    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  const firstSender = messages.length > 0 ? messages[0].sender : null;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon-sm" onClick={onBack} className="lg:hidden">
          <ArrowLeftIcon className="size-4" />
        </Button>
        {firstSender && (
          <>
            <UserAvatar user={firstSender} size="sm" href={`/profile/${firstSender.id}`} />
            <div>
              <p className="font-semibold text-sm">
                {firstSender.firstName} {firstSender.lastName}
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
