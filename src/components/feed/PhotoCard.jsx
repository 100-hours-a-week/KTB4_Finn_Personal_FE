import LikeButton from "./LikeButton";
function PhotoCard({ post }) {
  return (
    <article className="photo-card">
      <div className="author-row">
        <img
          className="avatar"
          src={post.author.profileImageUrl}
          alt={`${post.author.nickname} 프로필`}
        />

        <div className="author-copy">
          <strong className="author-name">
            {post.author.nickname}
          </strong>
          <time className="meta">
            {post.createdAtLabel}
          </time>
        </div>
      </div>

      <a
        className="photo-link"
        href={`/posts/${post.id}`}
      >
        <img
          src={post.imageUrl}
          alt={post.title}
        />
      </a>

      <div className="card-actions">
        <LikeButton
          liked={post.likedByMe}
          count={post.likeCount}
        />

        <span className="metric-button">
          댓글 {post.commentCount}
        </span>
      </div>

      <h2 className="post-title">
        {post.title}
      </h2>

      <p className="post-summary">
        {post.description}
      </p>

      <p className="post-tags">
        {post.tags
          .map((tag) => `#${tag}`)
          .join("  ")}
      </p>
    </article>
  );
}

export default PhotoCard;