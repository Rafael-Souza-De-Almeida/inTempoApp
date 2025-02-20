import { Post } from "../post/post_resources";

export interface Bookmark {
  id: number;
  post_id: number;
  post: Post;
}
