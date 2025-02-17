"use client";

import { useNotification } from "@/components/notification";
import { ShowPost } from "@/components/post/ShowPost";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { ShowPostAttributes } from "@/resources/post/post_resources";
import { usePost } from "@/resources/post/post_service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPost() {
  const { id } = useParams();
  const postService = usePost();
  const [post, setPost] = useState<ShowPostAttributes>();
  const [userData, setUserData] = useState<User>();
  const auth = useAuth();
  const notification = useNotification();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPost = async () => {
      try {
        const postId = Number(id);
        const result = await postService.showPost(postId);
        setPost(result);
      } catch (error: any) {
        const message = error.message;
        notification.notify(message, "error");
      }
    };

    const fetchUser = async () => {
      try {
        const result = await auth.getUserData();
        setUserData(result);
      } catch (error: any) {
        return;
      }
    };

    fetchPost();
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <ShowPost
          post={post}
          profile_pic={userData?.image_url}
          name={userData?.name}
        />
      </div>
    </div>
  );
}
