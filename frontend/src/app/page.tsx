"use client";

import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const auth = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await auth.getUserData();
        setUserData(result);
      } catch (error: any) {
        const message = error.message;
        console.log(message);
      }
    };

    getUserData();
  }, []);

  return userData ? (
    <h1>Seja bem-vindo {userData.name}</h1>
  ) : (
    <h1>Seja bem vindo</h1>
  );
}
