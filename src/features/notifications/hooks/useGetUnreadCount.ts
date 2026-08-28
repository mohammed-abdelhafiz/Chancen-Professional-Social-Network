"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsApi } from "../services/notifications.api";

export function useGetUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: notificationsApi.getUnreadCount,
    refetchInterval: 30000,
  });
}
