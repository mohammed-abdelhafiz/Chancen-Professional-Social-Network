import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../services/jobs.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job posted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || "Failed to post job";
      toast.error(message);
    },
  });
};
