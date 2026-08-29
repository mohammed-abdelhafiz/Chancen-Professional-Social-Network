"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest } from "../services/network.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => acceptRequest(userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["connection-status", userId] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      toast.success(data?.message || "Connection request accepted");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to accept request");
    },
  });
};
