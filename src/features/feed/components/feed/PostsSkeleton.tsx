import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const PostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <div className="size-10 rounded-full bg-muted" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="h-3 w-1/4 bg-muted rounded" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-4/5 bg-muted rounded" />
            <div className="h-48 w-full bg-muted rounded-md mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

