import { LoginForm } from "@/features/auth/components/LoginForm";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export default function LoginPage() {
  return (
    <AnimatedPage className="flex w-full justify-center">
      <LoginForm />
    </AnimatedPage>
  );
}
