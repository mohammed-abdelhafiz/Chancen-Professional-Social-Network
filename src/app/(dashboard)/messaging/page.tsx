import type { Metadata } from "next";
import { Messaging } from "@/features/messaging/components/Messaging";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export const metadata: Metadata = {
  title: "Messages",
  description: "Chat in real-time with peers, recruiters, and professional connections on Chancen.",
};

export default function MessagingPage() {
  return (
    <AnimatedPage>
      <Messaging />
    </AnimatedPage>
  );
}
