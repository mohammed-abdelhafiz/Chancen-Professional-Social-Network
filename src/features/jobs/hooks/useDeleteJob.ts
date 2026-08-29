import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../services/jobs.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || "Failed to delete job";
      toast.error(message);
    },
  });
};
