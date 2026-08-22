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

const navLinks = [
  { href: "/feed", label: "Home", Icon: Home },
  { href: "/my-network", label: "My Network", Icon: Users },
  { href: "/jobs", label: "Jobs", Icon: BriefcaseBusiness },
  { href: "/messaging", label: "Messaging", Icon: MessageCircleMore },
  { href: "/notifications", label: "Notifications", Icon: Bell },
];
export const NavMobile = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden cursor-pointer hover:opacity-50 transition-opacity">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col pt-12">
          {navLinks.map((link) => (
            <li key={link.href} className="hover:bg-accent p-4 rounded-2xl">
              <Link
                href={link.href}
                className={cn(
                  "flex gap-2 items-center",
                  pathname.startsWith(link.href) &&
                    "text-primary font-semibold",
                )}
              >
                <link.Icon className="size-5" />
                <span className="text-sm">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <SheetFooter>
          <UserButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
