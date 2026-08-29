"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../services/network.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["follow-suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["userStats", userId] });
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update follow status");
    },
  });
};
