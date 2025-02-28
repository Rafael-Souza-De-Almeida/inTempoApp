"use client";

import Link from "next/link";
import InTempoIcon from "../../app/resources/logoIntempo-removebg-preview.png";
import Image from "next/image";
import {
  HomeIcon,
  LogOut,
  UserRound,
  Bookmark,
  LogIn,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/resources/auth/auth_service";
import { useNotification } from "../notification";
import { useIsLoggedIn } from "../login/LoginContext";
import { useLoading } from "../loading/loadingContext";
import { useRouter } from "next/navigation";
import { useUserData } from "../userContext";

export default function Sidebar() {
  const auth = useAuth();
  const notification = useNotification();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  const { userData } = useUserData();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      await auth.logOut();
      setIsLoggedIn(false);
      router.push("/login");
      router.refresh();
      notification.notify("Sessão encerrada", "success");
    } catch (error: any) {
      notification.notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="lg:hidden p-4 fixed top-4 left-4 z-50 rounded-full shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <nav
        className={`fixed top-0 left-0 h-full w-64  shadow-lg p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform  lg:translate-x-0 lg:flex lg:flex-col lg:w-full  lg:sticky lg:top-16 lg:h-screen ${
          isOpen ? "bg-primary" : ""
        } z-10`}
      >
        <Link href="/" className="flex max-w-[256px] gap-4 p-4 rounded-full">
          <Image
            src={InTempoIcon}
            width={100}
            height={100}
            alt="Página inicial"
          />
        </Link>

        <Link
          href="/"
          className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full"
        >
          <HomeIcon />
          <span>Home</span>
        </Link>

        {isLoggedIn ? (
          <Link
            href={`/profile/${userData?.id}`}
            className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full"
          >
            <UserRound />
            <span>Perfil</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full"
          >
            <UserRound />
            <span>Perfil</span>
          </Link>
        )}

        <Link
          href="/bookmarks"
          className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full"
        >
          <Bookmark />
          <span>Favoritos</span>
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full"
          >
            <LogOut />
            <span>Sair</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex max-w-[256px] gap-4 p-4 hover:bg-primary rounded-full"
          >
            <LogIn />
            <span>Entrar</span>
          </Link>
        )}
      </nav>
    </>
  );
}
