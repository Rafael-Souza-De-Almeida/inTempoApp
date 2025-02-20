"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { useNotification } from "@/components/notification";
import { PostList } from "@/components/post/PostList";
import { PostTemplate } from "@/components/post/PostTemplate";
import Sidebar from "@/components/sidebar/Sidebar";
import { Bookmark } from "@/resources/Bookmark/bookmark_resources";
import { useBookmark } from "@/resources/Bookmark/bookmark_service";
import { Post } from "@/resources/post/post_resources";
import { useEffect, useState } from "react";

export default function Bookmarks() {
  const bookmarkService = useBookmark();
  const [postBookmarked, setPostBookmarked] = useState<Bookmark[]>([]);
  const notification = useNotification();
  const { isLoggedIn } = useIsLoggedIn();
  const { loading } = useLoading();

  useEffect(() => {
    const fetchAllUserBookmarks = async () => {
      try {
        const result = await bookmarkService.getAllUserBookmarks();
        setPostBookmarked(result);
      } catch (error: any) {
        return;
      }
    };
    fetchAllUserBookmarks();
  }, []);

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="w-full space-y-4">
        {isLoggedIn ? (
          postBookmarked.length > 0 ? (
            postBookmarked.map((postBookmarked) => (
              <PostTemplate
                post={postBookmarked.post}
                key={postBookmarked.id}
              />
            ))
          ) : (
            <h1>Você ainda não favoritou nenhum post!</h1>
          )
        ) : (
          <h1>Faça login para ver seus posts favoritos!</h1>
        )}
      </div>
    </div>
  );
}
