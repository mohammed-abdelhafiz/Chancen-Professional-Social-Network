"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Globe, Send, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Post } from "../../types/post";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

export const SharePostModal = ({ isOpen, onClose, post }: Props) => {
  const [copied, setCopied] = useState(false);
  const postUrl = typeof window !== "undefined" ? `${window.location.origin}/posts/${post.id}` : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast.success("Post link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out this post on Chancen by ${post.user.firstName}:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(postUrl)}`, "_blank");
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, "_blank");
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out this post on Chancen: ${postUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md gap-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <Share2 className="size-4 text-primary" />
            Share Post
          </DialogTitle>
        </DialogHeader>

        {/* Post snippet preview */}
        <div className="p-3 bg-muted/40 rounded-xl border border-border/50 text-xs space-y-1">
          <p className="font-semibold text-foreground">
            {post.user.firstName} {post.user.lastName}
          </p>
          <p className="text-muted-foreground line-clamp-2">{post.content || "Shared a photo"}</p>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shareToTwitter}
            className="flex items-center gap-1.5 rounded-xl hover:bg-muted text-xs font-medium"
          >
            <Globe className="size-3.5 text-sky-500" />
            <span>Twitter / X</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={shareToLinkedIn}
            className="flex items-center gap-1.5 rounded-xl hover:bg-muted text-xs font-medium"
          >
            <Globe className="size-3.5 text-blue-600" />
            <span>LinkedIn</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={shareToWhatsApp}
            className="flex items-center gap-1.5 rounded-xl hover:bg-muted text-xs font-medium"
          >
            <MessageSquare className="size-3.5 text-emerald-500" />
            <span>WhatsApp</span>
          </Button>
        </div>

        {/* 1-Click Copy Link */}
        <div className="space-y-1.5 pt-2 border-t">
          <label className="text-xs font-medium text-muted-foreground">Or copy link directly</label>
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={postUrl}
              className="text-xs h-9 bg-muted/30 font-mono"
            />
            <Button
              size="sm"
              onClick={handleCopy}
              className="shrink-0 rounded-xl gap-1.5 h-9"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
