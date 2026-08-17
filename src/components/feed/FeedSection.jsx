import FeedList from "./FeedList.jsx";
import { useEffect, useRef, useState } from "react";
import SearchFeed from "./SearchFeed.jsx";

function FeedSection({ posts, onTagSearch, isLoading, isLoadingMore, onLoadMore, hasNext }) {

  const loadMoreRef = useRef(null);

  

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNext) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting && !isLoading && !isLoadingMore){
          onLoadMore();
        }
      },
      {
        rootMargin: "0px 0px 300px 0px",
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };

  }, [hasNext, isLoading, isLoadingMore, onLoadMore]);


  const [toggleButton, setToggleButton] = useState(false);

  const handleToggleButton = () => {
    setToggleButton(!toggleButton);
  }

  return (
    <section className="feed" aria-labelledby="feed-title">
      <div className="feed-intro">
        <h1 id="feed-title">오늘, 시선이 머문 곳</h1>
        <p className="lead">
          사진을 좋아하는 사람들이 발견한 하루의 장면을 만나보세요.
        </p>
      </div>

      <div className="feed-filter-toggle-row">
        <button
          type="button"
          onClick={handleToggleButton}
          className={`feed-filter-toggle ${toggleButton ? "is-expanded" : ""}`}
          aria-controls="feed-filter-panel"
          aria-expanded="true"
        >
          <span
            className={`feed-filter-toggle-icon ${toggleButton ? "is-active" : ""}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5L21 21" />
            </svg>
          </span>
          <span className="sr-only">검색 필터 닫기</span>
        </button>
      </div>
      {toggleButton ? <SearchFeed onSearch={onTagSearch} isLoading={isLoading} /> : null}

    
      {isLoading ? (<FeedListSkeleton />) 
      : (
        <>
        <FeedList posts={posts} />
        {isLoadingMore && <FeedListSkeleton />}
        {hasNext && (
          <div
            ref={loadMoreRef}
            className="feed-scroll-sentinel"
            aria-hidden="true"
          />
        )}
        </>
      )}
    </section>
  );
}

function FeedListSkeleton() {
  return (
    <section
      className="feed feed-loading"
      aria-busy="true"
      aria-label="게시물을 불러오는 중"
    >
      <span className="sr-only" role="status">
        게시물을 불러오는 중입니다.
      </span>

      <div className="feed-list feed-skeleton-list" aria-hidden="true">
        {[0].map((item) => (
          <article className="photo-card feed-skeleton-card" key={item}>
            <div className="author-row">
              <span className="skeleton skeleton-avatar" />
              <div className="skeleton-author-copy">
                <span className="skeleton skeleton-line skeleton-line-name" />
                <span className="skeleton skeleton-line skeleton-line-meta" />
              </div>
            </div>
            <div className="skeleton skeleton-feed-photo" />
            <div className="skeleton-actions">
              <span className="skeleton skeleton-action" />
              <span className="skeleton skeleton-action" />
            </div>
            <span className="skeleton skeleton-line skeleton-line-title" />
            <span className="skeleton skeleton-line skeleton-line-copy" />
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeedSection;
