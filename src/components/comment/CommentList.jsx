import { useEffect, useState } from "react";
import Avatar from "../common/Avatar.jsx";
import { formatRelativeTime } from "../../utils/date.js";

function CommentList({
  comment,
  isEditing,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  onDelete,
}) {
  const [content, setContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setContent(comment.content);
  }, [comment.content, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onEditSubmit?.(comment.id, trimmedContent);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent(comment.content);
    onEditCancel?.();
  };

  return (
    <article className="comment">
      <header className="comment-header">
        <Avatar
          src={comment.profileImg}
          nickname={comment.nickname}
        />

        <div className="author-copy">
          <strong className="author-name">
            {comment.nickname}
          </strong>

          <time className="meta" dateTime={comment.createdAt}>
            {formatRelativeTime(comment.createdAt)}
          </time>
        </div>

        {comment.isMine && (
          <div className="comment-tools">
            <button
              type="button"
              onClick={onEditStart}
            >
              수정
            </button>

            <button
              type="button"
              onClick={onDelete}
            >
              삭제
            </button>
          </div>
        )}
      </header>

      {isEditing ? (
        <form
          className="comment-edit-form"
          onSubmit={handleSubmit}
        >
          <label
            className="sr-only"
            htmlFor={`comment-edit-${comment.id}`}
          >
            댓글 수정
          </label>

          <textarea
            id={`comment-edit-${comment.id}`}
            name="comment"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            autoFocus
            required
          />

          <div className="comment-edit-actions">
            <button
              className="button outline"
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              취소
            </button>

            <button
              className="button"
              type="submit"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정 완료"}
            </button>
          </div>
        </form>
      ) : (
        <p>{comment.content}</p>
      )}
    </article>
  );
}

export default CommentList;
