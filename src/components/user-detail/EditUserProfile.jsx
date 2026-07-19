function EditUserProfile({currentUser}) {
    const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log({
      profilePhoto: formData.get("profile-photo"),
      nickname: formData.get("nickname"),
      bio: formData.get("bio"),
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
    >
      <div className="profile-photo-field">
        <label
          className="profile-photo"
          htmlFor="edit-profile-photo"
        >
          <img
            src={currentUser.profileImageUrl}
            alt="현재 프로필 사진"
          />
          <span>사진 변경</span>
        </label>

        <input
          className="sr-only"
          id="edit-profile-photo"
          name="profile-photo"
          type="file"
          accept="image/*"
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
          required
        />
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
        >
          변경사항 저장
        </button>
      </div>
    </form>

      <div className="danger-zone">
        <div>
            <strong>회원 탈퇴</strong>
            <p>작성한 기록과 댓글이 모두 삭제됩니다.</p>
        </div>
          <button className="button critical" type="button">탈퇴하기</button>
      </div>
    </>
  );
}

export default EditUserProfile;