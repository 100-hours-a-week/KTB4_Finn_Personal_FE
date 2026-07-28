import LikeButton from "../common/LikeButton.jsx";
import Avatar from "../common/Avatar.jsx";
import ConfirmModal from "../common/ConfirmModal.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatRelativeTime } from "../../utils/date.js";

function PostDetail({ post, isMyPost, onDelete }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    await onDelete?.();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <article>
        <header className="detail-head">
          <div className="detail-author">
            <Avatar
              src={post.profileImg}
            />

            <div className="author-copy">
              <strong className="author-name">
                {post.username}
              </strong>

              <time className="meta" dateTime={post.createdAt}>
                {formatRelativeTime(post.createdAt)}
              </time>
            </div>
          </div>

          {isMyPost && (
            <div className="detail-actions">
              <Link
                className="button outline"
                to={`/posts/edit/${post.postId}`}
              >
                수정
              </Link>

              <button
                className="button critical"
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                삭제
              </button>
            </div>
          )}
        </header>

        <img
          className="detail-photo"
          src={post.contentImg}
        />
        <div className="detail-title-row">
          <h1>{post.title}</h1>
        </div>

        <p className="detail-copy">
          {post.content}
        </p>

        <p className="detail-tags">
           {post.tagNames
            .map((tag) => `#${tag}`)
            .join("  ")}
        </p>

        <div
          className="detail-metrics"
          aria-label="게시물 반응"
        >
          <LikeButton
            postId={post.postId}
            liked={post.isLiked}
            count={post.likeCount}
          />

          <span className="metric-button">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
            조회수 {post.viewCount}
          </span>
        </div>
      </article>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="게시물을 삭제하시겠어요?"
        description="삭제한 게시물은 다시 복구할 수 없습니다."
        confirmText="삭제"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}

export default PostDetail;
