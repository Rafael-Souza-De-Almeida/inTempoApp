"use client";

import { Loading } from "@/components/loading/loading";
import { useLoading } from "@/components/loading/loadingContext";
import { useIsLoggedIn } from "@/components/login/LoginContext";
import { useNotification } from "@/components/notification";
import { ProfileTemplate } from "@/components/profile/profileTemplate";
import Sidebar from "@/components/sidebar/Sidebar";
import { useUserData } from "@/components/userContext";
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

  const { loading } = useLoading();
  const { isLoggedIn } = useIsLoggedIn();
  const { userData } = useUserData();

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

  if (loading || isLoggedIn === null) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols[10%_90%] gap-32 py-16 px-9 md:grid md:grid-cols-[20%_80%] md:gap-24 md:p-24 md:min-h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <ProfileTemplate userProfile={userProfile} userData={userData} />
      </div>
    </div>
  );
}
