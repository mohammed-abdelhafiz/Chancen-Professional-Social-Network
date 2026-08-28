export interface Post {
  id: string;
  content?: string | null;
  image?: {
    url: string;
    publicId: string;
    resourceType: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isLiked?: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: {
      url?: string;
      secure_url?: string;
      publicId?: string;
      resourceType?: string;
    } | null;
    headline?: string | null;
  };
  _count?: {
    postLikes: number;
    comments: number;
  };
}

// Keep backward compatibility for any existing usage
export type FeedPost = Post;

export interface Comment {
  id: string;
  content: string;
  image?: {
    url: string;
    publicId: string;
    resourceType: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  isLiked?: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: {
      url?: string;
      secure_url?: string;
      publicId?: string;
      resourceType?: string;
    } | null;
    headline?: string | null;
  };
  _count?: {
    commentLikes: number;
  };
}

export interface GetCommentsResponse {
  comments: Comment[];
  nextPage?: number;
}
