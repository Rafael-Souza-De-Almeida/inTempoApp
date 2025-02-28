"use client";

import { useAuth } from "@/resources/auth/auth_service";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SplittedContainer } from "./SplittedContainer";
import { User } from "@/resources/auth/auth_resources";
import { useEffect, useState } from "react";
import { usePost } from "@/resources/post/post_service";
import { useNotification } from "../notification";
import { useIsLoggedIn } from "../login/LoginContext";
import { useFormik } from "formik";
import {
  formScheme,
  PostAttributes,
  validationSchema,
} from "@/validation/postValidation";
import { Post } from "@/resources/post/post_resources";
import { useUserData } from "../userContext";

interface CreatePostProps {
  posts: Post[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}

export function CreatePost({ posts, setPosts }: CreatePostProps) {
  const post_service = usePost();
  const notification = useNotification();
  const { isLoggedIn } = useIsLoggedIn();
  const { userData } = useUserData();

  const { values, handleSubmit, handleChange, errors } =
    useFormik<PostAttributes>({
      initialValues: formScheme,
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
        await createNewPost(resetForm);
      },
    });

  async function createNewPost(resetForm: () => void) {
    try {
      const result = await post_service.createPost(values.content);
      notification.notify("Post criado com sucesso", "success");
      posts?.map(() => setPosts([result, ...posts]));
      resetForm();
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  }

  return isLoggedIn ? (
    <SplittedContainer
      profile_pic={userData?.image_url}
      name={userData?.name}
      classname="mb-12"
    >
      <div className="flex flex-col space-y-4">
        <form onSubmit={handleSubmit}>
          {errors.content ? (
            <p className="text-red-500 text-sm mb-4">{errors.content}</p>
          ) : (
            ""
          )}
          <Textarea
            className="min-w-[280px] min-h-[100px] md:w-[500px] md:h-[100px]"
            placeholder="Escreva o que estiver pensando..."
            value={values.content}
            onChange={handleChange("content")}
          />
          <Button className="w-full mt-4" type="submit">
            Criar post
          </Button>
        </form>
      </div>
    </SplittedContainer>
  ) : (
    <h1 className="mb-12">Faça login para adicionar um post...</h1>
  );
}
