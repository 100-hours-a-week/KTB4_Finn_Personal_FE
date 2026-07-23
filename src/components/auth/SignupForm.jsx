import { useEffect, useState } from "react";
import profilePlaceholder from "../../assets/image.png";
import { isValidPassword } from "../../utils/password.js";

function SignupForm({
  onSubmit,
  isSubmitting = false,
  emailError = "",
  onEmailChange,
}) {
  const [profilePreview, setProfilePreview] = useState(profilePlaceholder);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordInvalid =
    password.length > 0 && !isValidPassword(password);
  const passwordMismatch =
    passwordConfirm.length > 0 && password !== passwordConfirm;

  useEffect(() => {
    return () => {
      if (profilePreview !== profilePlaceholder) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);



  const handleProfileImageChange = (event) => {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) {
      return;
    }

    setProfilePreview(URL.createObjectURL(selectedImage));
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidPassword(password) || passwordMismatch) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const profileImage = formData.get("profileImage");

    onSubmit({
      profileImage:
        profileImage instanceof File && profileImage.size > 0
          ? profileImage
          : null,
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
      nickname: formData.get("nickname"),
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="profile-picker">
        <label className="profile-picker-label" htmlFor="profile-image">
          <span className="profile-image-frame">
            <img
              src={profilePreview}
              alt="선택한 프로필 사진 미리보기"
            />
          </span>
          <span className="profile-picker-text">사진 변경</span>
        </label>

        <input
          className="sr-only"
          id="profile-image"
          name="profileImage"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
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
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "signup-email-error" : undefined}
          onChange={onEmailChange}
          required
        />
        {emailError && (
          <p id="signup-email-error" className="helper error" role="alert">
            {emailError}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="signup-password">비밀번호</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          value={password}
          placeholder="8자 이상 입력하세요"
          autoComplete="new-password"
          minLength={8}
          aria-invalid={passwordInvalid}
          aria-describedby={
            passwordInvalid ? "signup-password-error" : undefined
          }
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {passwordInvalid && (
          <p id="signup-password-error" className="helper error" role="alert">
            영문, 숫자를 조합해 8자 이상 입력해주세요.
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="signup-password-confirm">
          비밀번호 확인
        </label>
        <input
          id="signup-password-confirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          minLength={8}
          aria-invalid={passwordMismatch}
          aria-describedby={
            passwordMismatch ? "signup-password-confirm-error" : undefined
          }
          onChange={(event) => setPasswordConfirm(event.target.value)}
          required
        />
        {passwordMismatch && (
          <p
            id="signup-password-confirm-error"
            className="helper error"
            role="alert"
          >
            비밀번호가 일치하지 않습니다.
          </p>
        )}
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

      <button
        className="button wide"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "회원가입 중..." : "회원가입"}
      </button>
    </form>
  );
}

export default SignupForm;
