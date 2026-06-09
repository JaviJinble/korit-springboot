import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router";
import { useSignIn } from "../../hooks/useAuth";
import * as s from "../styles";

const API_BASE_URL = "http://localhost:8080";

const oauthProviders = [
    { id: "google", label: "구글로 로그인" },
    { id: "naver", label: "네이버로 로그인" },
    { id: "kakao", label: "카카오로 로그인" },
];

function SignIn() {
    const signInMutation = useSignIn();
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const handleSignInDataChange = (e) => {
        setSignInData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        await signInMutation.mutateAsync(signInData);
    };

    return (
        <div css={s.container}>
            <form css={s.card} onSubmit={handleSignInSubmit}>
                <h1 css={s.title}>로그인</h1>
                <div css={s.linkContainer}>
                    <span>계정이 없으신가요? </span>
                    <Link to="/auth/signup">회원가입</Link>
                </div>

                <div css={s.inputGroup}>
                    <label htmlFor="username">사용자명</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="사용자명"
                        value={signInData.username}
                        onChange={handleSignInDataChange}
                    />
                </div>

                <div css={s.inputGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={signInData.password}
                        onChange={handleSignInDataChange}
                    />
                </div>

                <button css={s.button} type="submit" disabled={signInMutation.isPending}>
                    로그인
                </button>

                <div css={divider}>
                    <span>SNS 로그인</span>
                </div>

                <div css={oauthButtonGroup}>
                    {oauthProviders.map((provider) => (
                        <a key={provider.id} href={`${API_BASE_URL}/oauth2/authorization/${provider.id}`}>
                            {provider.label}
                        </a>
                    ))}
                </div>
            </form>
        </div>
    );
}

const divider = css`
    display: flex;
    align-items: center;
    gap: 12px;
    color: #94a3b8;
    font-size: 0.9rem;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: rgba(255, 255, 255, 0.12);
    }
`;

const oauthButtonGroup = css`
    display: grid;
    gap: 10px;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        color: #e2e8f0;
        font-weight: 700;
        transition: background 0.2s ease, border-color 0.2s ease;
    }

    a:hover {
        border-color: rgba(0, 240, 255, 0.55);
        background: rgba(0, 240, 255, 0.16);
    }
`;

export default SignIn;
