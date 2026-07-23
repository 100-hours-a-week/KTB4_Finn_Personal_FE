import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import LoginForm from "../components/auth/LoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { login } from "../api/auth/auth";
import { ApiError } from "../api/common";

function LoginPage(){
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [toastMessage, setToastMessage] = useState(
        location.state?.toastMessage ?? "",
    );

    useEffect(() => {
        if (!location.state?.toastMessage) {
            return;
        }

        navigate(location.pathname, { replace: true, state: null });
    }, [location.pathname, location.state, navigate]);

    useEffect(() => {
        if (!toastMessage) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setToastMessage("");
        }, 3000);

        return () => window.clearTimeout(timeoutId);
    }, [toastMessage]);

    const handleLogin = async ({email, password}) => {
        setIsSubmitting(true);
        setError("");

        try{
            const response = await login({email, password});
            localStorage.setItem("accessToken", response.data.token.accessToken);
            navigate("/", {replace:true});
        }catch(error){
            if(error instanceof ApiError){
                if(error.status === 401){
                    setError("이메일 또는 비밀번호가 일치하지 않습니다.");
                }else{
                    setError(error.message);
                }
            }else{
                setError("서버 연결 불가");
            }
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
            {toastMessage && (
                <div className="settings-toast" role="status" aria-live="polite">
                    <span className="settings-toast-icon" aria-hidden="true">✓</span>
                    {toastMessage}
                </div>
            )}
        </>
    )
}

export default LoginPage;
