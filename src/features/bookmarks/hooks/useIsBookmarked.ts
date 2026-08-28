"use client";

import { useQuery } from "@tanstack/react-query";
import { bookmarksApi } from "../services/bookmarks.api";

export function useIsBookmarked(postId: string) {
  return useQuery({
    queryKey: ["bookmarks", postId],
    queryFn: () => bookmarksApi.isBookmarked(postId),
  });
}
