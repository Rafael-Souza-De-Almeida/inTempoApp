import { Profile, User } from "@/resources/auth/auth_resources";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PostList } from "../post/PostList";
import { Button } from "../ui/button";

interface ProfileProps {
  userProfile: Profile | undefined;
}

export function ProfileTemplate({ userProfile }: ProfileProps) {
  return (
    <div className="flex flex-col border-2 border-primary w-[900px]">
      <div className="flex justify-between items-center w-full bg-primary">
        <Avatar className="relative top-20 left-4 h-48 w-48 text-[80px]">
          <AvatarImage
            src={userProfile?.profile_pic}
            alt="User profile picture"
          />
          <AvatarFallback>{userProfile?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="relative top-40 right-4">
          <Button className="w-full rounded-full p-5">Editar perfil</Button>
        </div>
      </div>

      <div className="mt-24 text-3xl font-bold px-4">{userProfile?.name}</div>
      <div className="font-light px-4 text-gray-500 mt-2">
        @{userProfile?.username}
      </div>

      <div className="flex gap-6 justify-start px-4 pb-4 border-muted border-b-[1px] mt-4">
        <div className="flex gap-2">
          <span className="font-bold">{userProfile?.following}</span>
          <span className="font-light text-gray-500">Seguindo</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">{userProfile?.followers}</span>
          <span className="font-light text-gray-500">Seguidores</span>
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
