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
import { useLoading } from "../loading/loadingContext";
import { Loading } from "../loading/loading";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const auth = useAuth();
  const notification = useNotification();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  async function handleLogout() {
    try {
      setLoading(true);
      await auth.logOut();
      setIsLoggedIn(false);
      router.push("/login");
      router.refresh();
      notification.notify("Sessão encerrada", "success");
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="flex flex-auto m-auto w-full px-4 sticky top-16">
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
          href="/bookmarks"
          className="flex max-w-[256px] gap-4 p-4  hover:bg-primary rounded-full "
        >
          <div>
            <Bookmark />
          </div>

          <div>Favoritos</div>
        </Link>

        {isLoggedIn ? (
          <Link
            href="/"
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
      </div>
    </nav>
  );
}
