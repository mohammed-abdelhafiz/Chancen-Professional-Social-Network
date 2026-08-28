import { useQuery } from "@tanstack/react-query";
import { getMyJobs } from "../services/jobs.api";

export const useGetMyJobs = () => {
  return useQuery({
    queryKey: ["my-jobs"],
    queryFn: getMyJobs,
    staleTime: 60000,
    retry: 1,
  });
};
