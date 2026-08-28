"use client";

import { useState } from "react";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { MessageCircleIcon } from "lucide-react";

export const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto w-full">
      <div className="border rounded-lg overflow-hidden h-[calc(100vh-140px)] flex">
        <div
          className={`w-full lg:w-80 border-r flex flex-col ${
            selectedConversation ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              onSelect={setSelectedConversation}
              selectedId={selectedConversation || undefined}
            />
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col ${
            selectedConversation ? "flex" : "hidden lg:flex"
          }`}
        >
          {selectedConversation ? (
            <ChatWindow
              conversationId={selectedConversation}
              onBack={() => setSelectedConversation(null)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <MessageCircleIcon className="size-12 mb-4 opacity-50" />
              <p className="text-sm">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
