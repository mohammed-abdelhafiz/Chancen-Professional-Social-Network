"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/features/auth/store/auth.store";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user?.id) return;

    const socket = io(SOCKET_URL, {
      auth: { userId: user.id },
      withCredentials: true,
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?.id]);

  const joinConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("joinConversation", conversationId);
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("leaveConversation", conversationId);
  }, []);

  const sendMessage = useCallback((conversationId: string, content: string) => {
    return new Promise((resolve) => {
      socketRef.current?.emit("sendMessage", { conversationId, content }, (response: any) => {
        resolve(response);
      });
    });
  }, []);

  const onNewMessage = useCallback((callback: (message: any) => void) => {
    socketRef.current?.on("newMessage", callback);
    return () => {
      socketRef.current?.off("newMessage", callback);
    };
  }, []);

  const onNotification = useCallback((callback: (notification: any) => void) => {
    socketRef.current?.on("notification", callback);
    return () => {
      socketRef.current?.off("notification", callback);
    };
  }, []);

  return {
    socket: socketRef.current,
    joinConversation,
    leaveConversation,
    sendMessage,
    onNewMessage,
    onNotification,
  };
}
