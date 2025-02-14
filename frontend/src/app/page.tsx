"use client";

import { CreatePost } from "@/components/post/CreatePost";
import { PostList } from "@/components/post/PostList";
import Sidebar from "@/components/sidebar/Sidebar";
import { User } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div>
        <CreatePost />
        <PostList />
      </div>
    </div>
  );
}
