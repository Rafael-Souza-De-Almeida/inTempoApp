"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useIsLoggedIn } from "../login/LoginContext";
import { useNotification } from "../notification";
import { Post } from "@/resources/post/post_resources";
import { useBookmark } from "@/resources/Bookmark/bookmark_service";

interface UserLikesContextType {
  userBookmarks: Map<number, number>;
  handleBookmark: (value: Post) => void;
}

interface UserLikesProps {
  children: ReactNode;
}

const UserBookmarkContext = createContext<UserLikesContextType | undefined>(
  undefined
);

export const UserBookmarkProvider: React.FC<UserLikesProps> = ({
  children,
}) => {
  const [userBookmarks, setUserBookmarks] = useState<Map<number, number>>(
    new Map()
  );
  const bookmarkService = useBookmark();
  const { isLoggedIn } = useIsLoggedIn();
  const notification = useNotification();

  useEffect(() => {
    const listAllBookmarks = async () => {
      try {
        const result = await bookmarkService.getAllUserBookmarks();

        const newUserBookmarks = new Map();
        result.forEach((bookmark) => {
          newUserBookmarks.set(bookmark.post.id, bookmark.id);
        });

        setUserBookmarks(newUserBookmarks);
      } catch (error: any) {
        const message = error.message;
        console.log(message);
      }
    };

    if (isLoggedIn) {
      listAllBookmarks();
    } else {
      setUserBookmarks(new Map());
    }
  }, [isLoggedIn]);

  const handleAddBookmark = async (postId: number) => {
    if (!isLoggedIn) {
      notification.notify("Faça login para adicionar aos favoritos", "error");
      return;
    }

    try {
      const result = await bookmarkService.save(postId);
      return result;
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };
  const handleRemoveBookmark = async (bookmarkId: number | undefined) => {
    try {
      await bookmarkService.delete(bookmarkId);
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  const handleBookmark = async (post: Post) => {
    if (userBookmarks.has(post.id)) {
      await handleRemoveBookmark(userBookmarks.get(post.id));
      setUserBookmarks((prev) => {
        const newUserBookmarks = new Map(prev);
        newUserBookmarks.delete(post.id);
        return newUserBookmarks;
      });
    } else {
      const bookmark = await handleAddBookmark(post.id);

      if (!bookmark) {
        return;
      }

      setUserBookmarks((prev) => {
        const newUserBookmarks = new Map(prev);
        newUserBookmarks.set(post.id, bookmark.id);
        return newUserBookmarks;
      });
    }
  };

  return (
    <UserBookmarkContext.Provider value={{ userBookmarks, handleBookmark }}>
      {children}
    </UserBookmarkContext.Provider>
  );
};

export const useUserBookmarks = () => {
  const context = useContext(UserBookmarkContext);

  if (!context) {
    throw new Error("O context deve ser usado com um provider");
  }

  return context;
};
