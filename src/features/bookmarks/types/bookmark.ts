import { Post } from "@/features/feed/types/post";

export interface BookmarksResponse {
  bookmarks: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookmarkCheckResponse {
  bookmarked: boolean;
}

export interface ToggleBookmarkResponse {
  bookmarked: boolean;
  message: string;
}
