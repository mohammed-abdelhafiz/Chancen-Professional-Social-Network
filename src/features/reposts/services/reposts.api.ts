import api from "@/lib/axios";
import { RepostsResponse, HasRepostedResponse, CreateRepostResponse } from "../types/repost";

export const repostsApi = {
  createRepost: async (postId: string, content?: string): Promise<CreateRepostResponse> => {
    const { data } = await api.post(`/reposts/${postId}`, { content });
    return data;
  },

  deleteRepost: async (postId: string): Promise<CreateRepostResponse> => {
    const { data } = await api.delete(`/reposts/${postId}`);
    return data;
  },

  getReposts: async (postId: string, page = 1, limit = 20): Promise<RepostsResponse> => {
    const { data } = await api.get(`/reposts/${postId}`, {
      params: { page, limit },
    });
    return data;
  },

  hasReposted: async (postId: string): Promise<HasRepostedResponse> => {
    const { data } = await api.get(`/reposts/${postId}/check`);
    return data;
  },
};
