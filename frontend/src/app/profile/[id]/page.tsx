"use client";

import { useNotification } from "@/components/notification";
import { ProfileTemplate } from "@/components/profile/profileTemplate";
import Sidebar from "@/components/sidebar/Sidebar";
import { Profile } from "@/resources/auth/auth_resources";
import { useAuth } from "@/resources/auth/auth_service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const notification = useNotification();
  const authService = useAuth();
  const [userProfile, setUserProfile] = useState<Profile | undefined>(
    undefined
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const result = await authService.getProfile(id);
        setUserProfile(result);
      } catch (error: any) {
        const message = error.message;
        notification.notify(message, "error");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="grid grid-cols-[20%_80%] gap-24 p-24 min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <ProfileTemplate userProfile={userProfile} />
      </div>
    </div>
  );
}
