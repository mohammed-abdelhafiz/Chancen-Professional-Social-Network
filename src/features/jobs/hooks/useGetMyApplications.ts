import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "../services/jobs.api";

export const useGetMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
    staleTime: 60000,
    retry: 1,
  });
};
