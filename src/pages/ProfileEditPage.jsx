import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import EditUserProfile from "../components/user-detail/EditUserProfile.jsx";
import EditPassword from "../components/user-detail/EditPassword.jsx";
import { getUserInfo } from "../api/userInfo.js";
//import { currentUser } from "../data/mockData.js";

function ProfileEditPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);

        const response = await getUserInfo();
        setCurrentUser(response.data);
      } catch (error) {
        console.error("요청 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <div className="settings-page">
      <Header currentUser={currentUser} />

      <main className="settings-shell container-inner">
        <Link className="back-link" to="/">
          ← 피드로 돌아가기
        </Link>

        <section className="settings-card">
          <nav className="settings-tabs" aria-label="계정 설정">
            <button
              type="button"
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              프로필
            </button>

            <button
              type="button"
              className={activeTab === "password" ? "active" : ""}
              onClick={() => setActiveTab("password")}
            >
              비밀번호
            </button>
          </nav>

          {activeTab === "profile" && (
              isLoading ? (
                <div className="settings-loading" role="status" aria-live="polite">
                  <div className="loading-spinner" aria-hidden="true" />
                  <strong>프로필을 불러오고 있어요</strong>
                  <p>잠시만 기다려 주세요.</p>
                </div>
              ) : currentUser ? (
                <EditUserProfile currentUser={currentUser} />
              ) : (
                <p>사용자 정보를 불러오지 못했습니다.</p>
              )
          )}
          {activeTab === "password" && <EditPassword />}
        </section>
      </main>
    </div>
  );
}

export default ProfileEditPage;