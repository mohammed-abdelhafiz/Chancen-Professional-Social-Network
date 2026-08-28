import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectRequest } from "../services/network.api";

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
    },
  });
};
