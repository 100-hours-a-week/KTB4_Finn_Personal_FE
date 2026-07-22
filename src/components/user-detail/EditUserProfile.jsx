import {useEffect, useState} from "react";
import Avatar from "../common/Avatar.jsx";
import ConfirmModal from "../common/ConfirmModal.jsx";

function EditUserProfile({currentUser, onSubmit, onWithdraw ,isSubmitting}) {

  const [previewProfileUrl, setPreviewProfileUrl] = useState(null);
  const [nicknameError, setNicknameError] = useState("");
  const [isWithdrawModalOpen,setIsWithdrawModalOpen] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if(!file) return;

    setPreviewProfileUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if(previewProfileUrl){
        URL.revokeObjectURL(previewProfileUrl);
      }
    };
  }, [previewProfileUrl]);

  const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const nickname = formData.get("nickname")?.trim() ?? "";

      if (!nickname) {
        setNicknameError("닉네임을 입력해 주세요.");
        event.currentTarget.elements.namedItem("nickname")?.focus();
        return;
      }

      setNicknameError("");

      onSubmit({
        profileImageFile: formData.get("profile-photo"),
        nickname,
      });
  };
    return (
    <>
      <h1 className="page-heading">프로필 편집</h1>
      <p className="lead">
        다른 사진가들에게 보여줄 프로필을 관리합니다.
      </p>

      <form
      className="settings-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="profile-photo-field">
        <label
          className="profile-photo"
          htmlFor="edit-profile-photo"
        >
          <Avatar
            src={previewProfileUrl || currentUser.profileImg}
            nickname ={currentUser.nickname}
          />
          <span>사진 변경</span>
        </label>

        <input
          className="sr-only"
          id="edit-profile-photo"
          name="profile-photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="field">
        <span className="field-label">이메일</span>
        <div className="readonly-value">
            {currentUser.email}
        </div>
        <p className="helper">
          이메일은 변경할 수 없습니다.
        </p>
      </div>

      <div className="field">
        <label htmlFor="edit-nickname">
          닉네임
        </label>

        <input
          id="edit-nickname"
          name="nickname"
          type="text"
          defaultValue={currentUser.nickname}
          maxLength={10}
          aria-invalid={nicknameError ? "true" : undefined}
          aria-describedby={nicknameError ? "nickname-error" : undefined}
          onChange={(event) => {
            if (nicknameError && event.target.value.trim()) {
              setNicknameError("");
            }
          }}
          required
        />
        {nicknameError && (
          <p id="nickname-error" className="helper error" role="alert">
            {nicknameError}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="edit-bio">소개</label>

        <textarea
          id="edit-bio"
          name="bio"
          defaultValue={currentUser.introduction}
          maxLength={120}
          placeholder="좋아하는 사진과 시선에 대해 들려주세요"
        />

        <p className="helper">최대 120자</p>
      </div>

      <div className="settings-actions">
        <button
          className="button wide"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "변경사항 저장"}
        </button>
      </div>
    </form>

      <div className="danger-zone">
        <div>
            <strong>회원 탈퇴</strong>
            <p>작성한 기록과 댓글이 모두 삭제됩니다.</p>
        </div>
          <button
              className="button critical"
              type="button"
              onClick={() => setIsWithdrawModalOpen(true)}
          >
              탈퇴하기
          </button>
      </div>
      <ConfirmModal
        isOpen={isWithdrawModalOpen}
        title="정말 탈퇴하시겠어요?"
        description="작성한 기록과 댓글이 모두 삭제되며 복구할 수 없습니다."
        confirmText="탈퇴하기"
        cancelText="취소"
        onConfirm={async () => {
          await onWithdraw();
          setIsWithdrawModalOpen(false);
        }}
        onCancel={() => setIsWithdrawModalOpen(false)}
      />
    </>
  );
}

export default EditUserProfile;
