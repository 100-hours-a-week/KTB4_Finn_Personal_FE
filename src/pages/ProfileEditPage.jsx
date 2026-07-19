import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import EditUserProfile from "../components/user-detail/EditUserProfile.jsx";
import EditPassword from "../components/user-detail/EditPassword.jsx";
import { currentUser } from "../data/mockData.js";

function ProfileEditPage() {
  const [activeTab, setActiveTab] = useState("profile");

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

          {activeTab === "profile" && <EditUserProfile currentUser={currentUser} />}
          {activeTab === "password" && <EditPassword />}
        </section>
      </main>
    </div>
  );
}

export default ProfileEditPage;