import { Logo } from "@/components/layout/header/Logo";
import { Nav } from "./Nav";
import { UserButton } from "./UserButton";

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-4">
      <div className="flex items-center gap-2">
        <Logo />
        <span>search</span>
      </div>
      <div className="flex items-center gap-8">
        <Nav />
        <UserButton />
      </div>
    </div>
  );
};
