"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { useFollowSuggestions } from "../hooks/useFollowSuggestions";
import { User } from "@/features/auth/types/user";
import { Button } from "@/components/ui/button";
import { useFollowUser } from "../hooks/useFollowUser";
import { PlusIcon } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";

export const FollowSuggestionsCard = () => {
  const { data: followSuggestions } = useFollowSuggestions();
  const followUserMutation = useFollowUser();
  return (
    <Card className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:flex flex-col h-fit lg:sticky lg:top-6">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-base">Add to your feed</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {followSuggestions?.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center my-4">
            No follow suggestions
          </p>
        ) : (
          followSuggestions?.map((followSuggestion: User) => (
            <div key={followSuggestion.id} className="flex items-start gap-3">
              <UserAvatar user={followSuggestion} size="default" href={`/profile/${followSuggestion.id}`} />
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-semibold text-sm truncate">
                  {followSuggestion.firstName} {followSuggestion.lastName}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {followSuggestion.headline}
                </p>
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  className="rounded-full mt-1 h-7 px-3 text-xs"
                  onClick={() => followUserMutation.mutate(followSuggestion.id)}
                >
                  <PlusIcon className="size-3.5 mr-1" /> Follow
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

