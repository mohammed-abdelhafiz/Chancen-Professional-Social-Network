import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyToJob } from "../services/jobs.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useApplyToJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, coverLetter }: { jobId: string; coverLetter?: string }) =>
      applyToJob(jobId, coverLetter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job"] });
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      toast.success("Application submitted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || "Failed to submit application";
      toast.error(message);
    },
  });
};
