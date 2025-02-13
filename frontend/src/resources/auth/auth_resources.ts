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
