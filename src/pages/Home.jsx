// src/pages/HomePage.jsx

import Header from "../components/layout/Header.jsx";
import SideNavigation from "../components/navagation/SideNavigation.jsx";
import FeedSection from "../components/feed/FeedSection.jsx";
import DiscoverySidebar from "../components/discovery/DiscoverSidebar.jsx";
import { useState,  useMemo } from "react";

import {
  currentUser,
  mockPosts,
  todayTopic,
  recommendedTags,
} from "../data/mockData.js";

function HomePage() {

  const [selectedMenu, setSelectedMenu] = useState("recent");

  const sortedPosts = useMemo(() => {
    if(selectedMenu === "popular"){
      return[...mockPosts].sort(
        (a, b) => b.likeCount - a.likeCount
      );
    }
    return mockPosts;
  }, [selectedMenu]);

  return (
    <>
      <Header currentUser={currentUser} />

      <main className="home-layout container-inner">
        <SideNavigation
          selectedMenu={selectedMenu}
          onMenuChange={setSelectedMenu}

        />

        <FeedSection posts={sortedPosts} />

        <DiscoverySidebar
          topic={todayTopic}
          tags={recommendedTags}
        />
      </main>
    </>
  );
}

export default HomePage;