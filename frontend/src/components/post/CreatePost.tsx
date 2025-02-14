"use client";

import { useAuth } from "@/resources/auth/auth_service";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SplittedContainer } from "./SplittedContainer";
import { User } from "@/resources/auth/auth_resources";
import { useEffect, useState } from "react";
import { usePost } from "@/resources/post/post_service";
import { useNotification } from "../notification";

export function CreatePost() {
  const [userData, setUserData] = useState<User>();
  const [content, setContent] = useState<string>("");
  const auth = useAuth();
  const post_service = usePost();
  const notification = useNotification();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await auth.getUserData();
        setUserData(result);
      } catch (error: any) {
        return;
      }
    };

    fetchUser();
  }, []);

  async function createNewPost() {
    try {
      const result = await post_service.createPost(content);
      notification.notify("Post criado com sucesso", "success");
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  }

  return (
    <SplittedContainer
      profile_pic={userData?.image_url}
      name={userData?.name}
      classname="mb-12"
    >
      <div className="flex flex-col space-y-4">
        <Textarea
          className="w-[500px] h-[100px]"
          placeholder="Escreva o que estiver pensando..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={() => createNewPost()}>Criar post</Button>
      </div>
    </SplittedContainer>
  );
}
