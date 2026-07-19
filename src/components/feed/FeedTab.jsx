
const tabs = ["전체", "거리", "필름", "풍경", "야경"];

function FeedTabs() {
  return (
    <div className="feed-tabs" aria-label="게시물 분류">
      {tabs.map((tab) => (
        <button type="button" className="chip" key={tab}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export default FeedTabs;