import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity inline-flex items-center"
    >
      Chancen
    </Link>
  );
};
