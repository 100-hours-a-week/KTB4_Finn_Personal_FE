function RecommendedTags({ tags }) {
  return (
    <section className="panel">
      <h2>추천 태그</h2>

      <div className="tag-cloud">
        {tags.map((tag) => (
          <span className="chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

export default RecommendedTags;