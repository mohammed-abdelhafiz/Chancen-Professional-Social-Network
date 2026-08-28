import api from "@/lib/axios";
import { Conversation, GetMessagesResponse, Message } from "../types/messaging";

export const getConversations = async (): Promise<Conversation[]> => {
  const res = await api.get("/messages/conversations");
  return res.data;
};

export const getOrCreateConversation = async (receiverId: string) => {
  const res = await api.post("/messages/conversations", { receiverId });
  return res.data;
};

export const getMessages = async (
  conversationId: string,
  page = 1,
  limit = 50
): Promise<GetMessagesResponse> => {
  const res = await api.get(
    `/messages/conversations/${conversationId}?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const sendMessage = async (
  conversationId: string,
  content: string
): Promise<Message> => {
  const res = await api.post(`/messages/conversations/${conversationId}`, {
    content,
  });
  return res.data;
};

export const getUnreadCount = async (): Promise<{ unreadCount: number }> => {
  const res = await api.get("/messages/unread");
  return res.data;
};
