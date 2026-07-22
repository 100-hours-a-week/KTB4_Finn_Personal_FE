// src/pages/HomePage.jsx

import Header from "../components/layout/Header.jsx";
import SideNavigation from "../components/navagation/SideNavigation.jsx";
import FeedSection from "../components/feed/FeedSection.jsx";
import DiscoverySidebar from "../components/discovery/DiscoverSidebar.jsx";
import { useState, useEffect } from "react";
import { getUserInfo } from "../api/user/user.js";
import { getPosts } from "../api/post/post.js";

 import {
//   currentUser,
//   mockPosts,
   todayTopic,
   recommendedTags,
 } from "../data/mockData.js";

function HomePage() {

  const [selectedMenu, setSelectedMenu] = useState("recent");
  const [currentUser, setCurrentUser] = useState(null);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await getUserInfo();
          setCurrentUser(response.data);
        } catch (error) {
          console.error("요청 실패:", error);
        }
      };

      fetchUserInfo();
    }, []);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          setIsLoading(true);

          const filter =
            selectedMenu === "popular"
              ? "POPULAR"
              : "RECENT";

          const response = await getPosts(filter);
          console.log("posts: ",response.data);

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
