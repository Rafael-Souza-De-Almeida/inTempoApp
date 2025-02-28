"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { useNotification } from "@/components/notification";
import { CreatePost } from "@/components/post/CreatePost";
import { PostList } from "@/components/post/PostList";
import { useUserLikes } from "@/components/post/UserLikesContext";
import Sidebar from "@/components/sidebar/Sidebar";
import { useUserData } from "@/components/userContext";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useBookmark } from "@/resources/Bookmark/bookmark_service";
import { useLike } from "@/resources/like/like_service";
import { Post } from "@/resources/post/post_resources";
import { usePost } from "@/resources/post/post_service";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading } = useLoading();
  const { isLoggedIn } = useIsLoggedIn();

  const [posts, setPosts] = useState<Post[] | undefined>();
  const auth = useAuth();
  const notification = useNotification();
  const postService = usePost();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const result = await postService.getAllPosts();
        setPosts(result);
      } catch (error: any) {
        const message = error.message;
        notification.notify(message, "error");
      }
    };

    fetchAllPosts();
  }, []);

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols[10%_90%] gap-32 py-16 px-9 md:grid md:grid-cols-[20%_80%] md:gap-24 md:p-24 md:min-h-screen ">
      <div>
        <Sidebar />
      </div>
      <div>
        <CreatePost posts={posts} setPosts={setPosts} />
        <PostList posts={posts} />
      </div>
    </div>
  );
}
