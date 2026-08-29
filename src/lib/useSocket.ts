"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/features/auth/store/auth.store";

const SOCKET_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/api\/?$/, "");

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const user = useAuthStore((s) => s.user);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const joinedRoomsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!user?.id) return;

    const newSocket = io(SOCKET_URL, {
      auth: { userId: user.id },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      const rooms = joinedRoomsRef.current;
      for (const room of rooms) {
        newSocket.emit("joinConversation", room);
      }
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      const rooms = joinedRoomsRef.current;
      rooms.clear();
      newSocket.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    };
  }, [user?.id]);

  const joinConversation = useCallback((conversationId: string) => {
    joinedRoomsRef.current.add(conversationId);
    if (socketRef.current?.connected) {
      socketRef.current.emit("joinConversation", conversationId);
    }
  }, []);

  const leaveConversation = useCallback((conversationId: string) => {
    joinedRoomsRef.current.delete(conversationId);
    if (socketRef.current?.connected) {
      socketRef.current.emit("leaveConversation", conversationId);
    }
  }, []);

  const sendMessage = useCallback(
    (conversationId: string, content: string) => {
      return new Promise<{ id: string; content: string } | null>((resolve) => {
        if (!socketRef.current?.connected) {
          resolve(null);
          return;
        }
        socketRef.current.emit(
          "sendMessage",
          { conversationId, content },
          (response: { id: string; content: string } | null) => {
            resolve(response);
          },
        );
      });
    },
    [],
  );

  const onNewMessage = useCallback(
    (callback: (message: Record<string, unknown>) => void) => {
      const sock = socketRef.current;
      if (!sock) return () => {};

      sock.on("newMessage", callback);
      return () => {
        sock.off("newMessage", callback);
      };
    },
    [],
  );

  const onNotification = useCallback(
    (callback: (notification: Record<string, unknown>) => void) => {
      const sock = socketRef.current;
      if (!sock) return () => {};

      sock.on("notification", callback);
      return () => {
        sock.off("notification", callback);
      };
    },
    [],
  );

  return {
    socket,
    isConnected,
    joinConversation,
    leaveConversation,
    sendMessage,
    onNewMessage,
    onNotification,
  };
}
