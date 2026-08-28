import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/users.api";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
    staleTime: 60000,
    retry: 1,
  });
};
