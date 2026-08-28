import { Post } from "@/features/feed/types/post";

export interface RepostUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar: { url: string; secure_url: string } | null;
  headline: string | null;
}

export interface Repost {
  id: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  user: RepostUser;
  post: Post;
}

export interface RepostsResponse {
  reposts: Repost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HasRepostedResponse {
  reposted: boolean;
}

export interface CreateRepostResponse {
  message: string;
}
