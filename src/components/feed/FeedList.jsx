import PhotoCard from "./PhotoCard";

function FeedList({ posts = [] }) {
  const postList = Array.isArray(posts) ? posts : [];

  if (postList.length === 0) {
    return (
      <div className="feed-empty" role="status">
        <span className="feed-empty-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M4 7.5h3l1.4-2h7.2l1.4 2h3a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </span>
        <strong>아직 등록된 게시물이 없어요</strong>
        <p>새로운 장면이 올라오면 이곳에서 만나볼 수 있어요.</p>
      </div>
    );
  }

  return (
    <div className="feed-list">
      {postList.map((post) => (
        <PhotoCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
export default FeedList;
