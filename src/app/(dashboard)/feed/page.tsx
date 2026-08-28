import { Feed } from "@/features/feed/components/feed/Feed";
import { FollowSuggestionsCard } from "@/features/user/components/FollowSuggestionsCard";
import { UserCard } from "@/features/user/components/UserCard";

export default function Home() {
  return (
    <div className="py-6 px-4 flex gap-6 flex-col lg:flex-row items-start justify-center max-w-7xl mx-auto w-full">
      <UserCard />
      <Feed />
      <FollowSuggestionsCard />
    </div>
  );
}

