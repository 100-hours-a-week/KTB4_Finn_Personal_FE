import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal.jsx";
import CommentForm from "./CommentForm.jsx";
import CommentList from "./CommentList.jsx";

function CommentSection({
  commentsInfo,
  onCreateComment,
  onEditComment,
  onDeleteComment,
}) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const commentCount = commentsInfo.length;

  const handleEditSubmit = async (commentId, content) => {
    await onEditComment?.(commentId, content);
    setEditingCommentId(null);
  };

  const handleDeleteConfirm = async () => {
    await onDeleteComment?.(deletingCommentId);
    setDeletingCommentId(null);
  };

  return (
    <section
      id="comments"
      className="comment-section"
      aria-labelledby="comments-title"
    >
      <h2 id="comments-title">
        댓글 {commentCount}
      </h2>

      <CommentForm onSubmit={onCreateComment} />

      <div className="comment-list">
        {commentsInfo.length > 0 ? (
          commentsInfo.map((comment) => (
            <CommentList
              key={comment.id}
              comment={comment}
              isEditing={editingCommentId === comment.id}
              onEditStart={() => setEditingCommentId(comment.id)}
              onEditCancel={() => setEditingCommentId(null)}
              onEditSubmit={handleEditSubmit}
              onDelete={() => setDeletingCommentId(comment.id)}
            />
          ))
        ) : (
          <p className="empty-message">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </div>

      <ConfirmModal
        isOpen={deletingCommentId !== null}
        title="댓글을 삭제하시겠어요?"
        description="삭제한 댓글은 다시 복구할 수 없습니다."
        confirmText="삭제"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingCommentId(null)}
      />
    </section>
  );
}

export default CommentSection;
