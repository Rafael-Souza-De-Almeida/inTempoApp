"use client";

import { Post } from "@/resources/post/post_resources";
import { usePost } from "@/resources/post/post_service";
import { useEffect, useState } from "react";
import { useNotification } from "../notification";
import { PostTemplate } from "./PostTemplate";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

export function PostList() {
  const [posts, setPosts] = useState<Post[]>();
  const postService = usePost();
  const notification = useNotification();

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

  return (
    <div className="space-y-5">
      {posts?.map((post) => (
        <PostTemplate post={post} key={post.id} />
      ))}
    </div>
  );
}
