import { Comment } from "@/resources/comment/comment_resources";
import { CommentTemplate } from "./commentTemplate";

interface CommentListProps {
  comments: Comment[] | undefined;
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <>
      {comments?.map((comment, index) => (
        <div key={comment.id}>
          <CommentTemplate comment={comment} />

          {index !== comments.length - 1 && <hr className="mt-4" />}
        </div>
      ))}
    </>
  );
}
