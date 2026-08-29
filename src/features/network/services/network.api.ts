import api from "@/lib/axios";

export const getFollowSuggestions = async () => {
  const res = await api.get("/users/follow-suggestions");
  return res.data;
};

export const followUser = async (userId: string) => {
  const res = await api.post(`/users/${userId}/follow`);
  return res.data;
};

export const connectUser = async (userId: string) => {
  const res = await api.post(`/users/${userId}/connect`);
  return res.data;
};

export const getConnectionStatus = async (
  userId: string,
): Promise<{ status: "self" | "none" | "connected" | "pending_sent" | "pending_received" }> => {
  const res = await api.get(`/users/${userId}/connection-status`);
  return res.data;
};

export const getConnectionRequests = async (userId: string) => {
  const res = await api.get(`/users/${userId}/connectionRequests`);
  return res.data;
};

export const acceptRequest = async (userId: string) => {
  const res = await api.post(`/users/${userId}/accept`);
  return res.data;
};

export const rejectRequest = async (userId: string) => {
  const res = await api.post(`/users/${userId}/reject`);
  return res.data;
};

export const getConnections = async (userId: string) => {
  const res = await api.get(`/users/${userId}/connections`);
  return res.data;
};

export const getFollowers = async (userId: string) => {
  const res = await api.get(`/users/${userId}/followers`);
  return res.data;
};

export const getFollowing = async (userId: string) => {
  const res = await api.get(`/users/${userId}/following`);
  return res.data;
};
