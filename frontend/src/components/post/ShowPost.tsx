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
import { Comment } from "@/resources/comment/comment_resources";
import { TimeAgo } from "../timeAgo/timeAgo";
import { useUserData } from "../userContext";
import { usePost } from "@/resources/post/post_service";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useNotification } from "../notification";
import { redirect } from "next/navigation";

interface ShowPostProps {
  post: ShowPostAttributes | undefined;
  handleDeletePost: (postId: number) => void;
}

export function ShowPost({ post, handleDeletePost }: ShowPostProps) {
  if (!post) {
    return;
  }

  const { userLikes, handleLike } = useUserLikes();
  const [likeQuantity, setLikeQuantity] = useState(post.likeQuantity);
  const { userBookmarks, handleBookmark } = useUserBookmarks();
  const { isLoggedIn } = useIsLoggedIn();
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const { userData } = useUserData();

  return (
    <div className="flex flex-col gap-4 border border-primary text-white w-[600px] px-6 py-5 rounded-lg shadow-md ">
      <SplittedContainer
        profile_pic={post?.profile_pic}
        name={post?.name}
        classname="items-center"
      >
        <div className="flex gap-4 items-center relative">
          <p className="font-semibold">@{post?.username}</p>
          <TimeAgo created_at={post.created_at} />
          {userData?.id === post.user_id ? (
            <Trash2
              className="cursor-pointer "
              color="red"
              size={16}
              onClick={() => handleDeletePost(post.id)}
            />
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col mt-2 cursor-pointer">
          <p> {post?.content} </p>
        </div>

        <div className="flex items-center  w-full gap-48 text-gray-500 dark:text-gray-400 text-sm mt-4">
          <div className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-all">
            <MessageCircle size={18} />
            <p>{post?.commentsQuantity}</p>
          </div>

          <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-all">
            {userLikes.get(post.id) ? (
              <div
                onClick={() => {
                  handleLike(post);
                  setLikeQuantity((prev) => prev - 1);
                }}
                className="flex items-center gap-2"
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
                className="flex items-center gap-2"
              >
                <Heart size={18} />
                <p>{likeQuantity}</p>
              </div>
            )}
          </div>

          <div
            onClick={() => handleBookmark(post)}
            className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-all"
          >
            {userBookmarks.has(post.id) ? (
              <Bookmark size={18} fill="white" color="white" />
            ) : (
              <Bookmark size={18} />
            )}
          </div>
        </div>

        <hr className="mt-4" />

        <div className="w-[450px] mt-8">
          <CreateComment
            post={post}
            profile_pic={userData?.image_url}
            name={userData?.name}
            comments={comments}
            setComments={setComments}
          />
        </div>

        {comments.length > 0 ? (
          <div>
            <hr className="mt-8" />
            <div className="space-y-8 mt-8">
              <CommentList comments={comments} />
            </div>
          </div>
        ) : (
          ""
        )}
      </SplittedContainer>
    </div>
  );
}
