import { Post } from "../post/post_resources";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  image_url?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Profile {
  user_id: string;
  profile_pic: string;
  name: string;
  username: string;
  followers: number;
  following: number;
  posts: Post[];
}
