"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "../services/users.api";

export function useGetUserStats(userId: string) {
  return useQuery({
    queryKey: ["userStats", userId],
    queryFn: () => getUserStats(userId),
    enabled: !!userId,
    staleTime: 30000,
  });
}
