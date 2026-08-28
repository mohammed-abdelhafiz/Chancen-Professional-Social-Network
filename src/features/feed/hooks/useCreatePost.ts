import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/feed.api";
import { toast } from "sonner";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to create post";
      // Axios error handling
      const axiosMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || message;
      toast.error(axiosMessage);
    },
  });
};
