"use client";

import { Post } from "@/resources/post/post_resources";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { SplittedContainer } from "./SplittedContainer";
import { Like } from "@/resources/like/like_resources";
import { useLike } from "@/resources/like/like_service";
import { useIsLoggedIn } from "../login/LoginContext";
import { useNotification } from "../notification";
import { useState } from "react";

interface PostProps {
  post: Post;
  userLikes: Map<number, number>;
  setUserLikes: React.Dispatch<React.SetStateAction<Map<number, number>>>;
}

export function PostTemplate({ post, userLikes, setUserLikes }: PostProps) {
  const likeService = useLike();
  const [likeQuantity, setLikeQuantity] = useState(post.likeQuantity);
  const { isLoggedIn } = useIsLoggedIn();
  const notification = useNotification();

  const handleAddLike = async (postId: number): Promise<Like | undefined> => {
    if (!isLoggedIn) {
      notification.notify(
        "É preciso entrar em sua conta para curtir esse post",
        "error"
      );
      return;
    }
    try {
      const result = await likeService.save(postId);
      return result;
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  const handleRemoveLike = async (
    likeId: number | undefined
  ): Promise<void> => {
    try {
      await likeService.delete(likeId);
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  const handleLike = async () => {
    if (userLikes.get(post.id)) {
      await handleRemoveLike(userLikes.get(post.id));
      setUserLikes((prev) => {
        const newLikes = new Map(prev);
        newLikes.delete(post.id);
        return newLikes;
      });

      setLikeQuantity((prev) => prev - 1);
    } else {
      const like = await handleAddLike(post.id);

      if (!like) {
        return;
      }
      setUserLikes((prev) => {
        const newLikes = new Map(prev);
        newLikes.set(post.id, like.id);
        return newLikes;
      });

      setLikeQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-primary text-white w-[600px] px-6 py-5 rounded-lg shadow-md">
      <SplittedContainer
        profile_pic={post.profile_pic}
        name={post.name}
        classname="flex-1 space-y-4"
      >
        <p className="font-semibold text-lg">@{post.username}</p>
        <p>{post.content}</p>

        <div className="flex justify-between items-center text-gray-400 text-sm">
          <div className="flex gap-2 items-center hover:text-gray-300 cursor-pointer">
            <MessageCircle size={18} />
            <p>{post.commentsQuantity}</p>
          </div>

          <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer">
            {userLikes.get(post.id) ? (
              <Heart onClick={handleLike} size={18} fill="red" color="red" />
            ) : (
              <Heart onClick={handleLike} size={18} />
            )}
            <p>{likeQuantity}</p>
          </div>

          <div className="flex gap-2 items-center hover:text-gray-300 cursor-pointer">
            <Bookmark size={18} />
          </div>
        </div>
      </SplittedContainer>
    </div>
  );
}
