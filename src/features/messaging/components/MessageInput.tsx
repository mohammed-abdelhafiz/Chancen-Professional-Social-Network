"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "../hooks/useSendMessage";
import { useState } from "react";
import { SendIcon } from "lucide-react";

interface Props {
  conversationId: string;
}

export const MessageInput = ({ conversationId }: Props) => {
  const [content, setContent] = useState("");
  const sendMessageMutation = useSendMessage(conversationId);

  const handleSend = () => {
    if (!content.trim()) return;
    sendMessageMutation.mutate(content.trim(), {
      onSuccess: () => setContent(""),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t">
      <Input
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button
        size="icon"
        onClick={handleSend}
        disabled={!content.trim() || sendMessageMutation.isPending}
      >
        <SendIcon className="size-4" />
      </Button>
    </div>
  );
};
