import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
};
