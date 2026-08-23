import { Feed } from "@/features/feed/components/feed/Feed";
import { FollowSuggestionsCard } from "@/features/user/components/FollowSuggestionsCard";
import { UserCard } from "@/features/user/components/UserCard";

export default function Home() {
  return (
    <div className="p-6 flex gap-6 flex-col lg:flex-row">
      <UserCard />
      <Feed />
      <FollowSuggestionsCard />
    </div>
  );
}
