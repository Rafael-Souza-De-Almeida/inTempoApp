"use client";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  SignUpAttributes,
  signUpIntialValues,
  SignUpValidationSchema,
} from "@/validation/signUpValidation";
import { useFormik } from "formik";
import { useAuth } from "@/resources/auth/auth_service";
import { useNotification } from "../notification";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();

  const { values, handleSubmit, handleChange, errors } =
    useFormik<SignUpAttributes>({
      initialValues: signUpIntialValues,
      validationSchema: SignUpValidationSchema,
      onSubmit: onSubmit,
    });

  async function onSubmit() {
    try {
      await auth.save(values);
      router.push("/login");
      notification.notify("Usuário cadastrado com sucesso!", "success");
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastre-se</CardTitle>
          <CardDescription>Faça cadastro no InTempo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Nome</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Rafael Almeida"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  name="username"
                  type="text"
                  placeholder="MrLendario"
                  value={values.username}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-red-500">{errors.username}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-red-500">{errors.password}</p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirme a Senha</Label>
                </div>
                <Input
                  name="passwordMatch"
                  type="password"
                  value={values.passwordMatch}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-red-500">{errors.passwordMatch}</p>
              </div>
              <Button type="submit" className="w-full">
                Cadastrar-se
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{" "}
              <a href="/login" className="underline underline-offset-4">
                Faça Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
