import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../services/users.api";

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-suggestions"] });
    },
  });
};
