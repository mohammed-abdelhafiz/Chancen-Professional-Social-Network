import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SocialLoginButtons = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={() => {
        window.location.href = `${apiUrl}/auth/google`;
      }}
    >
      <Image
        src={"/google-icon.svg"}
        width={16}
        height={16}
        alt="Continue with Google"
      />
      Continue with Google
    </Button>
  );
};
