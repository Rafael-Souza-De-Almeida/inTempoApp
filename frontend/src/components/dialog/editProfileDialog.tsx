"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EditUserAttributes,
  editUserInitialValues,
  editUserSchema,
} from "@/validation/editUserValidation";
import { useFormik } from "formik";
import { useUserData } from "../userContext";
import { useState } from "react";
import { useAuth } from "@/resources/auth/auth_service";
import { UpdateUser } from "@/resources/auth/auth_resources";
import { useNotification } from "../notification";
import { error } from "console";

export function EditProfileDialog() {
  const auth = useAuth();
  const notification = useNotification();

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    useFormik({
      initialValues: editUserInitialValues,
      validationSchema: editUserSchema,
      onSubmit: (values) => {
        handleEditProfile();
      },
    });

  console.log("🛠 Erros de validação:", errors);
  async function handleEditProfile() {
    console.log("clicado!");
    try {
      await auth.editUserProfile(values);

      window.location.reload();
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-full p-5">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Faça mudanças no seu perfil e confirme quando tiver finalizado.
            (Deixe em branco os campos que não deseja alterar ! )
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                value={values.name}
                onChange={handleChange}
                id="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={values.username}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="space-y-2 mt-2 items-center">
              <Label htmlFor="email" className="text-center">
                Foto de perfil
              </Label>
              <Input
                id="profile_pic"
                type="File"
                className="col-span-3 cursor-pointer"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  setFieldValue("profilePic", file);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Editar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
