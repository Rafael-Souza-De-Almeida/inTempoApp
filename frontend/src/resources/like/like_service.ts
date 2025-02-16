import { Like } from "./like_resources";

export class LikeService {
  url = "http://localhost:8080/like";

  async getAllUserLikes(): Promise<Like[]> {
    const response = await fetch(this.url, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível listar os likes dos usuários");
    }

    return await response.json();
  }

  async save(postId: number): Promise<Like> {
    const newUrl = this.url + "/add";

    const response = await fetch(newUrl, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        post_id: postId,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível curtir o post");
    }

    return await response.json();
  }

  async delete(likeId: number | undefined): Promise<void> {
    const newUrl = this.url + `/${likeId}`;

    const response = await fetch(newUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível remover a curtida");
    }
  }
}

export const useLike = () => new LikeService();
