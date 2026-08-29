"use client";

import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Home,
  MessageCircleMore,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGetUnreadCount as useGetMessagesUnreadCount } from "@/features/messaging/hooks/useGetUnreadCount";

const navLinks = [
  { href: "/feed", label: "Home", Icon: Home, badgeKey: null },
  { href: "/my-network", label: "My Network", Icon: Users, badgeKey: null },
  { href: "/jobs", label: "Jobs", Icon: BriefcaseBusiness, badgeKey: null },
  { href: "/messaging", label: "Messaging", Icon: MessageCircleMore, badgeKey: "messaging" },
];

export const NavDesktop = () => {
  const pathname = usePathname();
  const { data: messagesUnreadData } = useGetMessagesUnreadCount();
  const unreadMessagesCount = typeof messagesUnreadData === "number" ? messagesUnreadData : (messagesUnreadData as any)?.count || 0;

  return (
    <nav className="">
      <ul className="gap-8 hidden md:flex">
        {navLinks.map((link) => {
          const badgeCount = link.badgeKey === "messaging" ? unreadMessagesCount : 0;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex flex-col items-center hover:text-primary transition-colors relative",
                  pathname.startsWith(link.href) && "text-primary font-semibold",
                )}
              >
                <div className="relative">
                  <link.Icon className="size-5" />
                  {badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold leading-none ring-2 ring-background">
                      {badgeCount > 99 ? "99+" : badgeCount}
                    </span>
                  )}
                </div>
                <span className="text-sm">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
