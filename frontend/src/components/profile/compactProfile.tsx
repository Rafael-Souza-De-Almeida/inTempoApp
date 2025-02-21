import { Profile } from "@/resources/auth/auth_resources";
import { SplittedContainer } from "../post/SplittedContainer";
import { Follow } from "@/resources/Follow/follow_resources";

interface CompactProfileProps {
  user: Follow;
}

export function CompactProfile({ user }: CompactProfileProps) {
  return (
    <SplittedContainer
      profile_pic={user.profile_pic}
      name={user.name}
      classname={""}
    >
      <div className="w-full flex flex-col">
        <div>
          <a href={`/profile/${user.user_id}`} className="hover:underline">
            <p className="text-lg">{user.name}</p>
          </a>
        </div>

        <div>
          <p className="text-slate-500">@{user.username}</p>
        </div>
      </div>
    </SplittedContainer>
  );
}
