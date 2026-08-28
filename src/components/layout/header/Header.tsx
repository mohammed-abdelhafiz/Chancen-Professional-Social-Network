import { Logo } from "@/components/layout/header/Logo";
import { NavDesktop } from "./NavDesktop";
import { UserButton } from "./UserButton";
import { NavMobile } from "./NavMobile";
import { NotificationDropdown } from "@/features/notifications/components/NotificationDropdown";
import { SearchBar } from "@/features/search/components/SearchBar";

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-4">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <SearchBar />
      </div>
      <div className="items-center gap-4 hidden md:flex">
        <NavDesktop />
        <NotificationDropdown />
        <UserButton />
      </div>
      <NavMobile />
    </div>
  );
};
