import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../services/feed.api";
import { toast } from "sonner";

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createComment(postId, formData),
    onSuccess: () => {
      toast.success("Comment added");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });
};
