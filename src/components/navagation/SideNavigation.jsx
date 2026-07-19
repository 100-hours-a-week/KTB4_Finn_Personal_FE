
function SideNavigation() {
  return (
    <aside className="side-nav" aria-label="피드 탐색">
      <nav className="nav-group">
        <p className="nav-label">피드</p>
        <a className="nav-item active" href="/">
          최근 장면
        </a>
        <a className="nav-item" href="/#popular">
          인기 기록
        </a>
        <a className="nav-item" href="/#following">
          팔로잉
        </a>
      </nav>

      <nav className="nav-group">
        <p className="nav-label">내 공간</p>
        <a className="nav-item" href="/settings/profile">
          내 프로필
        </a>
        <a className="nav-item" href="/#saved">
          저장한 장면
        </a>
      </nav>
    </aside>
  );
}

export default SideNavigation;
