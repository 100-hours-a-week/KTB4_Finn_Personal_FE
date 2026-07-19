import HeartIcon from "../icons/HeartIcon.jsx";
import { useState } from "react";

function LikeButton({ liked, count }) {

  const [isLiked, setIsLiked] = useState(liked);

  return (
    <button
      className={`metric-button ${
        isLiked ? "active" : ""
      }`}
      type="button"
      aria-pressed={isLiked}
      onClick={() => setIsLiked(!isLiked)}
    >
      <HeartIcon filled={isLiked} />
      좋아요 {count}
    </button>
  );
}

export default LikeButton;
