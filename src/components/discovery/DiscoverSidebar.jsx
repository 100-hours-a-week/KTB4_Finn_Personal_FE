import TodayTopicPanel from "./TodayTopicPanel";
import RecommendedTags from "./RecommendedTags";


function DiscoverySidebar({ topic, tags }) {
  return (
    <aside
      className="discovery"
      aria-label="오늘의 발견"
    >
      <TodayTopicPanel topic={topic} />
      <RecommendedTags tags={tags} />
    </aside>
  );
}

export default DiscoverySidebar;