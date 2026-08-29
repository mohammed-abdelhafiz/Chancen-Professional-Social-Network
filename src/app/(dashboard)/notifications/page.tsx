import type { Metadata } from "next";
import { NotificationsPage } from "@/features/notifications/components/NotificationsPage";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export const metadata: Metadata = {
  title: "Notifications",
  description: "View activity, connection requests, post reactions, and updates on Chancen.",
};

export default function Notifications() {
  return (
    <AnimatedPage>
      <NotificationsPage />
    </AnimatedPage>
  );
}
