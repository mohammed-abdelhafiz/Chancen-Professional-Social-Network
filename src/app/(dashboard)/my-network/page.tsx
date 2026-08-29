import type { Metadata } from "next";
import { MyNetwork } from "@/features/network/components/MyNetwork";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export const metadata: Metadata = {
  title: "My Network",
  description: "Manage your professional connections, invitations, followers, and growing network on Chancen.",
};

export default function MyNetworkPage() {
  return (
    <AnimatedPage>
      <MyNetwork />
    </AnimatedPage>
  );
}
