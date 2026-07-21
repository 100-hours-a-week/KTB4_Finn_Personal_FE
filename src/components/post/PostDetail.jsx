import LikeButton from "../feed/LikeButton.jsx";
import CommentIcon from "../icons/CommentIcon.jsx";
import Avatar from "../common/Avatar.jsx";
import { Link } from "react-router-dom";

function PostDetail({ post, isMyPost }) {
  return (
    <article>
      <header className="detail-head">
        <div className="detail-title-row">
          <h1>{post.title}</h1>

          {isMyPost && (
            <div className="detail-actions">
              
              <Link
                className="button outline"
                to={`/posts/edit/${post.id}`}
              >
                수정
              </Link>

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
          <Avatar
            src={post.profileImg}
          />

          <div className="author-copy">
            <strong className="author-name">
              {post.username}
            </strong>

            <time className="meta">
              {post.createdAt}
            </time>
          </div>
        </div>
      </header>

      <img
        className="detail-photo"
        src={post.contentImg}
      />

      <p className="detail-copy">
        {post.content}
      </p>

      <p className="detail-tags">
        {/* {post.tags
          .map((tag) => `#${tag}`)
          .join("  ")} */}
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
          조회수 {post.viewCount}
        </span>
      </div>
    </article>
  );
}

export default PostDetail;