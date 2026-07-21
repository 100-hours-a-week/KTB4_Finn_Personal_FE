import { useState } from "react";

function LoginForm({ onSubmit, isSubmitting = false, error = "" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      email: email.trim(),
      password,
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="login-email">이메일</label>
        <input
          id="login-email"
          name="email"
          type="email"
          value={email}
          placeholder="hello@focal.kr"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="login-password">비밀번호</label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          aria-describedby={error ? "login-error" : undefined}
          aria-invalid={Boolean(error)}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && (
          <p id="login-error" className="helper error" role="alert">
            {error}
          </p>
        )}
      </div>

      <button
        className="button wide"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}

export default LoginForm;
