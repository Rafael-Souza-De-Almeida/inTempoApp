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

  async createPost(content: string): Promise<Post> {
    const newUrl = this.url + "/add";

    const response = await fetch(newUrl, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        content: content,
      }),

      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível fazer o login");
    }

    return await response.json();
  }
}

export const usePost = () => new PostService();
