import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeComment } from "../services/feed.api";
import { GetCommentsResponse } from "../types/post";
import { toast } from "sonner";

export const useToggleCommentLike = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => toggleLikeComment(commentId),
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previous = queryClient.getQueryData<{ pages: GetCommentsResponse[] }>(["comments", postId]);

      if (previous) {
        queryClient.setQueryData<{ pages: GetCommentsResponse[] }>(["comments", postId], (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              comments: page.comments.map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      isLiked: !c.isLiked,
                      _count: {
                        commentLikes: c.isLiked
                          ? Math.max(0, (c._count?.commentLikes || 1) - 1)
                          : (c._count?.commentLikes || 0) + 1,
                      },
                    }
                  : c
              ),
            })),
          };
        });
      }

      return { previous };
    },
    onError: (_err, _id, context) => {
      if ((context as { previous?: unknown })?.previous) {
        queryClient.setQueryData(["comments", postId], (context as { previous: unknown }).previous);
      }
      toast.error("Failed to toggle like");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};
