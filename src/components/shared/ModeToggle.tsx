"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

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
