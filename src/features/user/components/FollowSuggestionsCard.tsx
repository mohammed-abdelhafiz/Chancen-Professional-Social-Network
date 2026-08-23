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
    <Card className="w-64 gap-7 hidden lg:flex">
      <CardHeader>
        <h3 className="font-semibold">Add to your feed</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {followSuggestions?.length === 0 ? (
          <p className="text-muted-foreground text-center my-6">
            No follow suggestions
          </p>
        ) : (
          followSuggestions?.map((followSuggestion: User) => (
            <div key={followSuggestion.id} className="flex gap-3">
              <UserAvatar user={followSuggestion} size="lg" />
              <div>
                <p className="font-bold">
                  {followSuggestion.firstName} {followSuggestion.lastName}
                </p>
                <p className="text-muted-foreground">
                  {followSuggestion.headline}
                </p>
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  className="rounded-3xl mt-1 px-4"
                  onClick={() => followUserMutation.mutate(followSuggestion.id)}
                >
                  <PlusIcon /> Follow
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
