import LikeButton from "./LikeButton";
import CommentIcon from "../icons/CommentIcon.jsx";
import {Link} from "react-router-dom";
import Avatar from "../common/Avatar.jsx";
import { formatRelativeTime } from "../../utils/date.js";

function PhotoCard({ post }) {
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
          <time className="meta" dateTime={post.createdAt}>
            {formatRelativeTime(post.createdAt)}
          </time>
        </div>
      </div>

      <Link
        className="photo-link"
        to={`/posts/${post.id}`}
      >
        <img
          src={post.contentImg}
          alt={post.title}
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

      {/* <p className="post-tags">
        {post.tags
          .map((tag) => `#${tag}`)
          .join("  ")}
      </p> */}
    </article>
  );
}

export default PhotoCard;
