import { ModeToggle } from "@/components/shared/ModeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { TrashIcon, LogOutIcon, ShieldIcon, BellIcon, PaletteIcon } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    setIsDeleting(true);
    try {
      await api.delete(`/users/${user.id}`);
      toast.success("Account deleted");
      await logout.mutateAsync();
      router.push("/sign-in");
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings and preferences.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <PaletteIcon className="size-4" /> Appearance
            </h3>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">Theme</span>
              <ModeToggle />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <BellIcon className="size-4" /> Notifications
            </h3>
            <p className="text-xs text-muted-foreground">Manage notification preferences from the notifications page.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => { onOpenChange(false); router.push("/notifications"); }}>
              Go to Notifications
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <ShieldIcon className="size-4" /> Account
            </h3>
            {user && (
              <div className="rounded-lg border p-3 space-y-1">
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            )}
            <Button variant="outline" size="sm" className="w-full" onClick={() => logout.mutate()}>
              <LogOutIcon className="size-4 mr-1" /> Sign out
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
              <TrashIcon className="size-4" /> Danger Zone
            </h3>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
            <p className="text-xs text-muted-foreground">Permanently delete your account and all data.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
