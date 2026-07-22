import { useState } from "react";

function EditPassword({
  onSubmit,
  isSubmitting = false,
  error = "",
  onClearError,
}) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const isPasswordMismatch = newPassword !== newPasswordConfirm;
  const showPasswordMismatch =
    Boolean(newPasswordConfirm) && isPasswordMismatch;
  const isSubmitDisabled =
    isSubmitting ||
    !newPassword ||
    !newPasswordConfirm ||
    isPasswordMismatch;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get("current-password");
    const newPassword = formData.get("new-password");
    const newPasswordConfirm = formData.get("new-password-confirm");
    const confirmInput = event.currentTarget.elements.namedItem(
      "new-password-confirm",
    );

    if (newPassword !== newPasswordConfirm) {
      confirmInput?.setCustomValidity("새 비밀번호가 일치하지 않습니다.");
      confirmInput?.reportValidity();
      return;
    }

    confirmInput?.setCustomValidity("");
    onSubmit?.({ currentPassword, newPassword });
  };

  return (
    <>
      <h1 className="page-heading">비밀번호 변경</h1>
      <p className="lead">
        안전한 계정 사용을 위해 새로운 비밀번호를 설정하세요.
      </p>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="current-password">현재 비밀번호</label>
          <input
            id="current-password"
            name="current-password"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            autoComplete="current-password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "current-password-error" : undefined}
            onChange={() => onClearError?.()}
            required
          />
          {error && (
            <p
              id="current-password-error"
              className="helper error"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="new-password">새 비밀번호</label>
          <input
            id="new-password"
            name="new-password"
            type="password"
            placeholder="8자 이상 입력하세요"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
          <p className="helper">
            영문, 숫자를 조합해 8자 이상 입력해주세요.
          </p>
        </div>

        <div className="field">
          <label htmlFor="new-password-confirm">새 비밀번호 확인</label>
          <input
            id="new-password-confirm"
            name="new-password-confirm"
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            value={newPasswordConfirm}
            aria-invalid={showPasswordMismatch}
            aria-describedby={
              showPasswordMismatch ? "new-password-confirm-error" : undefined
            }
            onChange={(event) => {
              event.currentTarget.setCustomValidity("");
              setNewPasswordConfirm(event.target.value);
            }}
            required
          />
          {showPasswordMismatch && (
            <p
              id="new-password-confirm-error"
              className="helper error"
              role="alert"
            >
              새 비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>

        <div className="settings-actions">
          <button
            className="button wide"
            type="submit"
            disabled={isSubmitDisabled}
          >
            {isSubmitting ? "변경 중..." : "비밀번호 변경"}
          </button>
        </div>
      </form>
    </>
  );
}

export default EditPassword;
