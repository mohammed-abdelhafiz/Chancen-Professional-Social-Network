"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/users.api";

export function useGetUserPosts(userId: string) {
  return useInfiniteQuery({
    queryKey: ["posts", "user", userId],
    queryFn: ({ pageParam = 1 }) => getUserPosts(userId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: !!userId,
  });
}
