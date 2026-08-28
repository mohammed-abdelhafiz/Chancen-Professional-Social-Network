import axios from "axios";
import { BookmarksResponse, ToggleBookmarkResponse, BookmarkCheckResponse } from "../types/bookmark";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const bookmarksApi = {
  toggleBookmark: async (postId: string): Promise<ToggleBookmarkResponse> => {
    const { data } = await axios.post(`${API_URL}/bookmarks/${postId}/toggle`, null, {
      withCredentials: true,
    });
    return data;
  },

  getBookmarks: async (page = 1, limit = 20): Promise<BookmarksResponse> => {
    const { data } = await axios.get(`${API_URL}/bookmarks`, {
      params: { page, limit },
      withCredentials: true,
    });
    return data;
  },

  isBookmarked: async (postId: string): Promise<BookmarkCheckResponse> => {
    const { data } = await axios.get(`${API_URL}/bookmarks/${postId}/check`, {
      withCredentials: true,
    });
    return data;
  },
};
