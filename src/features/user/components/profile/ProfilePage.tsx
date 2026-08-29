"use client";

import { useState } from "react";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetUserStats } from "../../hooks/useGetUserStats";
import { useGetUserPosts } from "../../hooks/useGetUserPosts";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileActions } from "./ProfileActions";
import { ProfileEditModal } from "./ProfileEditModal";
import { useGetFollowing } from "@/features/network/hooks/useGetFollowing";
import { Following } from "@/features/network/types/network";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostCard } from "@/features/feed/components/feed/PostCard";
import { User } from "@/features/auth/types/user";
import { MoreHorizontalIcon, BriefcaseIcon, CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface Props {
  userId: string;
}

export const ProfilePage = ({ userId }: Props) => {
  const { data: user, isLoading } = useGetUser(userId);
  const { data: following } = useGetFollowing();
  const { data: stats } = useGetUserStats(userId);
  const { data: postsData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isLoadingPosts } = useGetUserPosts(userId);
  const currentUser = useAuthStore((s) => s.user);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "about">("posts");

  const handleTabChange = (value: string) => {
    setActiveTab(value as "posts" | "about");
  };

  const isFollowing = following?.some((f: Following) => f.followingId === userId);

  const posts = postsData?.pages.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return (
      <div className="py-6 px-4 max-w-3xl mx-auto w-full">
        <Card className="overflow-hidden">
          <div className="h-48 w-full bg-muted animate-pulse" />
          <CardContent className="p-6">
            <div className="size-32 rounded-full bg-muted animate-pulse -mt-24" />
            <div className="h-8 w-48 bg-muted animate-pulse mt-4 rounded" />
            <div className="h-4 w-64 bg-muted animate-pulse mt-2 rounded" />
            <div className="h-4 w-48 bg-muted animate-pulse mt-2 rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-6 px-4 max-w-3xl mx-auto w-full">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">User not found</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="py-6 px-4 max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <Card className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProfileHeader
              user={user}
              followersCount={stats?.followersCount ?? 0}
              followingCount={stats?.followingCount ?? 0}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="px-6 pb-6"
          >
            <ProfileActions
              user={user}
              isFollowing={isFollowing}
              onEditProfile={() => setIsEditOpen(true)}
            />
          </motion.div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="border-t">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">
              Posts
            </TabsTrigger>
            <TabsTrigger value="about" className="flex-1">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6 space-y-4"
              >
                {posts.length === 0 && !isLoadingPosts ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {isOwnProfile ? (
                      <p className="text-sm">No posts yet. Share your thoughts!</p>
                    ) : (
                      <p className="text-sm">No posts yet.</p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {posts.map((post) => (
                      <motion.div key={post.id} variants={staggerItem}>
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                    {hasNextPage && (
                      <div className="text-center py-4">
                        <button
                          onClick={() => fetchNextPage()}
                          disabled={isFetchingNextPage}
                          className="text-sm text-primary hover:underline disabled:opacity-50"
                        >
                          {isFetchingNextPage ? "Loading..." : "Load more"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="about" className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 space-y-6"
            >
              {user.headline && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-start gap-3"
                >
                  <BriefcaseIcon className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Headline</h3>
                    <p className="text-sm">{user.headline}</p>
                  </div>
                </motion.div>
              )}
              {user.company && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-3"
                >
                  <BriefcaseIcon className="size-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Company</h3>
                    <p className="text-sm">{user.company}</p>
                  </div>
                </motion.div>
              )}
              {user.bio && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-start gap-3"
                >
                  <div className="size-5 text-muted-foreground mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">About</h3>
                    <p className="text-sm whitespace-pre-wrap">{user.bio}</p>
                  </div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <CalendarIcon className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Joined</h3>
                  <p className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </motion.div>
              {!user.headline && !user.company && !user.bio && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  {isOwnProfile ? (
                    <p className="text-sm">Add details to your profile to help others get to know you.</p>
                  ) : (
                    <p className="text-sm">This user hasn&apos;t added any details yet.</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
        </Card>
      </motion.div>

      <ProfileEditModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        user={user}
      />
    </div>
  );
};
