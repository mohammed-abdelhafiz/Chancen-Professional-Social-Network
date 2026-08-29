"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto size-20 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
          <AlertTriangle className="size-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {error.message || "An unexpected error occurred while loading this page."}
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-muted-foreground/60 bg-muted/40 py-1 px-2 rounded-md max-w-xs mx-auto truncate">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} className="w-full sm:w-auto rounded-full gap-2 font-medium">
            <RotateCcw className="size-4" />
            Try Again
          </Button>
          <Link href="/feed" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto rounded-full gap-2">
              <Home className="size-4" />
              Go to Feed
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
