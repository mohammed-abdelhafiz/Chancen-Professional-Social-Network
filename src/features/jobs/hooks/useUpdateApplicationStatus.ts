import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationStatus } from "../services/jobs.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId,
      applicationId,
      status,
    }: {
      jobId: string;
      applicationId: string;
      status: "pending" | "accepted" | "rejected";
    }) => updateApplicationStatus(jobId, applicationId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications", variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success(`Application ${variables.status}`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update application");
    },
  });
};
