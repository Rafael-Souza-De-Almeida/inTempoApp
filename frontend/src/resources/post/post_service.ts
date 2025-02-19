import { Post, ShowPostAttributes } from "./post_resources";

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
      throw new Error("Não foi possível criar o post");
    }

    return await response.json();
  }

  async showPost(postId: number): Promise<ShowPostAttributes> {
    const newUrl = this.url + `/show/${postId}`;

    const response = await fetch(newUrl);

    if (!response.ok) {
      throw new Error("Não foi possível achar o post");
    }

    return await response.json();
  }

  async delete(postId: number): Promise<void> {
    const newUrl = this.url + `/${postId}`;

    const response = await fetch(newUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível deletar o post");
    }
  }
}

export const usePost = () => new PostService();
