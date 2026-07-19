import profilePlaceholder from "../../assets/image.png";

function SignupForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      profileImage: formData.get("profileImage"),
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
      nickname: formData.get("nickname"),
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="profile-picker">
        <label htmlFor="profile-image">
          <img
            src={profilePlaceholder}
            alt="프로필 사진 미리보기"
          />
        </label>
        <span>사진 변경</span>

        <input
          className="sr-only"
          id="profile-image"
          name="profileImage"
          type="file"
          accept="image/*"
        />
      </div>

      <div className="field">
        <label htmlFor="signup-email">이메일</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          placeholder="hello@focal.kr"
          autoComplete="email"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="signup-password">비밀번호</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          placeholder="8자 이상 입력하세요"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="signup-password-confirm">
          비밀번호 확인
        </label>
        <input
          id="signup-password-confirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="signup-nickname">닉네임</label>
        <input
          id="signup-nickname"
          name="nickname"
          type="text"
          placeholder="10자 이내로 입력하세요"
          maxLength={10}
          required
        />
      </div>

      <button className="button wide" type="submit">
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;
