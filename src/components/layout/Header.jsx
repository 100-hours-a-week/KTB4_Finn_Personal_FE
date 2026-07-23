import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "../common/Avatar.jsx";
import { logout } from "../../api/auth/auth.js";

function HeaderActions({ currentUser, showCreatePostButton }) {

  const navigate = useNavigate();
  const [isLogOut, setIsLogOut] = useState(false);

  const handleLogout = async () => {
    if(isLogOut){
      return;
    }

    try{
      setIsLogOut(true);
      await logout();
    
    }catch(error){
      console.log("로그아웃 실패 : ", error);
    }finally{
      navigate("/login", { replace: true });
      localStorage.removeItem("accessToken");
      setIsLogOut(false);
    }
  }

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
            src={currentUser.profileImg}
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

            <button
              type="button"
              className="profile-dropdown-item"
              role="menuitem"
              onClick={handleLogout}
              disabled={isLogOut}
            >
              {isLogOut ? "로그아웃 중..." : "로그아웃"}
            </button>
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
