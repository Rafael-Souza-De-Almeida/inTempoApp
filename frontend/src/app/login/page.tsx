import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12">
      <div className="w-[450px]">
        <LoginForm />
      </div>
    </div>
  );
}
