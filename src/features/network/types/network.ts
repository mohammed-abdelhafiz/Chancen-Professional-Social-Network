import { User } from "@/features/auth/types/user";

export interface Connection {
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  sender: User;
}

export interface ConnectionRequest {
  senderId: string;
  receiverId: string;
  status: "pending";
  createdAt: string;
  updatedAt: string;
  sender: User;
}

export interface Follow {
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt: string;
  follower: User;
}

export interface Following {
  followerId: string;
  followingId: string;
  createdAt: string;
  updatedAt: string;
  following: User;
}
