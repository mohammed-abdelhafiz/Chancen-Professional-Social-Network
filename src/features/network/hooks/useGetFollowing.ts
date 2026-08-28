import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getFollowing } from "../services/network.api";

export const useGetFollowing = () => {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userId!),
    enabled: !!userId,
  });
};
