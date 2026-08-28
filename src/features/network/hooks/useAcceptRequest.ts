import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest } from "../services/network.api";

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
  });
};
