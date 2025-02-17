import { Comment } from "../comment/comment_resources";

export interface Post {
  id: number;
  content: string;
  created_at: string;
  username: string;
  name: string;
  likeQuantity: number;
  commentsQuantity: number;
  profile_pic?: string;
}

export interface ShowPostAttributes {
  id: number;
  content: string;
  created_at: string;
  username: string;
  name: string;
  likeQuantity: number;
  commentsQuantity: number;
  profile_pic?: string;
  comments: Comment[];
}
