import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost } from "../services/feed.api";
import { GetPostsResponse } from "../services/feed.api";
import { toast } from "sonner";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => toggleLikePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previous = queryClient.getQueryData<{ pages: GetPostsResponse[] }>(["posts"]);

      if (previous) {
        queryClient.setQueryData<{ pages: GetPostsResponse[] }>(["posts"], (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      isLiked: !post.isLiked,
                      _count: {
                        postLikes: post.isLiked
                          ? Math.max(0, (post._count?.postLikes || 1) - 1)
                          : (post._count?.postLikes || 0) + 1,
                        comments: post._count?.comments || 0,
                      },
                    }
                  : post
              ),
            })),
          };
        });
      }

      return { previous };
    },
    onError: (_err, _postId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["posts"], context.previous);
      }
      toast.error("Failed to toggle like");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
