"use client";

export const JobsSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-32" />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="h-6 bg-muted rounded-full w-20" />
            <div className="h-6 bg-muted rounded-full w-16" />
            <div className="h-6 bg-muted rounded-full w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};
