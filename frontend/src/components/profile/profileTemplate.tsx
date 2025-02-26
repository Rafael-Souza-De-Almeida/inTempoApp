"use client";

import { Profile, User } from "@/resources/auth/auth_resources";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostList } from "../post/PostList";
import { Button } from "../ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTemplate } from "../dialog/dialogTemplate";
import { Loading } from "../loading/loading";
import { useFollow } from "@/resources/Follow/follow_service";
import { useNotification } from "../notification";
import { Follow } from "@/resources/Follow/follow_resources";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  EditUserAttributes,
  editUserInitialValues,
  editUserSchema,
} from "@/validation/editUserValidation";
import { useState } from "react";
import { EditProfileDialog } from "../dialog/editProfileDialog";

interface ProfileProps {
  userProfile: Profile | undefined;
  userData: User | undefined;
}

export function ProfileTemplate({ userProfile, userData }: ProfileProps) {
  if (userProfile === undefined || userData === undefined) {
    return <Loading />;
  }

  const followService = useFollow();
  const notification = useNotification();

  const handleAddFollow = async (userToFollow: string) => {
    try {
      await followService.follow(userToFollow);
      window.location.reload();
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  const handleRemoveFollow = async (follow: Follow[]) => {
    try {
      await followService.unfollow(follow[0].id);
      window.location.reload();
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

  return (
    <div className="flex flex-col border-2 border-primary w-[900px]">
      <div className="flex justify-between items-center w-full bg-primary">
        <Avatar className="relative top-20 left-4 h-48 w-48 text-[80px] ">
          <AvatarImage
            src={userProfile?.profile_pic}
            alt="User profile picture"
            className="object-cover"
          />
          <AvatarFallback>{userProfile?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="relative top-40 right-4">
          {userData?.id === userProfile?.user_id ? (
            <EditProfileDialog />
          ) : userProfile?.currentUserFollowing ? (
            <Button
              onClick={() =>
                handleRemoveFollow(
                  userProfile.followers.filter(
                    (follow) => follow.user_id === userData.id
                  )
                )
              }
              className="w-[110px] rounded-full p-5 bg-red-500 hover:bg-red-700"
            >
              Seguindo
            </Button>
          ) : (
            <Button
              onClick={() => handleAddFollow(userProfile.user_id)}
              className="w-[110px] rounded-full p-5 bg-green-500 hover:bg-green-800"
            >
              Seguir
            </Button>
          )}
        </div>
      </div>

      <div className="mt-24 text-3xl font-bold px-4">{userProfile?.name}</div>
      <div className="font-light px-4 text-gray-500 mt-2">
        @{userProfile?.username}
      </div>

      <div className="flex gap-6 justify-start px-4 pb-4 border-muted border-b-[1px] mt-4">
        <DialogTemplate userProfile={userProfile} type={"Following"} />
        <div className="flex gap-2">
          <DialogTemplate userProfile={userProfile} type={"Follower"} />
        </div>
      </div>

      <div className="mt-8 px-8">
        <h1 className="text-xl">Posts</h1>
      </div>

      <div className="flex w-full justify-center p-8">
        <PostList posts={userProfile?.posts} />
      </div>
    </div>
  );
}
