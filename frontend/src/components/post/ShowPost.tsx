import { ShowPostAttributes } from "@/resources/post/post_resources";
import { comment } from "postcss";
import { SplittedContainer } from "./SplittedContainer";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { CommentList } from "../comment/commentList";
import { CreateComment } from "../comment/createComment";

interface ShowPostProps {
  post: ShowPostAttributes | undefined;
  profile_pic: string | null | undefined;
  name: string | undefined;
}

export function ShowPost({ post, profile_pic, name }: ShowPostProps) {
  if (!post) {
    return;
  }

  return (
    <div className="flex flex-col gap-4 border border-primary text-white w-[600px] px-6 py-5 rounded-lg shadow-md ">
      <SplittedContainer
        profile_pic={post?.profile_pic}
        name={post?.name}
        classname="items-center"
      >
        <p>@{post?.username}</p>

        <div className="flex flex-col mt-4 cursor-pointer">
          <p> {post?.content} </p>
        </div>

        <div className="flex items-center  w-full gap-48 text-gray-500 dark:text-gray-400 text-sm mt-4">
          <div className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-all">
            <MessageCircle size={18} />
            <p>{post?.commentsQuantity}</p>
          </div>

          <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-all">
            <Heart size={18} />
            <p>{post?.likeQuantity}</p>
          </div>

          <div className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-all">
            <Bookmark size={18} />
          </div>
        </div>

        <hr className="mt-8" />

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
