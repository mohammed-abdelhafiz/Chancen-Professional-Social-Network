import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getConnections } from "../services/network.api";

export const useGetConnections = () => {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ["connections", userId],
    queryFn: () => getConnections(userId!),
    enabled: !!userId,
  });
};
