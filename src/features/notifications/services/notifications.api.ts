import api from "@/lib/axios";
import { NotificationsResponse, UnreadCountResponse, Notification } from "../types/notification";

export const notificationsApi = {
  getNotifications: async (page = 1, limit = 20): Promise<NotificationsResponse> => {
    const { data } = await api.get(`/notifications`, {
      params: { page, limit },
    });
    return data;
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const { data } = await api.get(`/notifications/unread-count`);
    return data;
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    await api.patch(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch(`/notifications/read-all`);
  },

  delete: async (notificationId: string): Promise<void> => {
    await api.delete(`/notifications/${notificationId}`);
  },
};
