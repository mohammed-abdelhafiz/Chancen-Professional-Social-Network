"use client";

import { useGetBookmarks } from "../hooks/useGetBookmarks";
import { PostCard } from "@/features/feed/components/feed/PostCard";
import { BookmarksSkeleton } from "./BookmarksSkeleton";
import { BookmarkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { AnimatedSection } from "@/components/motion/AnimatedPage";

export const Bookmarks = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetBookmarks();

  const posts = data?.pages.flatMap((p) => p.bookmarks) || [];

  if (isLoading) {
    return <BookmarksSkeleton />;
  }

  return (
    <div className="py-6 px-4 max-w-2xl mx-auto w-full">
      <AnimatedSection>
        <h1 className="text-2xl font-bold mb-6">Bookmarks</h1>
      </AnimatedSection>

      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-12 text-muted-foreground"
        >
          <BookmarkIcon className="size-12 mb-4 opacity-50" />
          <p className="text-sm">No bookmarks yet</p>
          <p className="text-xs mt-1">Save posts to read later</p>
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
            <div className="flex justify-center py-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="text-sm text-primary hover:underline"
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
