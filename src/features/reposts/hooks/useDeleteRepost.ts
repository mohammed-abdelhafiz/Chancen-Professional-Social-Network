"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repostsApi } from "../services/reposts.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useDeleteRepost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => repostsApi.deleteRepost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["reposts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Repost removed");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to remove repost");
    },
  });
}
