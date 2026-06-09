import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSignUp } from "../../hooks/useAuth";
import * as s from "../styles";

const REGEX = {
    username: /^[a-z][a-z0-9_]{3,19}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    name: /^([a-zA-Z\s]{2,30}|[가-힣]{2,10})$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const emptyInputs = {
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
};

function SignUp() {
    const [signUpData, setSignUpData] = useState(emptyInputs);
    const [inputErrors, setInputErrors] = useState({});
    const [signUpDisabled, setSignUpDisabled] = useState(true);
    const signUpMutation = useSignUp();

    const handleInputChange = (e) => {
        setSignUpData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        await signUpMutation.mutateAsync(signUpData);
        setSignUpData(emptyInputs);
    };

    const validate = ({ username, password, confirmPassword, name, email }) => {
        const errors = {};

        if (!REGEX.username.test(username) && !!username) {
            errors.username = "영문 소문자로 시작하고 4~20자로 입력해 주세요. 숫자와 _는 사용할 수 있습니다.";
        }
        if (!REGEX.password.test(password) && !!password) {
            errors.password = "영문, 숫자, 특수문자를 포함해 8~20자로 입력해 주세요.";
        }
        if (password !== confirmPassword && !!confirmPassword) {
            errors.confirmPassword = "비밀번호가 서로 일치하지 않습니다.";
        }
        if (!REGEX.name.test(name) && !!name) {
            errors.name = "이름을 정확히 입력해 주세요.";
        }
        if (!REGEX.email.test(email) && !!email) {
            errors.email = "올바른 이메일 형식으로 입력해 주세요.";
        }

        return errors;
    };

    useEffect(() => {
        setInputErrors(validate(signUpData));
    }, [signUpData]);

    useEffect(() => {
        const hasEmptyValue = Object.values(signUpData).some((value) => !value);
        const hasError = Object.keys(inputErrors).length > 0;
        setSignUpDisabled(hasEmptyValue || hasError);
    }, [signUpData, inputErrors]);

    return (
        <div css={s.container}>
            <form css={s.card} onSubmit={handleSignUpSubmit}>
                <h1 css={s.title}>회원가입</h1>

                <div css={s.linkContainer}>
                    <span>이미 계정이 있으신가요? </span>
                    <Link to="/auth/signin">로그인</Link>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="사용자명"
                        value={signUpData.username}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.username}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={signUpData.password}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.password}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={signUpData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.confirmPassword}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={signUpData.name}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.name}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="text"
                        name="email"
                        placeholder="이메일"
                        value={signUpData.email}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.email}</div>
                </div>

                <button css={s.button} type="submit" disabled={signUpDisabled || signUpMutation.isPending}>
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default SignUp;
