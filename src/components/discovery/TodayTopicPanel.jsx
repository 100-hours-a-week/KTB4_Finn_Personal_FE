function TodayTopicPanel({ topic }) {
  return (
    <section className="panel">
      <p className="panel-kicker">
        오늘의 촬영 주제
      </p>

      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
    </section>
  );
}
export default TodayTopicPanel;