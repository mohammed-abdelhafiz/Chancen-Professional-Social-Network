import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../services/messaging.api";

export const useGetMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
    staleTime: 10000,
    retry: 1,
  });
};
