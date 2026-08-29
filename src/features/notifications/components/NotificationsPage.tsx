"use client";

import { useGetNotifications } from "../hooks/useGetNotifications";
import { useGetUnreadCount } from "../hooks/useGetUnreadCount";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { BellIcon, CheckCheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export const NotificationsPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNotifications();
  const { data: unreadData } = useGetUnreadCount();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = unreadData?.count || 0;
  const notifications = data?.pages.flatMap((p) => p.notifications) || [];

  return (
    <div className="py-6 px-4 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BellIcon className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            <CheckCheckIcon className="size-4 mr-1" />
            Mark all read
          </Button>
        )}
      </motion.div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 text-muted-foreground border rounded-lg bg-card"
        >
          <BellIcon className="size-12 mb-3 opacity-30" />
          <p className="text-sm font-medium">No notifications yet</p>
          <p className="text-xs mt-1">When you get notifications, they&apos;ll show up here</p>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="border rounded-lg overflow-hidden bg-card"
        >
          {notifications.map((notification) => (
            <motion.div key={notification.id} variants={staggerItem}>
              <NotificationItem notification={notification} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {hasNextPage && (
        <div className="flex justify-center pt-6">
          <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};
