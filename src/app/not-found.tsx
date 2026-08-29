import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home, Search, Users } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto size-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
          <Compass className="size-12 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[9px] font-bold text-primary-foreground items-center justify-center">!</span>
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/feed" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-full gap-2 font-medium">
              <Home className="size-4" />
              Back to Home Feed
            </Button>
          </Link>
          <Link href="/my-network" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto rounded-full gap-2">
              <Users className="size-4" />
              My Network
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
