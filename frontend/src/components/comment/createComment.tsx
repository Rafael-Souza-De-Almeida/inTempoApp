"use client";

import { Post } from "@/resources/post/post_resources";
import { useIsLoggedIn } from "../login/LoginContext";
import { SplittedContainer } from "../post/SplittedContainer";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useNotification } from "../notification";
import { useComment } from "@/resources/comment/comment_service";
import { useState } from "react";
import { useFormik } from "formik";
import {
  CommentAttributes,
  validationSchema,
} from "@/validation/commmentValidation";
import { formScheme } from "@/validation/postValidation";
import { Comment } from "@/resources/comment/comment_resources";

interface CreateComment {
  post: Post;
  profile_pic: string | null | undefined;
  name: string | undefined;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export function CreateComment({
  profile_pic,
  name,
  post,
  comments,
  setComments,
}: CreateComment) {
  const { isLoggedIn } = useIsLoggedIn();
  const notification = useNotification();
  const commentService = useComment();

  if (!isLoggedIn) {
    return <p>Faça login para adicionar um comentário</p>;
  }

  const { values, handleChange, handleSubmit, errors } =
    useFormik<CommentAttributes>({
      initialValues: formScheme,
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleAddComment(post.id, resetForm);
      },
    });
  const handleAddComment = async (postId: number, resetForm: () => void) => {
    try {
      const result = await commentService.save(postId, values.content);
      notification.notify("Comentário realizado com sucesso!", "success");
      setComments((prevComments) => {
        return prevComments.length > 0 ? [result, ...prevComments] : [result];
      });
      resetForm();
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  return (
    <SplittedContainer
      profile_pic={profile_pic}
      name={name}
      classname="space-y-2 w-full"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-full">
          <Textarea
            className="w-full h-24 md:pb-12 "
            placeholder="Diga algo sobre esse post..."
            value={values.content}
            onChange={handleChange("content")}
          />
          <Button className="w-full">Adicionar comentário</Button>

          {errors.content ? (
            <p className="text-red-500 text-sm">{errors.content}</p>
          ) : (
            ""
          )}
        </div>
      </form>
    </SplittedContainer>
  );
}
