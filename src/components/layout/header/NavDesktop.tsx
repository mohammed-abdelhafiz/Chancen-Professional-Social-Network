"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  BriefcaseBusiness,
  Home,
  MessageCircleMore,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/feed", label: "Home", Icon: Home },
  { href: "/my-network", label: "My Network", Icon: Users },
  { href: "/jobs", label: "Jobs", Icon: BriefcaseBusiness },
  { href: "/messaging", label: "Messaging", Icon: MessageCircleMore },
  { href: "/notifications", label: "Notifications", Icon: Bell },
];

export const NavDesktop = () => {
  const pathname = usePathname();
  return (
    <nav className="">
      <ul className="gap-8 hidden md:flex">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "flex flex-col items-center hover:text-primary transition-colors",
                pathname.startsWith(link.href) && "text-primary font-semibold",
              )}
            >
              <link.Icon className="size-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
