import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { AnimatedPage } from "@/components/motion/AnimatedPage";

export default function RegisterPage() {
  return (
    <AnimatedPage className="flex w-full justify-center">
      <RegisterForm />
    </AnimatedPage>
  );
}
