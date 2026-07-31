// src/pages/HomePage.jsx

import Header from "../components/layout/Header.jsx";
import SideNavigation from "../components/navagation/SideNavigation.jsx";
import FeedSection from "../components/feed/FeedSection.jsx";
import DiscoverySidebar from "../components/discovery/DiscoverSidebar.jsx";
import { useState, useEffect, useContext } from "react";
import { getPosts } from "../api/post/post.js";

import { UserInfoContext } from "../context/UserInfoContext.jsx";

 import {
//   currentUser,
//   mockPosts,
   todayTopic,
   recommendedTags,
 } from "../data/mockData.js";

function HomePage() {
  
  const {currentUser} = useContext(UserInfoContext);

  const [selectedMenu, setSelectedMenu] = useState("recent");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      const fetchPosts = async () => {
        try {
          setIsLoading(true);

          const filter =
            selectedMenu === "popular"
              ? "POPULAR"
              : "RECENT";

          const response = await getPosts(filter);

          const fetchedPosts = response.data?.posts ?? response.data;
          setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        } catch (error) {
          console.error("게시물 목록 요청 실패:", error);
          setPosts([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }, [selectedMenu]);

    const handleTagSearch = () => {
      
    }


  return (
    <>
      <Header currentUser={currentUser} />

      <main className="home-layout container-inner">
        <SideNavigation
          selectedMenu={selectedMenu}
          onMenuChange={setSelectedMenu}

        />

        {isLoading ? (
          <HomeFeedSkeleton />
        ) : (
          <FeedSection posts={posts} onTagSearch={handleTagSearch} />
        )}

        <DiscoverySidebar
          topic={todayTopic}
          tags={recommendedTags}
        />
      </main>
    </>
  );
}

function HomeFeedSkeleton() {
  return (
    <section
      className="feed feed-loading"
      aria-busy="true"
      aria-label="게시물을 불러오는 중"
    >
      <div className="feed-intro">
        <h1>오늘, 시선이 머문 곳</h1>
        <p className="lead">
          사진을 좋아하는 사람들이 발견한 하루의 장면을 만나보세요.
        </p>
      </div>

      <span className="sr-only" role="status">
        게시물을 불러오는 중입니다.
      </span>

      <div className="feed-list feed-skeleton-list" aria-hidden="true">
        {[0, 1].map((item) => (
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

export default HomePage;
