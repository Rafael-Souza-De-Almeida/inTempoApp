"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { useNotification } from "@/components/notification";
import { CreatePost } from "@/components/post/CreatePost";
import { PostList } from "@/components/post/PostList";
import { useUserLikes } from "@/components/post/UserLikesContext";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useBookmark } from "@/resources/Bookmark/bookmark_service";
import { useLike } from "@/resources/like/like_service";
import { Post } from "@/resources/post/post_resources";
import { usePost } from "@/resources/post/post_service";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading, setLoading } = useLoading();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const [userData, setUserData] = useState<User>();
  const { userLikes, setUserLikes } = useUserLikes();
  const [userBookmarks, setUserBookmarks] = useState<Map<number, number>>(
    new Map<number, number>()
  );
  const [posts, setPosts] = useState<Post[] | undefined>();
  const auth = useAuth();
  const likeService = useLike();
  const notification = useNotification();
  const postService = usePost();
  const bookmarkService = useBookmark();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const result = await auth.getUserData();
        setUserData(result);
        setIsLoggedIn(true);
      } catch (error: any) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const result = await postService.getAllPosts();
        setPosts(result);
      } catch (error: any) {
        const message = error.message;
        notification.notify(message, "error");
      }
    };

    const listAllBookmarks = async () => {
      try {
        const result = await bookmarkService.getAllUserBookmarks();
        result.map((bookmark) =>
          setUserBookmarks(userBookmarks.set(bookmark.post_id, bookmark.id))
        );
      } catch (error: any) {
        const message = error.message;
        console.log(message);
      }
    };

    fetchAllPosts();
    fetchUser();

    listAllBookmarks();
  }, []);

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div>
        <CreatePost userData={userData} posts={posts} setPosts={setPosts} />
        <PostList
          posts={posts}
          userBookmarks={userBookmarks}
          setUserBookmarks={setUserBookmarks}
        />
      </div>
    </div>
  );
}
