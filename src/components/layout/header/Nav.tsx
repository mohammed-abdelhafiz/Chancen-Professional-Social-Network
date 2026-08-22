import {
  Bell,
  BriefcaseBusiness,
  Home,
  MessageCircleMore,
  Users,
} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/feed", label: "Home", Icon: Home },
  { href: "/my-network", label: "My Network", Icon: Users },
  { href: "/jobs", label: "Jobs", Icon: BriefcaseBusiness },
  { href: "/messaging", label: "Messaging", Icon: MessageCircleMore },
  { href: "/notifications", label: "Notifications", Icon: Bell },
];

export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex flex-col items-center">
              <link.Icon className="size-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
