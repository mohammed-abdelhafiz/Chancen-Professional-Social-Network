"use client";

import { UserAvatar } from "@/components/shared/UserAvatar";
import { Notification } from "../types/notification";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  UserPlus,
  UserCheck,
  Bell,
  BriefcaseBusiness,
} from "lucide-react";

interface Props {
  notification: Notification;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

const iconMap: Record<string, typeof Heart> = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  connection_request: Bell,
  connection_accepted: UserCheck,
  message: MessageCircle,
  job_application: BriefcaseBusiness,
};

const colorMap: Record<string, string> = {
  like: "text-rose-500",
  comment: "text-blue-500",
  follow: "text-green-500",
  connection_request: "text-amber-500",
  connection_accepted: "text-green-500",
  message: "text-blue-500",
  job_application: "text-violet-500",
};

export const NotificationItem = ({ notification }: Props) => {
  const markAsRead = useMarkAsRead();
  const router = useRouter();
  const Icon = iconMap[notification.type] || Bell;
  const iconColor = colorMap[notification.type] || "text-muted-foreground";

  const handleClick = () => {
    if (!notification.read) {
      markAsRead.mutate(notification.id);
    }
    if (notification.link) {
      router.push(notification.link);
    } else if (notification.sender) {
      router.push(`/profile/${notification.sender.id}`);
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
        !notification.read ? "bg-primary/5" : ""
      }`}
      onClick={handleClick}
    >
      <div className="relative">
        {notification.sender ? (
          <UserAvatar user={notification.sender} size="sm" href={`/profile/${notification.sender.id}`} />
        ) : (
          <div className="size-8 rounded-full bg-muted flex items-center justify-center">
            <Icon className={`size-4 ${iconColor}`} />
          </div>
        )}
        <div className={`absolute -bottom-1 -right-1 size-4 rounded-full bg-background flex items-center justify-center`}>
          <Icon className={`size-2.5 ${iconColor}`} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">
          {notification.sender && (
            <span className="font-semibold">
              {notification.sender.firstName} {notification.sender.lastName}
            </span>
          )}
          {notification.content && (
            <span className="text-muted-foreground"> {notification.content}</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>

      {!notification.read && (
        <div className="size-2 rounded-full bg-primary shrink-0 mt-2" />
      )}
    </div>
  );
};
