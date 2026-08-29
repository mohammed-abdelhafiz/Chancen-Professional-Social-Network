import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, GetPostsResponse } from "../services/feed.api";

export const useGetPosts = () => {
  return useInfiniteQuery<GetPostsResponse>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
