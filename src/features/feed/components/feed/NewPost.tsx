"use client";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { NewPostModal } from "./NewPostModal";

export const NewPost = () => {
  const user = useAuthStore((s) => s.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Card className="p-3">
        <CardContent className="p-0">
          <div className="flex flex-row items-center gap-2">
            <UserAvatar user={user} size="default" />
            <Button
              variant={"outline"}
              className="flex-1 justify-start rounded-full"
              onClick={() => setIsModalOpen(true)}
            >
              What do you want to talk about?
            </Button>
            <Button
              variant={"ghost"}
              className="flex gap-1 text-muted-foreground hover:text-primary cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="size-5" />
              <p className="hidden lg:block">Photo</p>
            </Button>
            <Input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                setSelectedImage(e.target.files?.[0] || null);
                setIsModalOpen(true);
              }}
            />
          </div>
        </CardContent>
      </Card>
      <NewPostModal
        fileInputRef={fileInputRef}
        selectedImage={selectedImage}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
