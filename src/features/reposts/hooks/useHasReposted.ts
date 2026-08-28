"use client";

import { useQuery } from "@tanstack/react-query";
import { repostsApi } from "../services/reposts.api";

export function useHasReposted(postId: string) {
  return useQuery({
    queryKey: ["reposts", postId],
    queryFn: () => repostsApi.hasReposted(postId),
  });
}
