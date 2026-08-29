import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/feed.api";
import { toast } from "sonner";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });
};
