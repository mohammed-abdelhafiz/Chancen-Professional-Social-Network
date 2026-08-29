"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useGetOrCreateConversation } from "../hooks/useGetOrCreateConversation";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const getOrCreateConversation = useGetOrCreateConversation();

  useEffect(() => {
    const conversationId = searchParams.get("conversation");
    if (conversationId) setSelectedConversation(conversationId);
    const userId = searchParams.get("user");
    if (!userId) return;

    getOrCreateConversation.mutate(userId, {
      onSuccess: (conversation) => {
        setSelectedConversation(conversation.id);
        window.history.replaceState(null, "", `/messaging?conversation=${conversation.id}`);
      },
      onError: (error: any) => {
        const message = (error as AxiosError<{ message?: string | string[] }>)?.response?.data?.message;
        toast.error(
          Array.isArray(message) ? message.join(", ") : message || "Unable to start this conversation. Please try again."
        );
      },
    });
  // The URL parameters are the source of truth for chats opened from a profile.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 px-4 max-w-6xl mx-auto w-full"
    >
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex flex-col items-center justify-center text-muted-foreground"
            >
              <MessageCircleIcon className="size-12 mb-4 opacity-50" />
              <p className="text-sm">Select a conversation to start messaging</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
