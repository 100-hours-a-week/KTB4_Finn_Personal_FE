function EditPassword() {
  return (
    <>
      <h1 className="page-heading">비밀번호 변경</h1>
      <p className="lead">
        안전한 계정 사용을 위해 새로운 비밀번호를 설정하세요.
      </p>

      <form className="settings-form" action="#" method="post">
        <div className="field">
          <label htmlFor="current-password">현재 비밀번호</label>
          <input
            id="current-password"
            name="current-password"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="new-password">새 비밀번호</label>
          <input
            id="new-password"
            name="new-password"
            type="password"
            placeholder="8자 이상 입력하세요"
            autoComplete="new-password"
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
            required
          />
        </div>

        <div className="settings-actions">
          <button className="button wide" type="submit">
            비밀번호 변경
          </button>
        </div>
      </form>
    </>
  );
}

export default EditPassword;
