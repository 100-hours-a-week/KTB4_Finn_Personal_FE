import CommentForm from "./CommentForm.jsx";
import CommentList from "./CommentList.jsx";

function CommentSection({
  comments,
  commentCount,
}) {
  return (
    <section
      id="comments"
      className="comment-section"
      aria-labelledby="comments-title"
    >
      <h2 id="comments-title">
        댓글 {commentCount}
      </h2>

      <CommentForm />

      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentList
              key={comment.id}
              comment={comment}
            />
          ))
        ) : (
          <p className="empty-message">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}

export default CommentSection;