function TodayTopicPanel({ topic }) {
  return (
    <section className="panel">
      <p className="panel-kicker">
        오늘의 촬영 주제
      </p>

      <h2>{topic.title}</h2>
      <p>{topic.description}</p>

      <a className="button wide topic-button" href="/posts/new">
        참여하기
      </a>
      
    </section>
  );
}
export default TodayTopicPanel;