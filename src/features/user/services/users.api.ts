import api from "@/lib/axios";

export const getFollowSuggestions = async () => {
  const res = await api.get("/users/follow-suggestions");
  return res.data;
};

export const followUser = async (userId: string) => {
  const res = await api.post(`/users/${userId}/follow`);
  return res.data;
};
