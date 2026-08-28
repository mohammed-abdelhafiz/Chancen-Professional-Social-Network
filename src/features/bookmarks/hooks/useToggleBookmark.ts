"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarksApi } from "../services/bookmarks.api";

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarksApi.toggleBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
}
