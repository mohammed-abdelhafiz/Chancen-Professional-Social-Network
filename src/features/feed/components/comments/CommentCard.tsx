import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Comment } from "../../types/post";
import { getUserInitials } from "@/lib/utils";
import { Heart, Trash2, MoreHorizontal } from "lucide-react";
import { useToggleCommentLike } from "../../hooks/useToggleCommentLike";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Props {
  comment: Comment;
  postId: string;
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
  return date.toLocaleDateString();
}

function getAvatarUrl(avatar: Comment["user"]["avatar"] | undefined | null): string | undefined {
  if (!avatar) return undefined;
  return (avatar as { url?: string; secure_url?: string }).url || (avatar as { secure_url?: string }).secure_url;
}

export const CommentCard = ({ comment, postId }: Props) => {
  const toggleLike = useToggleCommentLike(postId);
  const deleteComment = useDeleteComment(postId);
  const currentUser = useAuthStore((s) => s.user);
  const isOwn = currentUser?.id === comment.userId;
  const avatarUrl = getAvatarUrl(comment.user.avatar);
  const initials = getUserInitials({
    firstName: comment.user.firstName,
    lastName: comment.user.lastName,
  } as never);
  const timeAgo = formatRelativeTime(comment.createdAt);
  const imageUrl = comment.image?.url;

  return (
    <div className="flex gap-3 py-3">
      <Link href={`/profile/${comment.user.id}`} className="shrink-0 mt-1">
        <Avatar size="sm">
          <AvatarImage src={avatarUrl} alt={comment.user.firstName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1 min-w-0">
        <div className="bg-muted/50 rounded-2xl px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm leading-tight truncate">
              {comment.user.firstName} {comment.user.lastName}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
              {isOwn && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-xs" className="size-6 -mr-1" />}
                  >
                    <MoreHorizontal className="size-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => deleteComment.mutate(comment.id)}
                      disabled={deleteComment.isPending}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">{comment.user.headline || "Member"}</p>
          <p className="text-sm whitespace-pre-wrap break-words mt-1 leading-relaxed">{comment.content}</p>
          {imageUrl && (
            <div className="mt-2 rounded-xl overflow-hidden border bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="comment image" loading="lazy" className="w-full h-auto max-h-[250px] object-contain" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1 ml-1">
          <button
            onClick={() => toggleLike.mutate(comment.id)}
            disabled={toggleLike.isPending}
            className={`text-xs font-medium flex items-center gap-1 hover:underline ${comment.isLiked ? "text-primary" : "text-muted-foreground"}`}
          >
            <Heart className={`size-3.5 ${comment.isLiked ? "fill-current" : ""}`} />
            {comment.isLiked ? "Liked" : "Like"}
            {comment._count && comment._count.commentLikes > 0 && (
              <span className="text-muted-foreground">({comment._count.commentLikes})</span>
            )}
          </button>
          <span className="text-xs text-muted-foreground">Reply</span>
        </div>
      </div>
    </div>
  );
};
