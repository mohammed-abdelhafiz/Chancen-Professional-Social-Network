import { useQuery } from "@tanstack/react-query";
import { getFollowers, getFollowing } from "../services/users.api";

export const useGetUserFollowers = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ["user-followers", userId],
    queryFn: () => getFollowers(userId),
    enabled: !!userId && enabled,
  });
};

export const useGetUserFollowing = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ["user-following", userId],
    queryFn: () => getFollowing(userId),
    enabled: !!userId && enabled,
  });
};
