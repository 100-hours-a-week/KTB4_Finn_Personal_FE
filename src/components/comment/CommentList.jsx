function CommentList({ comment }) {
  return (
    <article className="comment">
      <header className="comment-header">
        <img
          className="avatar"
          src={comment.author.profileImageUrl}
          alt={`${comment.author.nickname} 프로필`}
        />

        <div className="author-copy">
          <strong className="author-name">
            {comment.author.nickname}
          </strong>

          <time className="meta">
            {comment.createdAtLabel}
          </time>
        </div>
      </header>

      <p>{comment.content}</p>
    </article>
  );
}

export default CommentList;