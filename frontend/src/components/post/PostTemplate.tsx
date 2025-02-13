import { Post } from "@/resources/post/post_resources";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

interface PostProps {
  post: Post;
}

export function PostTemplate({ post }: PostProps) {
  return (
    <div className="flex flex-col gap-4 border border-primary text-white w-[600px] px-6 py-5 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.profile_pic} alt="User profile picture" />
          <AvatarFallback>{post.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <p className="font-semibold text-lg">@{post.username}</p>
      </div>

      <p>{post.content}</p>

      <div className="flex justify-between items-center text-gray-400 text-sm">
        <div className="flex gap-2 items-center hover:text-gray-300 cursor-pointer">
          <MessageCircle size={18} />
          <p>{post.commentsQuantity}</p>
        </div>

        <div className="flex gap-2 items-center hover:text-red-500 cursor-pointer">
          <Heart size={18} />
          <p>{post.likeQuantity}</p>
        </div>

        <div className="flex gap-2 items-center hover:text-gray-300 cursor-pointer">
          <Bookmark size={18} />
        </div>
      </div>
    </div>
  );
}
