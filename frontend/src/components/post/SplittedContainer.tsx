import { Post } from "@/resources/post/post_resources";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SplittedContainerProps {
  children: ReactNode;
  profile_pic: string | undefined | null;
  name: string | undefined | null;
  classname: string;
}

export const SplittedContainer: React.FC<SplittedContainerProps> = ({
  children,
  profile_pic,
  name,
  classname = "",
}) => {
  return (
    <div className="flex gap-4 items-start">
      <div>
        <Avatar className="w-10 h-10 ">
          <AvatarImage
            src={profile_pic ?? ""}
            alt="User profile picture"
            className="object-cover"
          />
          <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>

      <div className={classname}>{children}</div>
    </div>
  );
};
