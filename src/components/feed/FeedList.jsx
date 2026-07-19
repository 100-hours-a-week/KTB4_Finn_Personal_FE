import PhotoCard from "./PhotoCard";

function FeedList({ posts }) {
  return (
    <div className="feed-list">
      {posts.map((post) => (
        <PhotoCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
export default FeedList;
