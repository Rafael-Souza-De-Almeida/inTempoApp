import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TimeAgo } from "../timeAgo/timeAgo";
import { Post } from "@/resources/post/post_resources";

interface HoverCardProps {
  post: Post;
}
export function HoverCardTemplate({ post }: HoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex gap-2 md:gap-4 items-center">
          <p className="flex font-semibold text-md md:text-lg hover:underline">
            @
            <span className="block md:hidden">
              {post.username.length <= 8
                ? post.username
                : post.username.slice(0, 7).concat("...")}
            </span>
            <span className="hidden md:block">{post.username}</span>
          </p>
          <TimeAgo created_at={post.created_at} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={post.profile_pic} />
            <AvatarFallback>{post.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-lg font-semibold">{post.name}</h4>
            <p className="text-sm text-slate-500">@{post.username}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Entrou em {new Date(post.created_at).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
