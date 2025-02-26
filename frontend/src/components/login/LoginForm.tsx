"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import {
  formScheme,
  LoginAttributes,
  validationSchema,
} from "@/validation/loginValidation";
import { useAuth } from "@/resources/auth/auth_service";
import { useNotification } from "../notification";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useIsLoggedIn } from "./LoginContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { values, handleSubmit, handleChange } = useFormik<LoginAttributes>({
    initialValues: formScheme,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  async function onSubmit() {
    try {
      await auth.authenticate(values);
      setIsLoggedIn(true);
      router.push("/");
      notification.notify("Seja bem-vindo!", "success");
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Faça login no InTempo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
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
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <a href="/sign_up" className="underline underline-offset-4">
                Cadastre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
