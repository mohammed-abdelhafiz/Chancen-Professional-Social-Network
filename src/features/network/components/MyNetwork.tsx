"use client";

import { PendingRequests } from "./PendingRequests";
import { NetworkList } from "./NetworkList";
import { FollowSuggestionsCard } from "@/features/user/components/FollowSuggestionsCard";
import { UserCard } from "@/features/user/components/UserCard";
import { motion } from "framer-motion";

export const MyNetwork = () => {
  return (
    <div className="py-6 px-4 flex gap-6 flex-col lg:flex-row items-start justify-center max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4 hidden lg:block"
      >
        <UserCard />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="flex-1 min-w-0 max-w-2xl space-y-4 w-full"
      >
        <PendingRequests />
        <NetworkList />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:block"
      >
        <FollowSuggestionsCard />
      </motion.div>
    </div>
  );
};
