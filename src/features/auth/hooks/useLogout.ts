import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.clear();
      setUser(null);
      toast.success("Logged out successfully!");
      router.replace("/sign-in");
    },
    onError: (error) => {
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.clear();
      setUser(null);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to logout");
      } else {
        toast.error("Failed to logout");
      }
      router.replace("/sign-in");
    },
  });
};
