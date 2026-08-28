import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectUser } from "../services/network.api";

export const useConnectUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: connectUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["connection-requests"] });
    },
  });
};
