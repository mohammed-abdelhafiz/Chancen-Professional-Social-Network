import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../services/feed.api";
import { toast } from "sonner";

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      toast.success("Comment deleted");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });
};
