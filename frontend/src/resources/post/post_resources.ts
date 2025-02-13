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
