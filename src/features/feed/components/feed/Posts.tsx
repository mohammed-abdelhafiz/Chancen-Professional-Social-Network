"use client";
import { Loader2, FileText, AlertCircle } from "lucide-react";
import { useGetPosts } from "../../hooks/useGetPosts";
import { useEffect, useRef } from "react";
import { PostCard } from "./PostCard";
import { PostsSkeleton } from "./PostsSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export const Posts = () => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading, hasNextPage, isError, error, refetch } =
    useGetPosts();
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <PostsSkeleton />;
  }

  if (isError) {
    return (
      <Card className="py-8">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm text-muted-foreground">
            Failed to load posts. Please try again.
          </p>
          <p className="text-xs text-muted-foreground">
            {(error as Error)?.message || "Unknown error"}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Card className="py-12">
        <CardContent className="flex flex-col items-center gap-2 text-center">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center">
            <FileText className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">No posts yet</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Be the first to share something with your network.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 w-full"
    >
      {posts.map((post) => (
        <motion.div key={post.feedItemId ?? post.id} variants={staggerItem}>
          <PostCard post={post} />
        </motion.div>
      ))}
      <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-4 gap-2">
        {isFetchingNextPage && (
          <Loader2 className="animate-spin text-muted-foreground size-6" />
        )}
        {!hasNextPage && posts.length > 0 && (
          <p className="text-xs text-muted-foreground">You have reached the end of the feed</p>
        )}
      </div>
    </motion.div>
  );
};
