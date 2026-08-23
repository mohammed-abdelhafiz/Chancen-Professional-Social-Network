import { FollowSuggestionsCard } from "@/features/user/components/FollowSuggestionsCard";
import { UserCard } from "@/features/user/components/UserCard";

export default function Home() {
  return (
    <div className="p-6 flex">
      <UserCard />
      {/* <Feed /> */}
      <div className="flex-1">feed</div>
      <FollowSuggestionsCard />
    </div>
  );
}
