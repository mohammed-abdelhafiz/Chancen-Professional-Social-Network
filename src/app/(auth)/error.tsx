"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">{error.message || "Failed to load"}</p>
        <Button size="sm" onClick={() => reset()}>Retry</Button>
      </div>
    </div>
  );
}
