import LikeButton from "../feed/LikeButton.jsx";
import CommentIcon from "../icons/CommentIcon.jsx";

function PostDetail({ post, isMyPost }) {
  return (
    <article>
      <header className="detail-head">
        <div className="detail-title-row">
          <h1>{post.title}</h1>

          {isMyPost && (
            <div className="detail-actions">
              <button
                className="button outline"
                type="button"
              >
                수정
              </button>

              <button
                className="button critical"
                type="button"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="detail-author">
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
      </header>

      <img
        className="detail-photo"
        src={post.imageUrl}
        alt={post.title}
      />

      <p className="detail-copy">
        {post.description}
      </p>

      <p className="detail-tags">
        {post.tags
          .map((tag) => `#${tag}`)
          .join("  ")}
      </p>

      <div
        className="detail-metrics"
        aria-label="게시물 반응"
      >
        <LikeButton
          liked={post.likedByMe}
          count={post.likeCount}
        />

        <span className="metric-button">
          <CommentIcon />
          댓글 {post.commentCount}
        </span>
      </div>
    </article>
  );
}

export default PostDetail;