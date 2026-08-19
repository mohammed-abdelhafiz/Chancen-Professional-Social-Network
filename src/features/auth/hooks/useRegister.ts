import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../services/auth.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,

    onSuccess: async () => {
      toast.success("Account created successfully!");

      await queryClient.refetchQueries({
        queryKey: ["me"],
      });
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to create account",
        );
      } else {
        toast.error("Failed to create account");
      }
    },
  });
};
