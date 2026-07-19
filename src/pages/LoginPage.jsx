import { useState } from "react";
import Header from "../components/layout/Header";
import LoginForm from "../components/auth/LoginForm";
import { Link, useNavigate } from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async ({email, password}) => {
        setIsSubmitting(true);
        setError("");

        try{
            navigate("/", {replace:true});
        }catch{
            setError("이메일 또는 비밀번호가 일치하지 않습니다.");
        }finally{
            setIsSubmitting(false);
        }
    };

    return(
        <>
            <Header showProfile={false} />
            <main className="auth-shell container-inner">
                <section
                className="auth-card"
                aria-labelledby="login-title"
                >
                <h1 id="login-title">다시 만나서 반가워요</h1>
                <p className="lead">
                    오늘의 장면을 계속 기록해보세요.
                </p>

                <LoginForm
                    onSubmit={handleLogin}
                    isSubmitting={isSubmitting}
                    error={error}
                />

                <Link className="auth-link" to="/signup">
                    아직 계정이 없으신가요? <strong>회원가입</strong>
                </Link>
                </section>
            </main>
        </>
    )
}

export default LoginPage;