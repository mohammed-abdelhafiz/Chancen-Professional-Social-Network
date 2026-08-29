"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectRequest } from "../services/network.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => rejectRequest(userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
      queryClient.invalidateQueries({ queryKey: ["connection-status", userId] });
      toast.success(data?.message || "Connection request rejected");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to reject request");
    },
  });
};
