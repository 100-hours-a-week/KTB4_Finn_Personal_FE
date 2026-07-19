import Header from "../components/layout/Header";
import SignupForm from "../components/auth/SignupForm";
import { Link } from "react-router-dom";


function SignupPage() {
  const handleSignup = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <Header showActions={false} />

      <main className="auth-shell container-inner">
        <section
          className="auth-card"
          aria-labelledby="signup-title"
        >
          <h1 id="signup-title">새로운 장면을 시작해요</h1>

          <p className="lead">
            프로필을 만들고 FOCAL에서 하루를 기록하세요.
          </p>

          <SignupForm onSubmit={handleSignup} />

          <Link className="auth-link" to="/login">
            이미 계정이 있으신가요? <strong>로그인</strong>
          </Link>
        </section>
      </main>
    </>
  );
}

export default SignupPage;