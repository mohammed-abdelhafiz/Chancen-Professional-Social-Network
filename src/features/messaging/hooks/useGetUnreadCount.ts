import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "../services/messaging.api";

export const useGetUnreadCount = () => {
  return useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
    staleTime: 30000,
    retry: 1,
  });
};
