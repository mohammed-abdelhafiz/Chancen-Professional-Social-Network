import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface props {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  selectedImage: File | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const NewPostModal = ({
  fileInputRef,
  selectedImage,
  isModalOpen,
  setIsModalOpen,
}: props) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
        </DialogHeader>
        <div className="h-200px flex flex-col justify-between items-start gap-y-2 ">
          <Textarea
            placeholder="What do you want to talk about?"
            className="h-full border-none focus:ring-0"
          />
          <Button
            variant={"ghost"}
            className="flex gap-1 text-muted-foreground hover:text-primary cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="size-5" />
            <p className="hidden lg:block">Photo</p>
          </Button>
        </div>
        {selectedImage ? (
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="selected image"
            width={200}
            height={200}
          />
        ) : null}
        <Button>Post</Button>
      </DialogContent>
    </Dialog>
  );
};
