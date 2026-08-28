"use client";

import { useGetBookmarks } from "../hooks/useGetBookmarks";
import { PostCard } from "@/features/feed/components/feed/PostCard";
import { BookmarksSkeleton } from "./BookmarksSkeleton";
import { BookmarkIcon } from "lucide-react";

export const Bookmarks = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetBookmarks();

  const posts = data?.pages.flatMap((p) => p.bookmarks) || [];

  if (isLoading) {
    return <BookmarksSkeleton />;
  }

  return (
    <div className="py-6 px-4 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Bookmarks</h1>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <BookmarkIcon className="size-12 mb-4 opacity-50" />
          <p className="text-sm">No bookmarks yet</p>
          <p className="text-xs mt-1">Save posts to read later</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
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
        </div>
      )}
    </div>
  );
};
