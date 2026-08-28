"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repostsApi } from "../services/reposts.api";

export function useCreateRepost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content?: string }) =>
      repostsApi.createRepost(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
