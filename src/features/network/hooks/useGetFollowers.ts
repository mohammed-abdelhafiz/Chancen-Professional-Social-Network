import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getFollowers } from "../services/network.api";

export const useGetFollowers = () => {
  const userId = useAuthStore((s) => s.user?.id);
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: () => getFollowers(userId!),
    enabled: !!userId,
  });
};
