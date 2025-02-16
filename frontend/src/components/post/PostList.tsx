import { Post } from "@/resources/post/post_resources";
import { PostTemplate } from "./PostTemplate";

interface PostListProps {
  posts: Post[] | undefined;
  setUserLikes: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  userLikes: Map<number, number>;
}

export function PostList({ userLikes, posts, setUserLikes }: PostListProps) {
  return (
    <div className="space-y-5">
      {posts?.map((post) => (
        <PostTemplate
          post={post}
          key={post.id}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
        />
      ))}
    </div>
  );
}
