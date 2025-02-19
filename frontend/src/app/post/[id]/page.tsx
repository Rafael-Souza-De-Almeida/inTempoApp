"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { useNotification } from "@/components/notification";
import { ShowPost } from "@/components/post/ShowPost";
import Sidebar from "@/components/sidebar/Sidebar";
import { ShowPostAttributes } from "@/resources/post/post_resources";
import { usePost } from "@/resources/post/post_service";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPost() {
  const { id } = useParams();
  const postService = usePost();
  const [post, setPost] = useState<ShowPostAttributes>();
  const notification = useNotification();
  const { loading } = useLoading();
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();

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

    fetchPost();
  }, []);

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }

  const handleDeletePost = async (postId: number) => {
    const isConfirmed = window.confirm(
      "Voce têm certeza que deseja apagar esse post?"
    );

    if (!isConfirmed) return;

    try {
      await postService.delete(postId);
      router.push("/");
      notification.notify("Post deletado com sucesso!", "success");
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <ShowPost post={post} handleDeletePost={handleDeletePost} />
      </div>
    </div>
  );
}
