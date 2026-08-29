import api from "@/lib/axios";
import { User } from "@/features/auth/types/user";

export const getUser = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateProfile = async (formData: FormData): Promise<User> => {
  const res = await api.patch("/users/me", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getUserPosts = async (userId: string, page = 1, limit = 10) => {
  const res = await api.get(`/posts/user/${userId}`, {
    params: { page, limit },
  });
  return res.data;
};

export const getUserStats = async (userId: string) => {
  const res = await api.get(`/users/${userId}/stats`);
  return res.data as { followersCount: number; followingCount: number; connectionsCount: number };
};

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
