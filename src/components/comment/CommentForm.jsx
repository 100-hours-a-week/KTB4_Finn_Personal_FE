import { useState } from "react";

function CommentForm({ onSubmit }) {
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    try {
      await onSubmit?.(trimmedContent);
      setContent("");
    } catch (error) {
      console.error("댓글 제출 실패:", error);
    }
  };

  return (
    <form
      className="comment-form"
      onSubmit={handleSubmit}
    >
      <label
        className="sr-only"
        htmlFor="comment"
      >
        댓글
      </label>

      <textarea
        id="comment"
        name="comment"
        value={content}
        placeholder="이 장면에 대한 댓글을 남겨주세요"
        onChange={(event) =>
          setContent(event.target.value)
        }
        required
      />

      <div className="comment-form-actions">
        <button
          className="button"
          type="submit"
          disabled={!content.trim()}
        >
          댓글 남기기
        </button>
      </div>
    </form>
  );
}

export default CommentForm;