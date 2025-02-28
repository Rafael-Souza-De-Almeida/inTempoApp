import { Comment } from "./comment_resources";

export default class CommentService {
  url = process.env.NEXT_PUBLIC_API_URL + "/comments";

  async save(postId: number, commentContent: string): Promise<Comment> {
    const newUrl = this.url + "/add";

    const response = await fetch(newUrl, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        post_id: postId,
        content: commentContent,
      }),

      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível adicionar um comentário");
    }

    return await response.json();
  }

  async delete(commentId: number): Promise<void> {
    const newUrl = this.url + `/${commentId}`;

    const response = await fetch(newUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível remover o comentário");
    }
  }
}

export const useComment = () => new CommentService();
