import api from "@/lib/axios";
import { BookmarksResponse, ToggleBookmarkResponse, BookmarkCheckResponse } from "../types/bookmark";

export const bookmarksApi = {
  toggleBookmark: async (postId: string): Promise<ToggleBookmarkResponse> => {
    const { data } = await api.post(`/bookmarks/${postId}/toggle`);
    return data;
  },

  getBookmarks: async (page = 1, limit = 20): Promise<BookmarksResponse> => {
    const { data } = await api.get(`/bookmarks`, {
      params: { page, limit },
    });
    return data;
  },

  isBookmarked: async (postId: string): Promise<BookmarkCheckResponse> => {
    const { data } = await api.get(`/bookmarks/${postId}/check`);
    return data;
  },
};
