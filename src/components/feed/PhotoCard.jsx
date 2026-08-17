import LikeButton from "../common/LikeButton.jsx";
import CommentIcon from "../icons/CommentIcon.jsx";
import {Link} from "react-router-dom";
import { useState } from "react";
import Avatar from "../common/Avatar.jsx";
import { formatRelativeTime } from "../../utils/date.js";

function PhotoCard({ post }) {
  const [isImageLoading, setIsImageLoading] = useState(Boolean(post.contentImg));

  return (
    <article className="photo-card">
      <div className="author-row">
        <Avatar
          src={post.profileImg}
          nickname ={post.nickname}
        />

        <div className="author-copy">
          <strong className="author-name">
            {post.nickname}
          </strong>
          <div className="post-meta">
            {post.location?.placeName && (
              <>
                <span className="post-location">
                  {post.location.placeName}
                </span>
                <span className="meta-separator" aria-hidden="true">·</span>
              </>
            )}
            <time className="meta" dateTime={post.createdAt}>
              {formatRelativeTime(post.createdAt)}
            </time>
          </div>
        </div>
      </div>

      <Link
        className="photo-link"
        to={`/posts/${post.id}`}
        aria-busy={isImageLoading}
      >
        {isImageLoading && (
          <span
            className="skeleton photo-loading-skeleton"
            aria-hidden="true"
          />
        )}
        <img
          className={`photo-image ${isImageLoading ? "is-loading" : "is-loaded"}`}
          src={post.contentImg}
          alt={post.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </Link>


      <div className="card-actions">
        <LikeButton
          postId={post.id}
          liked={post.isLiked}
          count={post.likeCount}
        />

        <span className="metric-button">
          <CommentIcon />
          댓글 {post.commentCount}
        </span>
      </div>

      <h2 className="post-title">
        {post.title}
      </h2>

      <p className="post-summary">
        {post.content}
      </p>

      <p className="post-tags">
        {(post.tagNames ?? [])
          .map((tag) => `#${tag}`)
          .join("  ")}
      </p>
    </article>
  );
}

export default PhotoCard;
