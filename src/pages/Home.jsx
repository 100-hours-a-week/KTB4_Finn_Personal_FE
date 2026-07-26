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
  const [isLoading, setIsLoading] = useState(false);


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
  return (
    <>
      <Header currentUser={currentUser} />

      <main className="home-layout container-inner">
        <SideNavigation
          selectedMenu={selectedMenu}
          onMenuChange={setSelectedMenu}

        />

        {isLoading ? (
          <p>게시물을 불러오는 중입니다...</p>
        ) : (
          <FeedSection posts={posts} />
        )}

        <DiscoverySidebar
          topic={todayTopic}
          tags={recommendedTags}
        />
      </main>
    </>
  );
}

export default HomePage;
