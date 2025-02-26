import { SignUpForm } from "@/components/sign_up/signUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12">
      <div className="w-[450px]">
        <SignUpForm />
      </div>
    </div>
  );
}
