import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/auth.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Logged in successfully!");
      await queryClient.refetchQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to login");
      } else toast.error("Failed to login");
    },
  });
};
