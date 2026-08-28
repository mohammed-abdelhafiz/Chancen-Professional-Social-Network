import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, X } from "lucide-react";
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

export const NewPostModal = ({
  fileInputRef,
  selectedImage,
  isModalOpen,
  setIsModalOpen,
  onPostSuccess,
  clearImage,
}: Props) => {
  const [content, setContent] = useState("");
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
      // Small delay to avoid clearing during exit animation flash
      const t = setTimeout(() => {
        if (!createPostMutation.isPending) {
          setContent("");
        }
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isModalOpen, createPostMutation.isPending]);

  const handleRemoveImage = () => {
    clearImage();
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

  const isDisabled =
    (!selectedImage && !content.trim().length) || createPostMutation.isPending;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[520px] gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <UserAvatar user={user} size="default" />
            <span className="text-sm font-semibold">
              {user ? user.firstName + " " + user.lastName : "Create post"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="What do you want to talk about?"
            className="min-h-[120px] border-none shadow-none focus-visible:ring-0 px-0 resize-none text-base placeholder:text-muted-foreground"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={createPostMutation.isPending}
          />

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
                className="absolute top-2 right-2 rounded-full shadow-md"
                onClick={handleRemoveImage}
                disabled={createPostMutation.isPending}
              >
                <X className="size-4" />
              </Button>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {selectedImage.name}
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
              onClick={() => fileInputRef.current?.click()}
              disabled={createPostMutation.isPending}
            >
              <ImageIcon className="size-5" />
              Photo
            </Button>

            <Button
              onClick={handlePostCreation}
              disabled={isDisabled}
              className="rounded-full px-6"
            >
              {createPostMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin size-4" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

