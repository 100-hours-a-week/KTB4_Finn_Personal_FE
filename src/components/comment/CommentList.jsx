import Avatar from "../common/Avatar.jsx";

function CommentList({ comment }) {
  return (
    <article className="comment">
      <header className="comment-header">
        <Avatar
          src={comment.author.profileImageUrl}
          nickname ={comment.author.nickname}
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