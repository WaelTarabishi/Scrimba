import { LoginForm } from "@/components/ui/auth/login-form";
import { RegisterForm } from "@/components/ui/auth/register-form";
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
