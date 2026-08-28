"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const BookmarksSkeleton = () => {
  return (
    <div className="py-6 px-4 max-w-2xl mx-auto w-full">
      <div className="h-8 w-32 bg-muted animate-pulse rounded mb-6" />

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="p-4 pb-3">
              <div className="flex gap-3">
                <div className="size-10 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
