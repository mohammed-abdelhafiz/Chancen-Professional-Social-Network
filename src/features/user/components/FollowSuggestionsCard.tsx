"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  UserPlus,
  RotateCw,
  Check,
  X,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useFollowSuggestions } from "../hooks/useFollowSuggestions";
import { useFollowUser } from "@/features/network/hooks/useFollowUser";
import { User } from "@/features/auth/types/user";

export const FollowSuggestionsCard = () => {
  const queryClient = useQueryClient();
  const {
    data: followSuggestions,
    isLoading,
    isFetching,
  } = useFollowSuggestions();
  const followUserMutation = useFollowUser();

  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [followingId, setFollowingId] = useState<string | null>(null);
  const [justFollowedIds, setJustFollowedIds] = useState<string[]>([]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["follow-suggestions"] });
  };

  const handleFollow = (userId: string) => {
    setFollowingId(userId);
    followUserMutation.mutate(userId, {
      onSuccess: () => {
        setJustFollowedIds((prev) => [...prev, userId]);
        setFollowingId(null);
        setTimeout(() => {
          setDismissedIds((prev) => [...prev, userId]);
        }, 1200);
      },
      onError: () => {
        setFollowingId(null);
      },
    });
  };

  const handleDismiss = (userId: string) => {
    setDismissedIds((prev) => [...prev, userId]);
  };

  const visibleSuggestions = (followSuggestions || []).filter(
    (user: User) => !dismissedIds.includes(user.id)
  );

  return (
    <Card className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:flex flex-col h-fit lg:sticky lg:top-6">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="size-3.5" />
            </div>
            <div>
              <h3 className="font-semibold text-[13px] leading-tight text-foreground">
                Add to your feed
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                People you may know
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleRefresh}
            disabled={isFetching}
            title="Refresh suggestions"
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <RotateCw
              className={`size-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="pt-0 pb-1">
        {isLoading ? (
          <div className="space-y-0 divide-y divide-border/40">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 animate-pulse"
              >
                <div className="size-9 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-2.5 bg-muted/60 rounded w-32" />
                </div>
                <div className="h-7 bg-muted/50 rounded-full w-[72px]" />
              </div>
            ))}
          </div>
        ) : visibleSuggestions.length === 0 ? (
          <div className="text-center py-6 px-2">
            <div className="size-10 rounded-full bg-muted/50 text-muted-foreground mx-auto flex items-center justify-center mb-2">
              <UserPlus className="size-4" />
            </div>
            <p className="font-medium text-xs text-foreground">
              All caught up!
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              No new suggestions right now
            </p>
            <Button
              variant="outline"
              size="xs"
              onClick={handleRefresh}
              className="mt-3 text-xs rounded-full"
            >
              <RotateCw className="size-3 mr-1" />
              Refresh
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            <AnimatePresence mode="popLayout">
              {visibleSuggestions.slice(0, 4).map((user: User) => {
                const isPending = followingId === user.id;
                const isJustFollowed = justFollowedIds.includes(user.id);

                return (
                  <motion.div
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      overflow: "hidden",
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="group relative py-3 first:pt-1"
                  >
                    {/* Dismiss button */}
                    <button
                      onClick={() => handleDismiss(user.id)}
                      title="Dismiss"
                      className="absolute top-2.5 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-muted-foreground/60 hover:text-foreground rounded-full"
                    >
                      <X className="size-3.5" />
                    </button>

                    {/* User row */}
                    <div className="flex items-center gap-2.5">
                      <UserAvatar
                        user={user}
                        size="default"
                        href={`/profile/${user.id}`}
                      />

                      <div className="flex-1 min-w-0 pr-5">
                        <Link
                          href={`/profile/${user.id}`}
                          className="font-semibold text-[13px] text-foreground hover:text-primary transition-colors truncate block leading-tight"
                        >
                          {user.firstName} {user.lastName}
                        </Link>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5 leading-tight">
                          {user.headline || "Chancen member"}
                        </p>
                      </div>
                    </div>

                    {/* Follow button — full width under user info */}
                    <div className="mt-2 ml-[42px]">
                      <Button
                        variant={isJustFollowed ? "outline" : "outline"}
                        size="sm"
                        disabled={isPending || isJustFollowed}
                        onClick={() => handleFollow(user.id)}
                        className={`rounded-full h-7 px-4 text-xs font-semibold transition-all duration-200 ${
                          isJustFollowed
                            ? "border-primary/30 text-primary bg-primary/5 hover:bg-primary/5"
                            : "border-foreground/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                        }`}
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                            Following…
                          </>
                        ) : isJustFollowed ? (
                          <>
                            <Check className="size-3.5 mr-1.5" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="size-3.5 mr-1.5" />
                            Follow
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <div className="px-4 pb-3 pt-1">
        <Link
          href="/my-network"
          className="group/link flex items-center justify-between w-full py-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <span>View all recommendations</span>
          <ChevronRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
};
