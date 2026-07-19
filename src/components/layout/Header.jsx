import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from "../common/Avatar.jsx";

function HeaderActions({ currentUser, showCreatePostButton }) {

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  return (
    <div className="header-actions">
      {showCreatePostButton && (
        <Link className="button" to="/posts/new">기록 올리기</Link>
      )}
      
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

          <Avatar
            src={currentUser.profileImageUrl}
            nickname ={currentUser.nickname}
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

            <Link
              className="profile-dropdown-item"
              to="/login"
              role="menuitem"
            >
              로그아웃
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


function Header({ currentUser, showCreatePostButton = true, showProfile = true }) {
  return (
    <header className="topbar">
      <div className="topbar-inner container-inner">
        <Link
          className="brand"
          to="/"
        >
          FOCAL<span className="brand-dot">.</span>
        </Link>

        {showProfile && currentUser && (
          <HeaderActions 
            currentUser={currentUser} showCreatePostButton={showCreatePostButton} 
          />
        )}
        
      </div>
    </header>
  );
}

export default Header;
