import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Header from "../components/layout/Header.jsx";
import EditUserProfile from "../components/user-detail/EditUserProfile.jsx";
import EditPassword from "../components/user-detail/EditPassword.jsx";
import { updatePassword, updateUser, withdraw } from "../api/user/user.js";
import { registerUserProfile } from "../api/image/image.js";
import { ApiError } from "../api/common.js";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../context/UserInfoContext.jsx";
//import { currentUser } from "../data/mockData.js";

function ProfileEditPage() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {currentUser, setCurrentUser} = useContext(UserInfoContext);


  const handleProfileUpdate = async ({ nickname, profileImg }) => {
    const response = await updateUser({
      nickname,
      profileImg,
    });
    setCurrentUser(response.data);
  };

  const handleProfileSubmit = async ({ profileImageFile, nickname }) => {
    try {
      setIsSubmitting(true);
      setToastMessage("");

      let profileImgUrl = currentUser.profileImg;

      if (profileImageFile instanceof File && profileImageFile.size > 0) {
        const uploadResponse = await registerUserProfile(profileImageFile);
        profileImgUrl = uploadResponse.data.imageUrl;
      }

      await handleProfileUpdate({
        nickname,
        profileImg: profileImgUrl,
      });

      setToastMessage("변경사항이 저장되었습니다.");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    try{
      await withdraw();
      localStorage.removeItem("accessToken");
      navigate("/login", {replace: true});
    }catch(error){
      console.log("탈퇴 실패 : ",  error);
    }
  }

  const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
    try{
      setIsSubmitting(true);
      setPasswordError("");
      setToastMessage("");

      await updatePassword({
        currentPassword,
        newPassword,
      });
      setToastMessage("비밀번호가 변경되었습니다.");
    }catch(error){
      if (error instanceof ApiError) {
        setPasswordError(
          error.status === 400
            ? "현재 비밀번호가 일치하지 않습니다."
            : error.message,
        );
      } else {
        setPasswordError("서버에 연결할 수 없습니다.");
      }
    }finally{
      setIsSubmitting(false);
    }
  }


  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);


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
            currentUser ? (
              <EditUserProfile
                currentUser={currentUser}
                onSubmit={handleProfileSubmit}
                onWithdraw={handleWithdraw}
                isSubmitting={isSubmitting}
              />
            ) : (
              <p>사용자 정보를 불러오지 못했습니다.</p>
            )
          )}
          {activeTab === "password" && (
            <EditPassword
              onSubmit={handleUpdatePassword}
              isSubmitting={isSubmitting}
              error={passwordError}
              onClearError={() => setPasswordError("")}
            />
          )}
        </section>
      </main>

      {toastMessage && (
        <div className="settings-toast" role="status" aria-live="polite">
          <span className="settings-toast-icon" aria-hidden="true">✓</span>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default ProfileEditPage;
