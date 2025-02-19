"use client";

import { ShowPostAttributes } from "@/resources/post/post_resources";
import { comment } from "postcss";
import { SplittedContainer } from "./SplittedContainer";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { CommentList } from "../comment/commentList";
import { CreateComment } from "../comment/createComment";
import { useUserLikes } from "./UserLikesContext";
import { useState } from "react";
import { useIsLoggedIn } from "../login/LoginContext";
import { useUserBookmarks } from "./UserBookmarkContext";

interface ShowPostProps {
  post: ShowPostAttributes | undefined;
  profile_pic: string | null | undefined;
  name: string | undefined;
}

export function ShowPost({ post, profile_pic, name }: ShowPostProps) {
  if (!post) {
    return;
  }

  const { userLikes, handleLike } = useUserLikes();
  const [likeQuantity, setLikeQuantity] = useState(post.likeQuantity);
  const { userBookmarks, handleBookmark } = useUserBookmarks();
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <div className="flex flex-col gap-4 border border-primary text-white w-[600px] px-6 py-5 rounded-lg shadow-md ">
      <SplittedContainer
        profile_pic={post?.profile_pic}
        name={post?.name}
        classname="items-center"
      >
        <p className="font-semibold">@{post?.username}</p>

        <div className="flex flex-col mt-4 cursor-pointer">
          <p> {post?.content} </p>
        </div>

        <div className="flex items-center  w-full gap-48 text-gray-500 dark:text-gray-400 text-sm mt-4">
          <div className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-all">
            <MessageCircle size={18} />
            <p>{post?.commentsQuantity}</p>
          </div>

          <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-all">
            {userLikes.get(post.id) ? (
              <div className="flex items-center gap-2">
                <Heart
                  onClick={() => {
                    handleLike(post);
                    setLikeQuantity((prev) => prev - 1);
                  }}
                  size={18}
                  fill="red"
                  color="red"
                />
                <p>{likeQuantity}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Heart
                  size={18}
                  onClick={() => {
                    handleLike(post);
                    if (!isLoggedIn) return;
                    setLikeQuantity((prev) => prev + 1);
                  }}
                />
                <p>{likeQuantity}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-all">
            {userBookmarks.has(post.id) ? (
              <Bookmark
                size={18}
                fill="white"
                color="white"
                onClick={() => handleBookmark(post)}
              />
            ) : (
              <Bookmark size={18} onClick={() => handleBookmark(post)} />
            )}
          </div>
        </div>

        <hr className="mt-4" />

        <div className="w-[450px] mt-8">
          <CreateComment profile_pic={profile_pic} name={name} />
        </div>

        {post.comments.length > 0 ? (
          <div>
            <hr className="mt-8" />
            <div className="space-y-8 mt-8">
              <CommentList comments={post?.comments} />
            </div>
          </div>
        ) : (
          ""
        )}
      </SplittedContainer>
    </div>
  );
}
