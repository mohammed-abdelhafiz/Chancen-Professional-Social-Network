import { useQuery } from "@tanstack/react-query";
import { getFollowSuggestions } from "../services/users.api";

export const useFollowSuggestions = () => {
  return useQuery({
    queryKey: ["follow-suggestions"],
    queryFn: getFollowSuggestions,
  });
};
