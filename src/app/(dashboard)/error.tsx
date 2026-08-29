"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex w-full items-center justify-center py-16 px-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <AlertCircle className="size-10 text-destructive" />
        <h2 className="text-lg font-semibold">Failed to load</h2>
        <p className="text-sm text-muted-foreground">{error.message || "Please try again"}</p>
        <Button onClick={() => reset()} size="sm">Retry</Button>
      </div>
    </div>
  );
}
