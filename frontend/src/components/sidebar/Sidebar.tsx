"use client";

import Link from "next/link";
import InTempoIcon from "../../app/resources/logoIntempo-removebg-preview.png";
import Image from "next/image";
import { HomeIcon, LogOut, UserRound, Bookmark, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/resources/auth/auth_service";
import { useNotification } from "../notification";
import { User } from "@/resources/auth/auth_resources";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useIsLoggedIn } from "../login/LoginContext";

export default function Sidebar() {
  const auth = useAuth();
  const notification = useNotification();
  const [userData, setUserData] = useState<User>();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  async function handleLogout() {
    try {
      await auth.logOut();
      setIsLoggedIn(false);
      notification.notify("Sessão encerrada", "success");
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await auth.getUserData();
        setUserData(result);
        setIsLoggedIn(true);
      } catch (error: any) {
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="flex flex-auto m-auto w-full px-4 sticky">
      <div className="flex flex-col gap-2">
        <Link href="/" className="flex max-w-[256px] gap-4 p-4 rounded-full ">
          <div>
            <Image
              src={InTempoIcon}
              width={100}
              height={100}
              alt="Página inicial"
            />
          </div>
        </Link>

        <Link
          href="/"
          className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full "
        >
          <div>
            <HomeIcon />
          </div>

          <div>Home</div>
        </Link>

        <Link
          href="/"
          className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full "
        >
          <div>
            <UserRound />
          </div>

          <div>Perfil</div>
        </Link>

        <Link
          href="/"
          className="flex max-w-[256px] gap-4 p-4  hover:bg-primary rounded-full "
        >
          <div>
            <Bookmark />
          </div>

          <div>Favoritos</div>
        </Link>

        {isLoggedIn ? (
          <Link
            href="/login"
            onClick={() => handleLogout()}
            className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full "
          >
            <div>
              <LogOut />
            </div>

            <div>Sair</div>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full "
          >
            <div>
              <LogIn />
            </div>

            <div>Entrar</div>
          </Link>
        )}

        {isLoggedIn ? (
          <Link
            href="/"
            className="flex max-w-[256px] gap-4 mt-4 p-4  items-center"
          >
            <div>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={userData?.image_url || ""}
                  alt="User profile picture"
                />
                <AvatarFallback>{userData?.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col items-center">
              <div>{userData?.name}</div>
              <div className="text-gray-500 text-sm">@{userData?.username}</div>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
