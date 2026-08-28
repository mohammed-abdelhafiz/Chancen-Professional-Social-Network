export interface NotificationUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar: { url: string; secure_url: string } | null;
  headline: string | null;
}

export interface Notification {
  id: string;
  type: NotificationType;
  content: string | null;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  senderId: string | null;
  sender: NotificationUser | null;
}

export type NotificationType =
  | 'like'
  | 'comment'
  | 'follow'
  | 'connection_request'
  | 'connection_accepted'
  | 'message';

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UnreadCountResponse {
  count: number;
}
