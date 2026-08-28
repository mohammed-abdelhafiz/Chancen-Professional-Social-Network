"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationsApi } from "../services/notifications.api";

export function useGetNotifications() {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => notificationsApi.getNotifications(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}
