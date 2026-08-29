import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../services/feed.api";

export const useGetComments = (postId: string, enabled = true) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getComments(postId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!postId && enabled,
    staleTime: 1000 * 30,
  });
};
