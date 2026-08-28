import axios from "axios";
import { RepostsResponse, HasRepostedResponse, CreateRepostResponse } from "../types/repost";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const repostsApi = {
  createRepost: async (postId: string, content?: string): Promise<any> => {
    const { data } = await axios.post(`${API_URL}/reposts/${postId}`, { content }, {
      withCredentials: true,
    });
    return data;
  },

  deleteRepost: async (postId: string): Promise<CreateRepostResponse> => {
    const { data } = await axios.delete(`${API_URL}/reposts/${postId}`, {
      withCredentials: true,
    });
    return data;
  },

  getReposts: async (postId: string, page = 1, limit = 20): Promise<RepostsResponse> => {
    const { data } = await axios.get(`${API_URL}/reposts/${postId}`, {
      params: { page, limit },
      withCredentials: true,
    });
    return data;
  },

  hasReposted: async (postId: string): Promise<HasRepostedResponse> => {
    const { data } = await axios.get(`${API_URL}/reposts/${postId}/check`, {
      withCredentials: true,
    });
    return data;
  },
};
