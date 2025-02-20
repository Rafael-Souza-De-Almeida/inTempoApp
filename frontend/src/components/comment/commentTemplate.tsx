"use client";

import { Comment } from "@/resources/comment/comment_resources";
import { SplittedContainer } from "../post/SplittedContainer";
import { TimeAgo } from "../timeAgo/timeAgo";
import { useUserData } from "../userContext";
import { Trash2 } from "lucide-react";
import { useComment } from "@/resources/comment/comment_service";
import { useNotification } from "../notification";

interface CommentTemplate {
  comment: Comment;
}

export function CommentTemplate({ comment }: CommentTemplate) {
  const { userData } = useUserData();
  const commentService = useComment();
  const notification = useNotification();

  const handleDeleteComment = async (commentId: number) => {
    const isConfirmed = window.confirm(
      "Você tem certeza que deseja excluir esse comentário?"
    );

    if (!isConfirmed) return;

    try {
      await commentService.delete(commentId);
      notification.notify("Comentário excluído com sucesso!", "success");
      window.location.reload();
    } catch (error: any) {
      const message = error.message;
      notification.notify(message, "error");
    }
  };

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
          {userData?.id === comment.user_id ? (
            <Trash2
              className="cursor-pointer"
              color="red"
              size={16}
              onClick={() => handleDeleteComment(comment.id)}
            />
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col mt-2">
          <p>{comment.content}</p>
        </div>
      </SplittedContainer>
    </div>
  );
}
