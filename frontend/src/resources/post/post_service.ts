import { Post } from "./post_resources";

export class PostService {
  url = "http://localhost:8080/posts";

  async getAllPosts(): Promise<Post[]> {
    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error("Não foi possível carregar as postagens");
    }

    return await response.json();
  }
}

export const usePost = () => new PostService();
