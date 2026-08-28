import axios from "axios";
import { NotificationsResponse, UnreadCountResponse, Notification } from "../types/notification";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const notificationsApi = {
  getNotifications: async (page = 1, limit = 20): Promise<NotificationsResponse> => {
    const { data } = await axios.get(`${API_URL}/notifications`, {
      params: { page, limit },
      withCredentials: true,
    });
    return data;
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const { data } = await axios.get(`${API_URL}/notifications/unread-count`, {
      withCredentials: true,
    });
    return data;
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    await axios.patch(`${API_URL}/notifications/${notificationId}/read`, null, {
      withCredentials: true,
    });
  },

  markAllAsRead: async (): Promise<void> => {
    await axios.patch(`${API_URL}/notifications/read-all`, null, {
      withCredentials: true,
    });
  },

  delete: async (notificationId: string): Promise<void> => {
    await axios.delete(`${API_URL}/notifications/${notificationId}`, {
      withCredentials: true,
    });
  },
};
