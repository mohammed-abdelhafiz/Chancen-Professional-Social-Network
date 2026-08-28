"use client";

import { PendingRequests } from "./PendingRequests";
import { NetworkList } from "./NetworkList";
import { FollowSuggestionsCard } from "@/features/user/components/FollowSuggestionsCard";
import { UserCard } from "@/features/user/components/UserCard";

export const MyNetwork = () => {
  return (
    <div className="py-6 px-4 flex gap-6 flex-col lg:flex-row items-start justify-center max-w-7xl mx-auto w-full">
      <div className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4 hidden lg:block">
        <UserCard />
      </div>
      <div className="flex-1 min-w-0 max-w-2xl space-y-4 w-full">
        <PendingRequests />
        <NetworkList />
      </div>
      <div className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:block">
        <FollowSuggestionsCard />
      </div>
    </div>
  );
};
