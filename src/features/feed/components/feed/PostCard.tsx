import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "../../types/post";
import { getUserInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Trash2, Link2 } from "lucide-react";
import { useState } from "react";
import { useToggleLike } from "../../hooks/useToggleLike";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { CommentSection } from "../comments/CommentSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";
import { BookmarkButton } from "@/features/bookmarks/components/BookmarkButton";
import { RepostButton } from "@/features/reposts/components/RepostButton";

interface Props {
  post: Post;
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return diffMin + "m";
  if (diffHour < 24) return diffHour + "h";
  if (diffDay < 7) return diffDay + "d";
  if (diffDay < 30) return Math.floor(diffDay / 7) + "w";
  return date.toLocaleDateString();
}

function getAvatarUrl(avatar: Post["user"]["avatar"] | undefined | null): string | undefined {
  if (!avatar) return undefined;
  return (avatar as { url?: string; secure_url?: string }).url || (avatar as { secure_url?: string }).secure_url;
}

export const PostCard = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();
  const currentUser = useAuthStore((s) => s.user);
  const isOwn = currentUser?.id === post.userId;

  const avatarUrl = getAvatarUrl(post.user.avatar as Post["user"]["avatar"]);
  const initials = getUserInitials({
    firstName: post.user.firstName,
    lastName: post.user.lastName,
  } as never);
  const imageUrl = post.image?.url;
  const timeAgo = formatRelativeTime(post.createdAt);

  const handleLike = () => {
    toggleLike.mutate(post.id);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/feed#${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleRepost = () => {
    toast("Repost coming soon");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(post.id);
    }
  };

  return (
    <Card className="p-0 overflow-hidden" id={post.id}>
      <CardHeader className="p-4 pb-3">
        <div className="flex gap-3">
          <Link href={`/profile/${post.user.id}`} className="shrink-0">
            <Avatar size="default">
              <AvatarImage src={avatarUrl} alt={post.user.firstName + " " + post.user.lastName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm leading-tight truncate">
                  {post.user.firstName} {post.user.lastName}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {post.user.headline || "Member"}
                </p>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon-sm" className="shrink-0 -mr-2 -mt-1" />}
                >
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleShare}>
                    <Link2 className="size-4" />
                    Copy link
                  </DropdownMenuItem>
                  {isOwn && (
                    <DropdownMenuItem variant="destructive" onClick={handleDelete} disabled={deletePost.isPending}>
                      <Trash2 className="size-4" />
                      Delete post
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>

      {(post.content || imageUrl) && (
        <CardContent className="px-4 pb-0 space-y-3">
          {post.content && (
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{post.content}</p>
          )}
          {imageUrl && (
            <div className="relative w-full overflow-hidden rounded-xl border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Post image" className="w-full h-auto max-h-[500px] object-contain" />
            </div>
          )}
        </CardContent>
      )}

      {(post._count?.postLikes !== undefined || post._count?.comments !== undefined) &&
        (post._count.postLikes > 0 || post._count.comments > 0) && (
          <div className="px-4 pt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {post._count.postLikes > 0 ? `${post._count.postLikes} like${post._count.postLikes > 1 ? "s" : ""}` : ""}
            </span>
            <button
              onClick={() => setShowComments((v) => !v)}
              className="hover:underline hover:text-foreground"
            >
              {post._count.comments > 0 ? `${post._count.comments} comment${post._count.comments > 1 ? "s" : ""}` : ""}
            </button>
          </div>
        )}

      <div className="px-2 pt-2 pb-1">
        <Separator className="mb-1" />
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 gap-2 ${post.isLiked ? "text-primary" : "text-muted-foreground"} hover:text-foreground`}
            onClick={handleLike}
            disabled={toggleLike.isPending}
          >
            <Heart className={`size-4 ${post.isLiked ? "fill-current text-red-500" : ""}`} />
            <span className="hidden sm:inline text-xs font-medium">{post.isLiked ? "Liked" : "Like"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 gap-2 ${showComments ? "text-primary" : "text-muted-foreground"} hover:text-foreground`}
            onClick={() => setShowComments((v) => !v)}
          >
            <MessageCircle className="size-4" />
            <span className="hidden sm:inline text-xs font-medium">Comment</span>
          </Button>
          <RepostButton postId={post.id} />
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleShare}
          >
            <Send className="size-4" />
            <span className="hidden sm:inline text-xs font-medium">Send</span>
          </Button>
          <BookmarkButton postId={post.id} />
        </div>
      </div>

      {showComments && <CommentSection postId={post.id} />}
    </Card>
  );
};
