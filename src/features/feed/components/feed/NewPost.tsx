"use client";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef, useState, useCallback } from "react";
import { NewPostModal } from "./NewPostModal";

export const NewPost = () => {
  const user = useAuthStore((s) => s.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      setIsModalOpen(open);
      if (!open) {
        setTimeout(() => clearImage(), 200);
      }
    },
    [clearImage]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        return;
      }
      setSelectedImage(file);
      setIsModalOpen(true);
    }
  };

  const handleAfterPost = useCallback(() => {
    clearImage();
    setIsModalOpen(false);
  }, [clearImage]);

  return (
    <>
      <Card className="p-3 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-row items-center gap-2">
            <UserAvatar user={user} size="default" />
            <Button
              variant="outline"
              className="flex-1 justify-start rounded-full text-muted-foreground font-normal"
              onClick={() => setIsModalOpen(true)}
            >
              What do you want to talk about?
            </Button>
            <Button
              variant="ghost"
              className="flex gap-1 text-muted-foreground hover:text-primary cursor-pointer shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="size-5" />
              <p className="hidden lg:block">Photo</p>
            </Button>
            <Input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
      </Card>
      <NewPostModal
        fileInputRef={fileInputRef}
        selectedImage={selectedImage}
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalOpenChange}
        onPostSuccess={handleAfterPost}
        clearImage={clearImage}
      />
    </>
  );
};

