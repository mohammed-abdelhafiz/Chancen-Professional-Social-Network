"use client";

import { useQuery } from "@tanstack/react-query";
import { getConnectionStatus } from "../services/network.api";

export const useGetConnectionStatus = (userId?: string) => {
  return useQuery({
    queryKey: ["connection-status", userId],
    queryFn: () => getConnectionStatus(userId!),
    enabled: !!userId,
  });
};
