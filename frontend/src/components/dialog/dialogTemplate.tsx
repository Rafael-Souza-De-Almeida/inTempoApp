import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile } from "@/resources/auth/auth_resources";
import { Follow } from "@/resources/Follow/follow_resources";
import { CompactProfile } from "../profile/compactProfile";

interface DialogProps {
  userProfile: Profile | undefined;
  type: "Follower" | "Following";
}

export function DialogTemplate({ userProfile, type }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer ">
        <div className="flex gap-2 hover:underline">
          <span className="font-bold">
            {type === "Following"
              ? userProfile?.followingQuantity
              : userProfile?.followersQuantity}
          </span>
          <span className="font-light text-gray-500">
            {type === "Following" ? "seguindo" : "seguidores"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "Following"
              ? "Usuários seguidos por"
              : "Usuários que seguem "}{" "}
            {userProfile?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {type === "Following"
            ? userProfile?.following.map((user) => (
                <CompactProfile user={user} key={user.id} />
              ))
            : userProfile?.followers.map((user) => (
                <CompactProfile user={user} key={user.id} />
              ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
