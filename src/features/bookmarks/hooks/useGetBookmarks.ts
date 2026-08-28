"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { bookmarksApi } from "../services/bookmarks.api";

export function useGetBookmarks() {
  return useInfiniteQuery({
    queryKey: ["bookmarks"],
    queryFn: ({ pageParam = 1 }) => bookmarksApi.getBookmarks(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}
