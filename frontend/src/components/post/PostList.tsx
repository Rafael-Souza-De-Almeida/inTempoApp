import { Post } from "@/resources/post/post_resources";
import { PostTemplate } from "./PostTemplate";
import { Bookmark } from "@/resources/Bookmark/bookmark_resources";

interface PostListProps {
  posts: Post[] | undefined;
  userLikes: Map<number, number>;
  setUserLikes: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  userBookmarks: Map<number, number>;
  setUserBookmarks: React.Dispatch<React.SetStateAction<Map<number, number>>>;
}

export function PostList({
  userLikes,
  posts,
  setUserLikes,
  setUserBookmarks,
  userBookmarks,
}: PostListProps) {
  return (
    <div className="space-y-5">
      {posts?.map((post) => (
        <PostTemplate
          post={post}
          key={post.id}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          userBookmarks={userBookmarks}
          setUserBookmarks={setUserBookmarks}
        />
      ))}
    </div>
  );
}
