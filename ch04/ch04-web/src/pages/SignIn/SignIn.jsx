import { useState } from "react";
import { useSignIn } from "../../hooks/useAuth";
import { Link } from "react-router";
import * as s from "../styles";

function SignIn() {
    const signInMutation = useSignIn();

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const handleSignInDataChange = (e) => {
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignInSubmit = async() => {
        await signInMutation.mutateAsync(signInData);
        setSignInData(signInData);
            
    }

    return (
        <div css={s.container}>
            <div css={s.card}>
                <h1 css={s.title}>로그인</h1>
                <div css={s.linkContainer}>
                    <span>계정이 없으신가요? </span><Link to={"/auth/signup"}>회원가입</Link>
                </div>
                
                <div css={s.inputGroup}>
                    <label>사용자ID</label>
                    <input type="text" name="username" placeholder="사용자이름" value={signInData.username} onChange={handleSignInDataChange} />
                </div>
                
                <div css={s.inputGroup}>
                    <label>비밀번호</label>
                    <input type="password" name="password" placeholder="비밀번호" value={signInData.password} onChange={handleSignInDataChange} />
                </div>

                <button css={s.button} onClick={handleSignInSubmit}>로그인</button>
            </div>
        </div>
    )
}

export default SignIn;
