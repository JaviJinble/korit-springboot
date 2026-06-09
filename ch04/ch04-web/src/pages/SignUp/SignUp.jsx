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
            errors.username = "Start with a lowercase letter, 4-20 chars, lowercase letters/numbers/_ only.";
        }
        if (!REGEX.password.test(password) && !!password) {
            errors.password = "Use 8-20 chars with letters, numbers, and special characters.";
        }
        if (password !== confirmPassword && !!confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        if (!REGEX.name.test(name) && !!name) {
            errors.name = "Enter a valid name.";
        }
        if (!REGEX.email.test(email) && !!email) {
            errors.email = "Enter a valid email address.";
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
                <h1 css={s.title}>Sign Up</h1>

                <div css={s.linkContainer}>
                    <span>Already have an account? </span>
                    <Link to="/auth/signin">Sign in</Link>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={signUpData.username}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.username}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signUpData.password}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.password}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={signUpData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.confirmPassword}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={signUpData.name}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.name}</div>
                </div>

                <div css={s.inputGroup}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={signUpData.email}
                        onChange={handleInputChange}
                    />
                    <div css={s.errorMsg}>{inputErrors.email}</div>
                </div>

                <button css={s.button} type="submit" disabled={signUpDisabled || signUpMutation.isPending}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
