import { User } from "@/features/auth/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(user: User | null) {
  return user?.firstName && user?.lastName
    ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
    : user?.firstName
      ? user.firstName[0].toUpperCase()
      : "U";
}
