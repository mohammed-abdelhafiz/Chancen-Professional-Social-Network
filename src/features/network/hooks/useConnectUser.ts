"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectUser } from "../services/network.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useConnectUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => connectUser(userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["connection-status", userId] });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update connection");
    },
  });
};
