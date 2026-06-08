import { useEffect, useState } from "react";
import { useSignUp } from "../../hooks/useAuth";
import { Link } from "react-router";
import * as s from "../styles";

function SignUp() {
    const REGEX = {
        username: /^[a-z][a-z0-9_]{3,19}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
        name: /^[가-힣]{2,10}$|^[a-zA-Z\s]{2,30}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };

    const emptyInputs = {
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
    };
    
    const [ signUpData, setSignUpData] = useState(emptyInputs);
    const [ inputErrors, setInputErrors] = useState(emptyInputs);
    const [ signUpDisabled, setSignUpDisabled ] = useState(true);
    
    const signUpMutation = useSignUp();
    
    const handleInputChange = (e) => {
        setSignUpData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignUpOnClick = async () => {
        await signUpMutation.mutateAsync(signUpData);
        setSignUpData(emptyInputs);
    };
    
    useEffect(() => {
        setInputErrors(validate(signUpData));
    }, [signUpData]);
    
    useEffect(() => {
        const inputEmptyValuesEntries = Object.values(signUpData).filter(value => !value);
        const inputErrorsEntries = Object.entries(inputErrors);
        setSignUpDisabled(inputEmptyValuesEntries.length > 0 || inputErrorsEntries.length > 0);
        
    }, [inputErrors])

    const validate = ({ username, password, confirmPassword, name, email }) => {
        const errors = {};

        if (!REGEX.username.test(username) && !!username) {
            errors.username = "영문 소문자로 시작, 4~20자 (숫자, 특수문자 -, _ 포함 가능)";
        }
        if (!REGEX.password.test(password) && !!password) {
            errors.password = "영문, 숫자, 특수문자 포함 8~20자";
        }
        if (password !== confirmPassword && !!confirmPassword) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다";
        }
        if (!REGEX.name.test(name) && !!name) {
            errors.name = "이름을 정확히 입력해 주세요.";
        }
        if (!REGEX.email.test(email) && !!email) {
            errors.email = "올바른 이메일 형식이 아닙니다.";
        }

        return errors;
    }

    return (
        <div css={s.container}>
            <div css={s.card}>
                <h1 css={s.title}>회원가입</h1>
                
                <div css={s.linkContainer}>
                    <span>이미 계정이 있으신가요? </span><Link to={"/auth/signin"}>로그인</Link>
                </div>
                
                <div css={s.inputGroup}>
                    <input type="text" name="username" placeholder="사용자이름" value={signUpData.username} onChange={handleInputChange} />
                    <div css={s.errorMsg}>{inputErrors.username}</div>
                </div>
                
                <div css={s.inputGroup}>
                    <input type="password" name="password" placeholder="비밀번호" value={signUpData.password} onChange={handleInputChange} />
                    <div css={s.errorMsg}>{inputErrors.password}</div>
                </div>
                
                <div css={s.inputGroup}>
                    <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={signUpData.confirmPassword} onChange={handleInputChange} />
                    <div css={s.errorMsg}>{inputErrors.confirmPassword}</div>
                </div>
                
                <div css={s.inputGroup}>
                    <input type="text" name="name" placeholder="성명" value={signUpData.name} onChange={handleInputChange} />
                    <div css={s.errorMsg}>{inputErrors.name}</div>
                </div>
                
                <div css={s.inputGroup}>
                    <input type="text" name="email" placeholder="이메일" value={signUpData.email} onChange={handleInputChange} />
                    <div css={s.errorMsg}>{inputErrors.email}</div>
                </div>
                
                <button css={s.button} disabled={signUpDisabled} onClick={handleSignUpOnClick}>회원가입</button>
            </div>
        </div>
    )
}

export default SignUp;
