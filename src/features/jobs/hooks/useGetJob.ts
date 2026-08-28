import { useQuery } from "@tanstack/react-query";
import { getJob } from "../services/jobs.api";

export const useGetJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
    enabled: !!id,
    staleTime: 60000,
    retry: 1,
  });
};
