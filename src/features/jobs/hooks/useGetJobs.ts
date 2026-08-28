import { useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "../services/jobs.api";

interface UseGetJobsOptions {
  search?: string;
  type?: string;
}

export const useGetJobs = ({ search, type }: UseGetJobsOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ["jobs", search, type],
    queryFn: ({ pageParam = 1 }) => getJobs(pageParam, 10, search, type),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 60000,
    retry: 1,
  });
};
