"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Bell,
  BriefcaseBusiness,
  Home,
  Menu,
  MessageCircleMore,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "./UserButton";

import { useGetUnreadCount as useGetNotificationsUnreadCount } from "@/features/notifications/hooks/useGetUnreadCount";
import { useGetUnreadCount as useGetMessagesUnreadCount } from "@/features/messaging/hooks/useGetUnreadCount";

const navLinks = [
  { href: "/feed", label: "Home", Icon: Home, badgeKey: null },
  { href: "/my-network", label: "My Network", Icon: Users, badgeKey: null },
  { href: "/jobs", label: "Jobs", Icon: BriefcaseBusiness, badgeKey: null },
  { href: "/messaging", label: "Messaging", Icon: MessageCircleMore, badgeKey: "messaging" },
  { href: "/notifications", label: "Notifications", Icon: Bell, badgeKey: "notifications" },
];

export const NavMobile = () => {
  const pathname = usePathname();
  const { data: notifData } = useGetNotificationsUnreadCount();
  const { data: messagesUnreadData } = useGetMessagesUnreadCount();

  const unreadNotifCount = notifData?.count || 0;
  const unreadMessagesCount = typeof messagesUnreadData === "number" ? messagesUnreadData : (messagesUnreadData as any)?.count || 0;

  return (
    <Sheet>
      <SheetTrigger className="md:hidden cursor-pointer hover:opacity-50 transition-opacity">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col pt-12">
          {navLinks.map((link) => {
            const badgeCount =
              link.badgeKey === "messaging"
                ? unreadMessagesCount
                : link.badgeKey === "notifications"
                  ? unreadNotifCount
                  : 0;

            return (
              <li key={link.href} className="hover:bg-accent p-4 rounded-2xl">
                <Link
                  href={link.href}
                  className={cn(
                    "flex gap-3 items-center justify-between",
                    pathname.startsWith(link.href) &&
                      "text-primary font-semibold",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.Icon className="size-5" />
                    <span className="text-sm">{link.label}</span>
                  </div>
                  {badgeCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold leading-none">
                      {badgeCount > 99 ? "99+" : badgeCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <SheetFooter>
          <UserButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
