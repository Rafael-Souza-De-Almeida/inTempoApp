import { Comment } from "@/resources/comment/comment_resources";
import { SplittedContainer } from "../post/SplittedContainer";
import { TimeAgo } from "../timeAgo/timeAgo";

interface CommentTemplate {
  comment: Comment;
}

export function CommentTemplate({ comment }: CommentTemplate) {
  return (
    <div>
      <SplittedContainer
        profile_pic={comment.profile_pic}
        name={comment.name}
        classname=""
      >
        <div className="flex gap-4 items-center">
          <p className="font-semibold">@{comment.username}</p>
          <TimeAgo created_at={comment.created_at} />
        </div>

        <div className="flex flex-col mt-2">
          <p>{comment.content}</p>
        </div>
      </SplittedContainer>
    </div>
  );
}
