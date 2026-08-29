"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useGetComments } from "../../hooks/useGetComments";
import { useCreateComment } from "../../hooks/useCreateComment";
import { CommentCard } from "./CommentCard";
import { Loader2, Send, ImageIcon, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
  postId: string;
}

export const CommentSection = ({ postId }: Props) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((s) => s.user);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useGetComments(postId, true);
  const createComment = useCreateComment(postId);

  const comments = data?.pages.flatMap((p) => p.comments) ?? [];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed && !selectedImage) return;

    const formData = new FormData();
    if (trimmed) formData.set("content", trimmed);
    if (selectedImage) formData.set("image", selectedImage);

    try {
      await createComment.mutateAsync(formData);
      setContent("");
      handleRemoveImage();
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-4 pt-3 pb-2 border-t mt-2 bg-card">
      {/* Input */}
      <div className="flex gap-2 items-start">
        <UserAvatar user={user} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Add a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={createComment.isPending}
              className="flex-1 rounded-full bg-muted/50"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={createComment.isPending}
              className="shrink-0"
            >
              <ImageIcon className="size-4" />
            </Button>
            <Button
              size="icon-sm"
              onClick={handleSubmit}
              disabled={(!content.trim() && !selectedImage) || createComment.isPending}
              className="shrink-0 rounded-full"
            >
              {createComment.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </div>
          <Input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
          {previewUrl && (
            <div className="relative mt-2 rounded-xl overflow-hidden border bg-muted w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="preview" className="h-20 w-auto object-cover" />
              <button
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
              >
                <X className="size-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-3" />

      {/* Comments list */}
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <p className="text-sm text-muted-foreground text-center py-4">Failed to load comments</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-1">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} postId={postId} />
          ))}
          {hasNextPage && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-xs"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? <Loader2 className="size-4 animate-spin" /> : "Load more comments"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
