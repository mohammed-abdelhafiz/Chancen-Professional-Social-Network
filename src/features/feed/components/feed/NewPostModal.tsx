"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  ImageIcon, 
  Loader2, 
  X, 
  Globe, 
  Smile, 
  Sparkles,
  Paperclip
} from "lucide-react";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  selectedImage: File | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onPostSuccess: () => void;
  clearImage: () => void;
}

const QUICK_EMOJIS = ["🚀", "💡", "🔥", "🎉", "👏", "💼", "✨", "❤️"];
const MAX_CHAR_LIMIT = 3000;

export const NewPostModal = ({
  fileInputRef,
  selectedImage,
  isModalOpen,
  setIsModalOpen,
  onPostSuccess,
  clearImage,
}: Props) => {
  const [content, setContent] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const createPostMutation = useCreatePost();
  const user = useAuthStore((s) => s.user);

  const previewUrl = useMemo(() => {
    if (!selectedImage) return null;
    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Clear content when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      const t = setTimeout(() => {
        if (!createPostMutation.isPending) {
          setContent("");
          setShowEmojis(false);
        }
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isModalOpen, createPostMutation.isPending]);

  const handleRemoveImage = () => {
    clearImage();
  };

  const handleEmojiClick = (emoji: string) => {
    if (content.length + emoji.length <= MAX_CHAR_LIMIT) {
      setContent((prev) => prev + emoji);
    }
  };

  const handlePostCreation = async () => {
    const trimmed = content.trim();
    if (!selectedImage && !trimmed.length) {
      toast.error("Content or image is required");
      return;
    }
    const formData = new FormData();
    if (trimmed.length) {
      formData.set("content", trimmed);
    }
    if (selectedImage) {
      formData.set("image", selectedImage);
    }
    try {
      await createPostMutation.mutateAsync(formData);
      setContent("");
      onPostSuccess();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create post";
      toast.error(message);
    }
  };

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHAR_LIMIT;
  const isDisabled =
    (!selectedImage && !content.trim().length) || 
    createPostMutation.isPending || 
    isOverLimit;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[540px] gap-4 rounded-2xl">
        <DialogHeader className="pb-2 border-b border-border/40">
          <DialogTitle className="flex items-center gap-3">
            <UserAvatar user={user} size="default" />
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {user ? user.firstName + " " + user.lastName : "Create post"}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full mt-1">
                <Globe className="size-3" />
                Post to Anyone
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="What do you want to talk about? Share an update, idea, or milestone..."
            className="min-h-[140px] border-none shadow-none focus-visible:ring-0 px-0 resize-none text-sm leading-relaxed placeholder:text-muted-foreground"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createPostMutation.isPending}
          />

          {/* Quick Emoji Bar */}
          {showEmojis && (
            <div className="flex items-center gap-1.5 p-2 bg-muted/40 rounded-xl border border-border/40">
              <span className="text-xs text-muted-foreground mr-1">Quick Add:</span>
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="hover:scale-125 transition-transform text-base p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Image Preview */}
          {previewUrl && selectedImage ? (
            <div className="relative rounded-xl overflow-hidden border bg-muted group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="selected preview"
                className="w-full h-auto max-h-[300px] object-contain"
              />
              <Button
                variant="secondary"
                size="icon-sm"
                className="absolute top-2 right-2 rounded-full shadow-md bg-background/80 hover:bg-background"
                onClick={handleRemoveImage}
                disabled={createPostMutation.isPending}
              >
                <X className="size-4" />
              </Button>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-mono">
                {selectedImage.name}
              </div>
            </div>
          ) : null}

          {/* Bottom Toolbar & Action */}
          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground rounded-full"
                onClick={() => fileInputRef.current?.click()}
                disabled={createPostMutation.isPending}
              >
                <ImageIcon className="size-4 text-emerald-500" />
                <span className="text-xs font-medium">Photo</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground rounded-full"
                onClick={() => setShowEmojis((v) => !v)}
              >
                <Smile className="size-4 text-amber-500" />
                <span className="text-xs font-medium">Emoji</span>
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {charCount > 0 && (
                <span
                  className={`text-[11px] font-mono ${
                    isOverLimit
                      ? "text-destructive font-bold"
                      : charCount > 2500
                        ? "text-amber-500"
                        : "text-muted-foreground"
                  }`}
                >
                  {charCount}/{MAX_CHAR_LIMIT}
                </span>
              )}

              <Button
                onClick={handlePostCreation}
                disabled={isDisabled}
                className="rounded-full px-6 text-xs font-semibold"
              >
                {createPostMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin size-3.5 mr-1" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
