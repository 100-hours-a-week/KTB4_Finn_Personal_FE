import CommentForm from "./CommentForm.jsx";
import CommentList from "./CommentList.jsx";

function CommentSection({
  commentsInfo,
  onCreateComment,
  onEditComment,
  onDeleteComment,
}) {

  const commentCount = commentsInfo.length;

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
              onEdit={onEditComment}
              onDelete={onDeleteComment}
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
