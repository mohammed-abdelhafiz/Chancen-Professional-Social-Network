"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetConnectionRequests } from "../hooks/useGetConnectionRequests";
import { ConnectionRequestCard } from "./ConnectionRequestCard";
import { UsersIcon } from "lucide-react";
import { ConnectionRequest } from "../types/network";

export const PendingRequests = () => {
  const { data: requests, isLoading } = useGetConnectionRequests();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="size-5" />
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                <div className="size-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-40" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!requests?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UsersIcon className="size-5" />
          Pending Requests
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {requests.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {requests.map((request: ConnectionRequest) => (
            <ConnectionRequestCard key={request.senderId} request={request} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
