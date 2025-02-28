import { json } from "stream/consumers";

export class FollowService {
  url = process.env.NEXT_PUBLIC_API_URL + "/follow";

  async follow(userToFollow: string): Promise<void> {
    const newUrl = this.url + "/add";

    const response = await fetch(newUrl, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        follow_id: userToFollow,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("não foi possível adicionar esse seguidor");
    }
  }

  async unfollow(followId: number): Promise<void> {
    const newUrl = this.url + `/${followId}`;

    const response = await fetch(newUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("não foi possível remover esse seguidor");
    }
  }
}

export const useFollow = () => new FollowService();
