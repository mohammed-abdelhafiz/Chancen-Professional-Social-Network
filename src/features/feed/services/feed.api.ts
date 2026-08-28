import api from "@/lib/axios";
import { Post, GetCommentsResponse } from "../types/post";

export interface GetPostsResponse {
  posts: Post[];
  nextPage?: number;
}

export const createPost = async (formData: FormData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getPosts = async (page: number): Promise<GetPostsResponse> => {
  const response = await api.get(`/posts?page=${page}&limit=10`);
  return response.data;
};

export const toggleLikePost = async (postId: string) => {
  const response = await api.post(`/posts/${postId}/like`);
  return response.data as { liked: boolean; likesCount: number; message: string };
};

export const deletePost = async (postId: string) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

export const getComments = async (postId: string, page: number): Promise<GetCommentsResponse> => {
  const response = await api.get(`/posts/${postId}/comments?page=${page}&limit=10`);
  return response.data;
};

export const createComment = async (postId: string, formData: FormData) => {
  const response = await api.post(`/posts/${postId}/comments`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const toggleLikeComment = async (commentId: string) => {
  const response = await api.post(`/posts/comments/${commentId}/like`);
  return response.data as { liked: boolean; likesCount: number; message: string };
};

export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`/posts/comments/${commentId}`);
  return response.data;
};
