"use client";

import { Button } from "@/components/ui/button";
import { Repeat2Icon } from "lucide-react";
import { useCreateRepost } from "../hooks/useCreateRepost";
import { useDeleteRepost } from "../hooks/useDeleteRepost";
import { useHasReposted } from "../hooks/useHasReposted";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  postId: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm";
}

export const RepostButton = ({ postId, size = "sm" }: Props) => {
  const { data } = useHasReposted(postId);
  const createRepost = useCreateRepost();
  const deleteRepost = useDeleteRepost();
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const hasReposted = data?.reposted || false;

  const handleRepost = () => {
    if (hasReposted) {
      deleteRepost.mutate(postId);
      return;
    }
    createRepost.mutate(
      { postId, content: content.trim() || undefined },
      {
        onSuccess: () => {
          setContent("");
          setIsOpen(false);
        },
      }
    );
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (hasReposted) {
      e.preventDefault();
      deleteRepost.mutate(postId);
    }
  };

  if (hasReposted) {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={() => deleteRepost.mutate(postId)}
        disabled={deleteRepost.isPending}
        className={cn("flex-1 gap-2 text-green-600 hover:text-green-700")}
      >
        <Repeat2Icon className="size-4" />
        <span className="hidden sm:inline text-xs font-medium">Reposted</span>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size={size}
            className="flex-1 gap-2 text-muted-foreground hover:text-foreground"
          />
        }
      >
        <Repeat2Icon className="size-4" />
        <span className="hidden sm:inline text-xs font-medium">Repost</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Repost with commentary</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Add a comment (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end gap-2">
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button onClick={handleRepost} disabled={createRepost.isPending}>
            {createRepost.isPending ? "Posting..." : "Repost"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
