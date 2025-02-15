"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { CreatePost } from "@/components/post/CreatePost";
import { PostList } from "@/components/post/PostList";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading, setLoading } = useLoading();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const [userData, setUserData] = useState<User>();
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

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div>
        <CreatePost userData={userData} />
        <PostList />
      </div>
    </div>
  );
}
