import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../services/messaging.api";

export const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 30000,
    retry: 1,
  });
};
