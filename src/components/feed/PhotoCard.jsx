import LikeButton from "./LikeButton";
import CommentIcon from "../icons/CommentIcon.jsx";
import {Link} from "react-router-dom";
import Avatar from "../common/Avatar.jsx";

function PhotoCard({ post }) {
  return (
    <article className="photo-card">
      <div className="author-row">
        <Avatar
          src={post.author.profileImageUrl}
          nickname ={post.author.nickname}
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

      <Link
        className="photo-link"
        to={`/posts/${post.id}`}
      >
        <img
          src={post.imageUrl}
          alt={post.title}
        />
      </Link>


      <div className="card-actions">
        <LikeButton
          liked={post.likedByMe}
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
