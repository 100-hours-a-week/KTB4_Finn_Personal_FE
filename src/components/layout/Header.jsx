function HeaderActions({ currentUser }) {
  return (
    <div className="header-actions">
      <a className="button" href="/posts/new">
        기록 올리기
      </a>

      <a href="/settings/profile" aria-label="내 프로필">
        <img
          className="avatar"
          src={currentUser.profileImageUrl}
          alt={`${currentUser.nickname} 프로필`}
        />
      </a>
    </div>
  );
}

function SearchBar() {
  return (
    <form className="search-bar" role="search">
      <label className="sr-only" htmlFor="site-search">
        장면 검색
      </label>
      <input
        id="site-search"
        name="query"
        type="search"
        placeholder="장면을 검색해보세요"
      />
    </form>
  );
}


function Header({ currentUser }) {
  return (
    <header className="topbar">
      <div className="topbar-inner container-inner">
        <a className="brand" href="/">
          FOCAL<span className="brand-dot">.</span>
        </a>

        <SearchBar />

        <HeaderActions currentUser={currentUser} />
      </div>
    </header>
  );
}

export default Header;
