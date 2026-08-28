import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrCreateConversation } from "../services/messaging.api";

export const useGetOrCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getOrCreateConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
