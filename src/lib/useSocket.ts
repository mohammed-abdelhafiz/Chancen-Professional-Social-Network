"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/features/auth/store/auth.store";

const SOCKET_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const user = useAuthStore((s) => s.user);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const socket = io(SOCKET_URL, {
      auth: { userId: user.id },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [user?.id]);

  const joinConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("joinConversation", conversationId);
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("leaveConversation", conversationId);
  }, []);

  const sendMessage = useCallback((conversationId: string, content: string) => {
    return new Promise<any>((resolve) => {
      if (!socketRef.current?.connected) {
        resolve(null);
        return;
      }
      socketRef.current.emit("sendMessage", { conversationId, content }, (response: any) => {
        resolve(response);
      });
    });
  }, []);

  const onNewMessage = useCallback((callback: (message: any) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => {};

    socket.on("newMessage", callback);
    return () => {
      socket.off("newMessage", callback);
    };
  }, [isConnected]);

  const onNotification = useCallback((callback: (notification: any) => void) => {
    const socket = socketRef.current;
    if (!socket) return () => {};

    socket.on("notification", callback);
    return () => {
      socket.off("notification", callback);
    };
  }, [isConnected]);

  return {
    socket: socketRef.current,
    isConnected,
    joinConversation,
    leaveConversation,
    sendMessage,
    onNewMessage,
    onNotification,
  };
}
