import Header from "../components/layout/Header";
import SignupForm from "../components/auth/SignupForm";
import { Link, useNavigate } from "react-router-dom";
import { registerUserProfile } from "../api/image/image";
import { useState } from "react";
import { signup } from "../api/user/user";
import { ApiError } from "../api/common";


function SignupPage() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSignup = async(formData) => {

    try{
      setIsSubmitting(true);
      setEmailError("");

      let uploadProfileUrlResponse = null;

      if(formData.profileImage){
        uploadProfileUrlResponse = await registerUserProfile(formData.profileImage);
      }
      const profileUrl = formData.profileImage ? uploadProfileUrlResponse.data.imageUrl : null;

      await signup({
        nickname : formData.nickname,
        email : formData.email,
        password : formData.password,
        profileImg : profileUrl
      });

      navigate("/login", {
        replace: true,
        state: { toastMessage: "회원가입이 완료되었습니다." },
      });

    }catch(error){
      if (error instanceof ApiError && error.status === 409) {
        setEmailError("이미 존재하는 이메일입니다.");
      } else {
        console.error("회원가입 실패 : ", error);
      }
    }finally{
      setIsSubmitting(false);
    }
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

          <SignupForm
            onSubmit={handleSignup}
            isSubmitting={isSubmitting}
            emailError={emailError}
            onEmailChange={() => setEmailError("")}
          />

          <Link className="auth-link" to="/login">
            이미 계정이 있으신가요? <strong>로그인</strong>
          </Link>
        </section>
      </main>
    </>
  );
}

export default SignupPage;
