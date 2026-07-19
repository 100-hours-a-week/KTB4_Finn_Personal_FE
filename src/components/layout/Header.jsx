import { Link } from "react-router-dom";
import { useState } from "react";

function HeaderActions({ currentUser }) {

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  return (
    <div className="header-actions">

      <Link className="button" to="/posts/new">
        기록 올리기
      </Link>

      <div className="profile-menu">
        <button
          className="profile-menu-button"
          type="button"
          aria-label="프로필 메뉴 열기"
          aria-haspopup="menu"
          aria-expanded={isProfileMenuOpen}
          onClick={() =>
            setIsProfileMenuOpen((isOpen) => !isOpen)
          }
        >
          <img
            className="avatar"
            src={currentUser.profileImageUrl}
            alt={`${currentUser.nickname} 프로필`}
          />
        </button>

        {isProfileMenuOpen && (
          <div className="profile-dropdown" role="menu">
            <Link
              className="profile-dropdown-item"
              to="/settings/profile"
              role="menuitem"
            >
              내 프로필
            </Link>

            <button
              className="profile-dropdown-item"
              type="button"
              role="menuitem"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


function Header({ currentUser }) {
  return (
    <header className="topbar">
      <div className="topbar-inner container-inner">
        <Link
          className="brand"
          to="/"
        >
          FOCAL<span className="brand-dot">.</span>
        </Link>

        <HeaderActions currentUser={currentUser} />
      </div>
    </header>
  );
}

export default Header;
