"use client";

import { Like } from "@/resources/like/like_resources";
import { useLike } from "@/resources/like/like_service";
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

interface UserLikesContextType {
  userLikes: Map<number, number>;
  setUserLikes: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  handleLike: (value: Post) => void;
}

interface UserLikesProps {
  children: ReactNode;
}

const UserLikesContext = createContext<UserLikesContextType | undefined>(
  undefined
);

export const UserLikesProvider: React.FC<UserLikesProps> = ({ children }) => {
  const [userLikes, setUserLikes] = useState<Map<number, number>>(new Map());
  const likeService = useLike();
  const { isLoggedIn } = useIsLoggedIn();
  const notification = useNotification();
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const result = await likeService.getAllUserLikes();
        const newLikes = new Map();
        result.forEach((like) => newLikes.set(like.post_id, like.id));
        setUserLikes(newLikes);
      } catch (error) {
        return;
      }
    };

    if (isLoggedIn) {
      fetchLikes();
    } else {
      setUserLikes(new Map());
    }
  }, [isLoggedIn]);

  const handleAddLike = async (postId: number): Promise<Like | undefined> => {
    if (!isLoggedIn) {
      notification.notify(
        "É preciso entrar em sua conta para curtir esse post",
        "error"
      );
      return;
    }
    try {
      const result = await likeService.save(postId);
      return result;
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  const handleRemoveLike = async (
    likeId: number | undefined
  ): Promise<void> => {
    try {
      await likeService.delete(likeId);
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  const handleLike = async (post: Post) => {
    if (userLikes.has(post.id)) {
      await handleRemoveLike(userLikes.get(post.id));

      const newLikes = new Map(userLikes);
      newLikes.delete(post.id);
      setUserLikes(newLikes);
    } else {
      const like = await handleAddLike(post.id);

      if (!like) {
        return;
      }
      setUserLikes((prev) => {
        const newLikes = new Map(prev);
        newLikes.set(post.id, like.id);
        return newLikes;
      });
    }
  };

  return (
    <UserLikesContext.Provider value={{ userLikes, setUserLikes, handleLike }}>
      {children}
    </UserLikesContext.Provider>
  );
};

export const useUserLikes = () => {
  const context = useContext(UserLikesContext);

  if (!context) {
    throw new Error("O context deve ser usado com um provider");
  }

  return context;
};
