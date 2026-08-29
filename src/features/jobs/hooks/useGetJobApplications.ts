import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "../services/jobs.api";

export const useGetJobApplications = (jobId: string, enabled = true) => {
  return useQuery({
    queryKey: ["jobApplications", jobId],
    queryFn: () => getJobApplications(jobId),
    enabled: !!jobId && enabled,
    staleTime: 30000,
  });
};
