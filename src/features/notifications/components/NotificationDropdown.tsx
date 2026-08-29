"use client";

import { BellIcon, CheckCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetNotifications } from "../hooks/useGetNotifications";
import { useGetUnreadCount } from "../hooks/useGetUnreadCount";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { NotificationItem } from "./NotificationItem";
import { useState, useRef, useEffect } from "react";

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetNotifications();
  const { data: unreadData } = useGetUnreadCount();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = unreadData?.count || 0;
  const notifications = data?.pages.flatMap((p) => p.notifications) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    markAllAsRead.mutate();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex flex-col items-center hover:text-primary transition-colors"
      >
        <div className="relative">
          <BellIcon className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        <span className="text-sm">Notifications</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllRead}
                disabled={markAllAsRead.isPending}
                className="text-xs h-auto p-1"
              >
                <CheckCheckIcon className="size-3.5 mr-1" />
                Mark all read
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
