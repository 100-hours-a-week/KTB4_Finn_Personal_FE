import HeartIcon from "../icons/HeartIcon.jsx";
import { useEffect, useState } from "react";
import { likePost, unlikePost } from "../../api/like/like.js";

function LikeButton({ postId, liked, count }) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(count);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsLiked(liked);
    setLikeCount(count);
  }, [liked, count]);

  const handleLike = async () => {
    if (isPending) return;

    setIsPending(true);

    try {
      const response = isLiked
        ? await unlikePost(postId)
        : await likePost(postId);

      setIsLiked(response.data.isLiked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      className={`metric-button ${isLiked ? "active" : ""}`}
      type="button"
      aria-pressed={isLiked}
      disabled={isPending}
      onClick={handleLike}
    >
      <HeartIcon filled={isLiked} />
      좋아요 {likeCount}
    </button>
  );
}

export default LikeButton