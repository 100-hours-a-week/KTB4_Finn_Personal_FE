import { useState } from "react";
import { Link } from "react-router-dom";

function SideNavigation({selectedMenu, onMenuChange}) {

  return (
    <aside className="side-nav" aria-label="피드 탐색">
      <nav className="nav-group">
        <p className="nav-label">피드</p>

        <button
          type="button"
          className={`nav-item ${
            selectedMenu === "recent" ? "active" : ""
          }`}
          onClick={() => onMenuChange("recent")}
        >
          최근 장면
        </button>

        <button
          type="button"
          className={`nav-item ${
            selectedMenu === "popular" ? "active" : ""
          }`}
          onClick={() => onMenuChange("popular")}
        >
          인기 기록
        </button>

        {/* <button
          type="button"
          className={`nav-item ${
            selectedMenu === "팔로잉" ? "active" : ""
          }`}
          onClick={() => setSelectedMenu("팔로잉")}
        >
          팔로잉
        </button> */}
      </nav>

      <nav className="nav-group">
        <p className="nav-label">내 공간</p>

        <Link
          className="nav-item"
          to="/settings/profile"
        >
          내 프로필
        </Link>

        {/* <a className="nav-item" href="/#saved">
          저장한 장면
        </a> */}
      </nav>
    </aside>
  );
}

export default SideNavigation;