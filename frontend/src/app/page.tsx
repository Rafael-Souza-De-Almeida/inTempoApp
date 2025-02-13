"use client";

import { PostList } from "@/components/post/PostList";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const auth = useAuth();

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const result = await auth.getUserData();
  //       setUserData(result);
  //     } catch (error: any) {
  //       const message = error.message;
  //       console.log(message);
  //     }
  //   };

  //   getUserData();
  // }, []);

  return (
    <div className="grid grid-cols-[15%_85%] gap-24 p-24 min-h-screen">
      <div className="">sidebar</div>
      <div>
        <PostList />
      </div>
    </div>
  );
}
