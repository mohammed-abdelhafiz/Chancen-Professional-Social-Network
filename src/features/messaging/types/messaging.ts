import { User } from "@/features/auth/types/user";

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  conversationId: string;
  senderId: string;
  sender: Pick<User, "id" | "firstName" | "lastName" | "avatar">;
}

export interface Conversation {
  id: string;
  otherUser: Pick<User, "id" | "firstName" | "lastName" | "avatar" | "headline">;
  lastMessage: {
    id: string;
    content: string;
    createdAt: string;
    senderId: string;
  } | null;
  updatedAt: string;
}

export interface GetMessagesResponse {
  messages: Message[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
