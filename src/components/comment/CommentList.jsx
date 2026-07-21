import Avatar from "../common/Avatar.jsx";

function CommentList({ comment, onEdit, onDelete }) {
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

          <time className="meta">
            {comment.createdAt}
          </time>
        </div>

        {comment.isMine && (
          <div className="comment-tools">
            <button
              type="button"
              onClick={() => onEdit?.(comment)}
            >
              수정
            </button>

            <button
              type="button"
              onClick={() => onDelete?.(comment.id)}
            >
              삭제
            </button>
          </div>
        )}
      </header>

      <p>{comment.content}</p>
    </article>
  );
}

export default CommentList;
