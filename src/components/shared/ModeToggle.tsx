"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <p className="font-semibold">Dark Mode</p>
      <Switch
        id="dark"
        checked={resolvedTheme === "dark"}
        onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
      />
    </div>
  );
}
