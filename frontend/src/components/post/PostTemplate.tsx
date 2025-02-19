"use client";

import { Post } from "@/resources/post/post_resources";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { SplittedContainer } from "./SplittedContainer";
import { Like } from "@/resources/like/like_resources";
import { useLike } from "@/resources/like/like_service";
import { useIsLoggedIn } from "../login/LoginContext";
import { useNotification } from "../notification";
import { useState } from "react";
import { useBookmark } from "@/resources/Bookmark/bookmark_service";
import { useRouter } from "next/navigation";
import { useUserLikes } from "./UserLikesContext";
import { useUserBookmarks } from "./UserBookmarkContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TimeAgo } from "../timeAgo/timeAgo";

interface PostProps {
  post: Post;
}

export function PostTemplate({ post }: PostProps) {
  const { isLoggedIn } = useIsLoggedIn();
  const [likeQuantity, setLikeQuantity] = useState(post.likeQuantity);
  const { userLikes, handleLike } = useUserLikes();
  const { userBookmarks, handleBookmark } = useUserBookmarks();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 border border-primary text-white w-[600px] px-6 py-5 rounded-lg shadow-md cursor-pointer">
      <SplittedContainer
        profile_pic={post.profile_pic}
        name={post.name}
        classname="flex-1 space-y-4"
      >
        <div
          onClick={() => router.push(`/post/${post.id}`)}
          className="space-y-2"
        >
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-lg">@{post.username}</p>
            <TimeAgo created_at={post.created_at} />
          </div>
          <p>{post.content}</p>
        </div>

        <div className="flex justify-between items-center text-gray-400 text-sm">
          <div
            onClick={() => router.push(`/post/${post.id}`)}
            className="flex gap-2 items-center hover:text-gray-300 cursor-pointer"
          >
            <MessageCircle size={18} />
            <p>{post.commentsQuantity}</p>
          </div>

          <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer">
            {userLikes.get(post.id) ? (
              <div
                onClick={() => {
                  handleLike(post);

                  setLikeQuantity((prev) => prev - 1);
                }}
                className="flex gap-2 items-center"
              >
                <Heart size={18} fill="red" color="red" />
                <p>{likeQuantity}</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  handleLike(post);
                  if (!isLoggedIn) return;
                  setLikeQuantity((prev) => prev + 1);
                }}
                className="flex gap-2 items-center"
              >
                <Heart size={18} />
                <p>{likeQuantity}</p>
              </div>
            )}
          </div>

          <div
            onClick={() => handleBookmark(post)}
            className="flex gap-2 items-center hover:text-gray-300 cursor-pointer"
          >
            {userBookmarks.get(post.id) ? (
              <Bookmark size={18} fill="white" color="white" />
            ) : (
              <Bookmark size={18} />
            )}
          </div>
        </div>
      </SplittedContainer>
    </div>
  );
}
