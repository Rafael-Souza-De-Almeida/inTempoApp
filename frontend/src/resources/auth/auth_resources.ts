export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  profile_pic?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}
