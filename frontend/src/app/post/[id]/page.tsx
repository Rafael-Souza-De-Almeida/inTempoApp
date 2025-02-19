"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { useNotification } from "@/components/notification";
import { ShowPost } from "@/components/post/ShowPost";
import { useUserLikes } from "@/components/post/UserLikesContext";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useLike } from "@/resources/like/like_service";
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
  const { loading, setLoading } = useLoading();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { userLikes, setUserLikes } = useUserLikes();
  const likeService = useLike();

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
        setIsLoggedIn(true);
      } catch (error: any) {
        return;
      }
    };

    fetchPost();
    fetchUser();
  }, []);

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }

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
