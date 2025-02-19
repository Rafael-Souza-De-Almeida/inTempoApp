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
import { User } from "@/resources/auth/auth_resources";
import { useLoading } from "../loading/loadingContext";
import { useAuth } from "@/resources/auth/auth_service";

interface UserDataContextType {
  userData: User | undefined;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  isLoggedIn: boolean | null;
}

interface UserDataProps {
  children: ReactNode;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider: React.FC<UserDataProps> = ({ children }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { loading, setLoading } = useLoading();
  const auth = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const result = await auth.getUserData();
        setUserData(result);
        setIsLoggedIn(true);
      } catch (error: any) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserDataContext.Provider
      value={{ userData, setUserData, loading, isLoggedIn }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("O context deve ser usado com um provider");
  }

  return context;
};
