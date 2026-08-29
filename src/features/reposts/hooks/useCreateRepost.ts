"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repostsApi } from "../services/reposts.api";

export function useCreateRepost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content?: string }) =>
      repostsApi.createRepost(postId, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["reposts", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["reposts"] });
    },
  });
}
