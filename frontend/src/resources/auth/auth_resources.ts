import { Follow } from "../Follow/follow_resources";
import { Post } from "../post/post_resources";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  image_url?: string | null;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  username?: string;
  profilePic?: File | null;
}

export interface Profile {
  user_id: string;
  profile_pic: string;
  name: string;
  username: string;
  followersQuantity: number;
  followingQuantity: number;
  followers: Follow[];
  following: Follow[];
  posts: Post[];
  currentUserFollowing: boolean;
}
