export interface Comment {
  id: number;
  user_id: string;
  username: string;
  post_id: number;
  content: string;
  profile_pic?: string;
  name: string;
  created_at: string;
}
