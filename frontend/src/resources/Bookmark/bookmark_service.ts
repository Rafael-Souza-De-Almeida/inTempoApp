import { Bookmark } from "./bookmark_resources";

export class BookmarkService {
  url = "http://localhost:8080/bookmark";

  async getAllUserBookmarks(): Promise<Bookmark[]> {
    const response = await fetch(this.url, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível encontrar os posts favoritos");
    }

    return await response.json();
  }

  async save(postId: number): Promise<Bookmark> {
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
      throw new Error("Não foi possível adicionar o post aos favoritos");
    }

    return await response.json();
  }

  async delete(bookmarkId: number | undefined): Promise<void> {
    const newUrl = this.url + `/${bookmarkId}`;

    const response = await fetch(newUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível remover o post dos favoritos");
    }
  }
}

export const useBookmark = () => new BookmarkService();
