import FeedTabs from "./FeedTab.jsx";
import FeedList from "./FeedList.jsx";
import { useState } from "react";

function FeedSection({ posts, onTagSearch }) {

  return (
    <section className="feed" aria-labelledby="feed-title">
      <div className="feed-intro">
        <h1 id="feed-title">오늘, 시선이 머문 곳</h1>
        <p className="lead">
          사진을 좋아하는 사람들이 발견한 하루의 장면을 만나보세요.
        </p>
      </div>

      <FeedTabs onSearch={onTagSearch} />

      <FeedList posts={posts} />
    </section>
  );
}

export default FeedSection;
