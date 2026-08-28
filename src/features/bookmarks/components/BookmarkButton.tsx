"use client";

import { Button } from "@/components/ui/button";
import { BookmarkIcon, BookmarkCheckIcon } from "lucide-react";
import { useToggleBookmark } from "../hooks/useToggleBookmark";
import { useIsBookmarked } from "../hooks/useIsBookmarked";
import { cn } from "@/lib/utils";

interface Props {
  postId: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
}

export const BookmarkButton = ({ postId, size = "icon-sm" }: Props) => {
  const { data, isLoading } = useIsBookmarked(postId);
  const toggleBookmark = useToggleBookmark();

  const isBookmarked = data?.bookmarked || false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark.mutate(postId);
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleClick}
      disabled={toggleBookmark.isPending}
      className={cn(
        "text-muted-foreground hover:text-primary",
        isBookmarked && "text-primary"
      )}
    >
      {isBookmarked ? (
        <BookmarkCheckIcon className="size-4" />
      ) : (
        <BookmarkIcon className="size-4" />
      )}
    </Button>
  );
};
