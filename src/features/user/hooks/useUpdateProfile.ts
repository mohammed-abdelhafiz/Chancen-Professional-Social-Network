"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/users.api";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
