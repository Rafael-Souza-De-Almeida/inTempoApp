import { Comment } from "@/resources/comment/comment_resources";
import { SplittedContainer } from "../post/SplittedContainer";

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
        <p className="font-semibold">@{comment.username}</p>

        <div className="flex flex-col mt-2">
          <p>{comment.content}</p>
        </div>
      </SplittedContainer>
    </div>
  );
}
