function LikeButton({ liked, count }) {
  return (
    <button
      className={`metric-button ${
        liked ? "active" : ""
      }`}
      type="button"
      aria-pressed={liked}
    >
      좋아요 {count}
    </button>
  );
}

export default LikeButton;