import { Logo } from "@/components/layout/header/Logo";
import { NavDesktop } from "./NavDesktop";
import { UserButton } from "./UserButton";
import { NavMobile } from "./NavMobile";

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-4">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="items-center gap-16 hidden md:flex">
        <NavDesktop />
        <UserButton />
      </div>
      <NavMobile />
    </div>
  );
};
