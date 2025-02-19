import { Post } from "@/resources/post/post_resources";
import { PostTemplate } from "./PostTemplate";
import { Bookmark } from "@/resources/Bookmark/bookmark_resources";

interface PostListProps {
  posts: Post[] | undefined;
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-5">
      {posts?.map((post) => (
        <PostTemplate post={post} key={post.id} />
      ))}
    </div>
  );
}
