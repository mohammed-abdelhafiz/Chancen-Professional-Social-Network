import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getConnectionRequests } from "../services/network.api";

export const useGetConnectionRequests = () => {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ["connection-requests", userId],
    queryFn: () => getConnectionRequests(userId!),
    enabled: !!userId,
  });
};
