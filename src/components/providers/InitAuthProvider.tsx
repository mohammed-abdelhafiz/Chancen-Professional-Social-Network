"use client";

import { useGetMe } from "@/features/auth/hooks/useGetMe";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const InitAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: me, isLoading } = useGetMe();

  const setUser = useAuthStore((state) => state.setUser);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (me) {
      setUser(me);

      if (pathname === "/sign-in" || pathname === "/register") {
        router.replace("/");
      }
    }
  }, [me, pathname, router, setUser]);

  useEffect(() => {
    if (!isLoading && !me) {
      if (pathname !== "/sign-in" && pathname !== "/register") {
        router.replace("/sign-in");
      }
    }
  }, [isLoading, me, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return children;
};
